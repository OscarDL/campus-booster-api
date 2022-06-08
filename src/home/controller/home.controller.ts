import { Req, Res, Next, Resp } from '../../../types/express';
import { GradeModel } from '../../grades/model/grade.interface';
import { PlanningModel } from '../../plannings/model/planning.interface';
import * as UserService from '../../users/service/user.service';
import * as GradeService from '../../grades/service/grade.service';
import * as CampusService from '../../campus/service/campus.service';
import * as CourseService from '../../courses/service/course.service';
import * as PlanningService from '../../plannings/service/planning.service';
import { UserModel } from '../../users/model/user.interface';
import boom from '@hapi/boom';
import moment from 'moment';
import config from '../../../config/env.config';
const {
    permissionLevel: roles
} = config;

export type Summary = {
  campus: number,
  courses: number,
  students: number,
  annualCredits?: number,
  latestGrades?: GradeModel[],
  upcomingCourses?: PlanningModel[]
}

function getUserCurrentYear(user: UserModel): number {
  let monthsToAdd = 3;
  const promotion = user.promotion ?? moment().year();

  // Year 1 students start in october, others start in november -> calculate year
  if (moment().add(monthsToAdd, 'month').year() - promotion > 1) monthsToAdd -= 1;

  return moment().add(monthsToAdd, 'month').year() - promotion;
}

export async function getSummary(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const summary: Summary = {
            campus: 0,
            courses: 0,
            students: 0
        };

        summary.campus = (await CampusService.findAll()).length;
        summary.courses = (await CourseService.findAll()).length;

        summary.students = (await UserService.findAll({
            where: {
                role: roles.Student,
                ...(req.user?.campusId ? { campusId: req.user.campusId } : {})
            }
        })).length;

        if (req.user && req.user.role === roles.Student) {
            const user = req.user;
            const grades = await GradeService.findAll({
                where: {
                    userId: user.id
                }
            }, ["withCourse"]);

            summary.annualCredits = grades
            .filter(grade => grade.ClassroomHasCourse?.Course?.year === getUserCurrentYear(user))
            .reduce((total, grade) => (grade.ClassroomHasCourse?.Course?.credits ?? 0) + total, 0);

            summary.latestGrades = grades.sort((a, b) => moment(a.created_at).diff(moment(b.created_at))).slice(0, 3);

            summary.upcomingCourses = (await PlanningService.findAll())
            .filter(planning => user.UserHasClassrooms?.map(uhc => uhc.classroomId).includes(planning.ClassroomHasCourse?.classroomId))
            .filter(planning => moment().isSameOrBefore(moment(planning.date)))
            .sort((a, b) => moment(a.date).diff(moment(b.date))).slice(0, 3);
        }

        return res.status(200).json(summary);
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}