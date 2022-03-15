"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.remove = exports.update = exports.create = exports.findByEmail = exports.findById = exports.findOne = exports.findAll = void 0;
const models_config_1 = require("../../../config/models.config");
const { User } = models_config_1.models;
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
* @return — Promise rows or empty array
*/
function findAll(options, scope = 'defaultScope') {
    return User.scope(scope).findAll(options);
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
* WHERE attr1 = 'Ulysse' AND attr2 = 'Dupont LIMIT 1'
* ```
*
* @param scope - Add custom model scope for defining Model scopes
* @default defaultScope
*
* @return — Promise row or NULL
*/
function findOne(options, scope = 'defaultScope') {
    return User.scope(scope).findOne(options);
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
* @return — Promise row or NULL
*/
function findById(id, options, scope = 'defaultScope') {
    return User.scope(scope).findByPk(id, options);
}
exports.findById = findById;
/**
* Custom request : find user by his email address
*
*
* @param email - The email of the user to find
* @example
* ```js
* Model.findAll({
*   where: {
*     email: 'my_email_adress'
*   }
* })
* ```
* ```sql
* WHERE email='my_email_adress';
* ```
*
* @param scope - Add custom model scope for defining Model scopes
* @default defaultScope
*
* @return — Promise USER or NULL
*/
function findByEmail(email, scope = 'defaultScope') {
    return User.scope(scope).findOne({
        where: {
            email: email
        }
    });
}
exports.findByEmail = findByEmail;
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
* @return — Promise The created row
*/
function create(data, scope = 'defaultScope') {
    return User.scope(scope).create(data);
}
exports.create = create;
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
* @return — Promise The updated row
*/
function update(id, data, scope = 'defaultScope') {
    return new Promise((resolve, reject) => {
        User.scope(scope).findByPk(id)
            .then((user) => {
            if (!user) {
                reject('not found');
            }
            else {
                user
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
* @return — Promise The number of destroyed rows
*/
function remove(options) {
    return User.destroy(options);
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
* @return — Promise The number of counted rows
*/
function count(options) {
    return User.count(options);
}
exports.count = count;
