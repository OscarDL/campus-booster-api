import Contract from '../../contracts/model/contract.model';
import { ScopesOptions } from "sequelize-typescript";
import { UserProtectedFields } from "./user.interface";
import { GradePublicFields } from '../../grades/model/grade.interface';
import Campus from './../../campus/model/campus.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';
import Teacher from '../../teachers/model/teacher.model';
import Grade from '../../grades/model/grade.model';
import ClassroomHasCourse from '../../classroom_has_courses/model/classroomhascourse.model';
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: []
        },
        include: [
            {
                model: Campus.unscoped(),
                required: false
            }
        ]
    }) as ScopesOptions,
    iamNotAdmin: ({
        attributes: { 
            exclude: UserProtectedFields
        },
        include: [
            {
                model: Campus.unscoped(),
                required: false
            }
        ]
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        },
        include: [
            {
                model: Campus.unscoped(),
                required: false
            },
            {
                model: UserHasClassroom,
                required: false
            }
        ]
    }) as ScopesOptions,
    withClassrooms: ({
        include: [
            {
                model: UserHasClassroom,
                required: false
            }
        ]
    }) as ScopesOptions,
    withContracts: ({
        include: [
            {
                model: Contract.unscoped(),
                required: false,
            },
        ]
    }) as ScopesOptions,
    withTeachers: ({
        include: [
            {
                model: Teacher.unscoped(),
                required: false,
            },
        ]
    }) as ScopesOptions,
    withGrades: ({
        include: [
            {
                model: Grade.unscoped(),
                required: false,
                attributes: GradePublicFields,
                include: [
                    {
                        model: ClassroomHasCourse.unscoped(),
                        required: false,
                    }
                ]
            },
        ]
    }) as ScopesOptions
}));