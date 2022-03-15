"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProtectedFields = exports.EMAIL_REGEX = void 0;
exports.EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.UserProtectedFields = [
    'validate_account_token',
    'reset_password_token',
    'avatar_public_id',
    'createdAt',
    'updatedAt',
    'password'
];
