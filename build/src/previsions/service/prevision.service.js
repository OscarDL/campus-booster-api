"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.remove = exports.updateMany = exports.update = exports.createMany = exports.create = exports.findById = exports.findOne = exports.findAll = void 0;
const models_config_1 = require("../../../config/models.config");
const { Prevision } = models_config_1.models;
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
function findAll(options, scope = 'defaultScope') {
    return Prevision.scope(scope).findAll(options);
}
exports.findAll = findAll;
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
function findOne(options, scope = 'defaultScope') {
    return Prevision.scope(scope).findOne(options);
}
exports.findOne = findOne;
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
function findById(id, options, scope = 'defaultScope') {
    return Prevision.scope(scope).findByPk(id, options);
}
exports.findById = findById;
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
function create(data, scope = 'defaultScope') {
    return Prevision.scope(scope).create(data);
}
exports.create = create;
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
function createMany(data, scope = 'defaultScope') {
    return Prevision.scope(scope).bulkCreate(data);
}
exports.createMany = createMany;
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
function update(id, data, scope = 'defaultScope') {
    return new Promise((resolve, reject) => {
        Prevision.scope(scope).findByPk(id)
            .then((prevision) => {
            if (!prevision) {
                reject("not found");
            }
            else {
                prevision
                    .update(data)
                    .then(resolve)
                    .catch(reject);
            }
        })
            .catch(reject);
    });
}
exports.update = update;
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
function updateMany(options, data, scope = 'defaultScope') {
    return Prevision.scope(scope).update(data, options);
}
exports.updateMany = updateMany;
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
function remove(options) {
    return Prevision.destroy(options);
}
exports.remove = remove;
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
function count(options) {
    return Prevision.count(options);
}
exports.count = count;
