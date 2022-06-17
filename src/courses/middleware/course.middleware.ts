import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/course.service';
import * as ClassroomService from '../../classrooms/service/classroom.service';
import * as ClassroomHasCourseService from '../../classroom_has_courses/service/classroomhascourse.service';

export function courseExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const course = await findById(req.query[name]);
                return (!course) ? next(boom.notFound(`resource_not_found`, [ "Course", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function courseExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const course = await findById(req.body[name]);
                return (!course) ? next(boom.notFound(`resource_not_found`, [ "Course", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function courseExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const course = await findById(req.params[name]);
                return (!course) ? next(boom.notFound(`resource_not_found`, [ "Course", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function courseCanBeLinkedToClassroom(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
      const classroomHasCourses = await ClassroomHasCourseService.findAll({
          where: {
              classroomId: req.params.classroom_id
          }
      });
      const courses = [ ...new Set(req.body.courses) ];
      for (let i = 0; i < courses?.length; i++) {
          const id = courses[i];
          if(typeof id === "number") {
              const course = await findById(id);
              if(!course) {
                  return next(boom.notFound(`resource_not_found`, [ "Course", id]));
              }
              const classroom = await ClassroomService.findById(req.params.classroom_id);
              if(classroomHasCourses.some(c => c.courseId === id)) {
                  return next(boom.badRequest(`course_already_in_classroom`, [ course.name, `${classroom?.name} ${classroom?.promotion}`]));
              }
          } else {
              return next(boom.badRequest(`param_format`, [ "courses", "Array<string>" ])); 
          }
      }
      return next();
  } catch (err: any) {
      console.log(`${err}`.red.bold);
      return next(err.isBoom ? err : boom.internal(err.name));
  }
}

export async function courseCanBeUnLinkedFromClassroom(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
      const classroomHasCourses = await ClassroomHasCourseService.findAll({
          where: {
              classroomId: req.params.classroom_id
          }
      });
      const courses = [ ...new Set(req.body.courses) ];
      for (let i = 0; i < courses?.length; i++) {
          const id = courses[i];
          if(typeof id === "number") {
              const course = await findById(id);
              if(!course) {
                  return next(boom.notFound(`resource_not_found`, [ "Course", id]));
              }
              const classroom = await ClassroomService.findById(req.params.classroom_id);
              if(!classroomHasCourses.some(c => c.courseId === id)) {
                  return next(boom.badRequest(`course_not_in_classroom`, [ course.name, `${classroom?.name} ${classroom?.promotion}`]));
              }
          } else {
              return next(boom.badRequest(`param_format`, [ "courses", "Array<string>" ])); 
          }
      }
      return next();
  } catch (err: any) {
      console.log(`${err}`.red.bold);
      return next(err.isBoom ? err : boom.internal(err.name));
  }
}