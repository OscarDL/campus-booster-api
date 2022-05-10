import { FindOptions, UpdateOptions } from 'sequelize';
import { 
    ClassroomHasCourseModel, 
    ClassroomHasCourseAttributes, 
    ClassroomHasCourseScopesAttributes,
    ClassroomHasCourseCreationAttributes
} from '../model/classroomhascourse.interface';
import { models } from '../../../config/models.config'; 
const { ClassroomHasCourse } = models;
/**
* Find all rows with specified options
*
* @param options - Options that are passed to any model creating a SELECT query
* @example
* ```js
* Model.findAll({
*   where: {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*   }
* })
* ```
* ```sql
* WHERE attr1 = 'Ulysse' AND attr2 = 'Dupont'
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
* 
* @return {Promise} a promise of the rows or empty array
*/
export function findAll(
    options?: FindOptions<ClassroomHasCourseAttributes> | null,
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<ClassroomHasCourseModel[]> {
    return ClassroomHasCourse.scope(scope).findAll(options!);
}
/**
* Search for a single instance. Returns the first instance found, or null if none can be found.
*
* @param options - Options that are passed to any model creating a SELECT query
* @example
* ```js
* Model.findOne({
*   where: {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*   }
* })
* ```
* ```sql
* WHERE attr1 = 'Ulysse' AND attr2 = 'Dupont' LIMIT 1
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
* 
* @return {Promise} a promise of a row or NULL
*/
export function findOne(
    options?: FindOptions<ClassroomHasCourseAttributes> | null,
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<ClassroomHasCourseModel | null> {
    return ClassroomHasCourse.scope(scope).findOne(options!);
}
/**
* Find a row by his primary key & more find options
*
* @param id - Model primary key 
* @example 
* ```js
* Model.findByPk(1)
* ```
* ```sql
* WHERE id=1;
* ```
*
* @param options - Options that are passed to any model creating a SELECT query
* @example
* ```js
* Model.findAll({
*   where: {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*   }
* })
* ```
* ```sql
* WHERE attr1 = 'Ulysse' AND attr2 = 'Dupont';
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
*
* @return {Promise} a promise of a row or NULL
*/
export function findById(
    id: number | any, 
    options?: FindOptions<ClassroomHasCourseAttributes> | null,
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<ClassroomHasCourseModel | null> {
    return ClassroomHasCourse.scope(scope).findByPk(id, options!);
}
/**
* Create a new row in bdd with specified attributes
*
* @param data - Model attributes defined
* @example
* ```js
*  {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*  }
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
*
* @return {Promise} a promise of the created row
*/
export function create(
    data: ClassroomHasCourseCreationAttributes,
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<ClassroomHasCourseModel> {
    return ClassroomHasCourse.scope(scope).create(data);
}
/**
* Create multiple rows in bdd with array of specified attributes
*
* @param data - Model attributes defined
* @example
* ```js
*  [
*    {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*    },
*    {
*     attr1: 'Paul',
*     attr2: 'Mantez'
*    }
*  ]
* ```
* ```sql
* INSERT INTO <model> (attr1, attr2) VALUES ('Ulysse', 'Dupont'), ('Paul', 'Mantez');
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
*
* @return {Promise} a promise of the created rows
*/
export function createMany(
    data: ClassroomHasCourseCreationAttributes[],
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<ClassroomHasCourseModel[]> {
    return ClassroomHasCourse.scope(scope).bulkCreate(data);
}
/**
* Update attributes of a row by his primary key
*
* @param id - Model primary key 
* @example 
* ```js
* Model.findByPk(1)
* ```
* ```sql
* WHERE id=1;
* ```
*
* @param data - Model attributes defined
* @example
* ```js
*  {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*  }
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
*
* @return {Promise} a promise of the updated row
*/
export function update(
    id: number | any, 
    data: Partial<ClassroomHasCourseAttributes>,
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<ClassroomHasCourseModel> {
    return new Promise((resolve, reject) => {
        ClassroomHasCourse.scope(scope).findByPk(id)
        .then((classroomhascourse) => {
            if (!classroomhascourse) {
                reject("not found");
            } else {
                classroomhascourse
                .update(data)
                .then(resolve)
                .catch(reject);
            }
        })
        .catch(reject);
    });
}
/**
* Update attributes of rows by options
*
* @param options - Update option for the update
* @example 
* ```js
*  {
*     where: {
*       status: 'ready'
*     }
*  }
* ```
* ```sql
* WHERE status='ready';
* ```
*
* @param data - Model attributes defined
* @example
* ```js
*  {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*  }
* ```
*
* @param scope - Add custom model scope for defining Model scopes 
* @default defaultScope
*
* @return {Promise} a promise of an array with one or two
* elements. The first element is always the number of affected rows, while the second element is the actual
* affected rows (only supported in postgres and mssql with `options.returning` true).
*/
export function updateMany(
    options: UpdateOptions<ClassroomHasCourseAttributes>, 
    data: Partial<ClassroomHasCourseAttributes>,
    scope: (ClassroomHasCourseScopesAttributes | ClassroomHasCourseScopesAttributes[]) = "defaultScope"
): Promise<[ affectedCount: number ]> {
    return ClassroomHasCourse.scope(scope).update(data, options);
}
/**
* Delete multiple instances, or set their deletedAt timestamp to the current time if paranoid is enabled.
*
* @param options - Options that are passed to any model creating a SELECT query
* @example
* ```js
* Model.findAll({
*   where: {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*   }
* })
* ```
* ```sql
* WHERE attr1 = 'Ulysse' AND attr2 = 'Dupont';
* ```
*
* @return {Promise} a promise of the number of destroyed rows
*/
export function remove(
    options?: FindOptions<ClassroomHasCourseAttributes> | null
): Promise<number> {
    return ClassroomHasCourse.destroy(options!);
}
/**
* Count the number of records matching the provided where clause.
*
* If you provide an include option, the number of matching associations will be counted instead.
* 
*
* @param options - Options that are passed to any model creating a SELECT query
* @example
* ```js
* Model.findAll({
*   where: {
*     attr1: 'Ulysse',
*     attr2: 'Dupont'
*   }
* })
* ```
* ```sql
* WHERE attr1 = 'Ulysse' AND attr2 = 'Dupont';
* ```
*
* @return {Promise} a promise of the number of counted rows
*/
export function count(
    options?: FindOptions<ClassroomHasCourseAttributes> | null
): Promise<number> {
    return ClassroomHasCourse.count(options!);
}