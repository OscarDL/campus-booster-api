'use strict';
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const config = require('../../config/env.config').default;
const moment = require('moment');
const boom = require('@hapi/boom');
const mime = require("mime-types");

const AUTHORIZED_IMAGE_EXTENSIONS = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/x-icon',
  'image/svg+xml'
];

const AUTHORIZED_DOCUMENT_EXTENSIONS = [
  'application/pdf',
  'application/document'
];

const s3 = new aws.S3({
  secretAccessKey: config.aws.secretAccessKey,
  accessKeyId: config.aws.accessKeyId,
  region: config.aws.region
});

exports.upload = (fileKey, Body) => {
  return s3.putObject({ 
    Bucket: process.env.AWS_BUCKET, 
    Key: fileKey, 
    Body: Body, 
    ContentType: mime.lookup(fileKey) 
  }).promise();
};

exports.download = (fileKey) => {
  return s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: fileKey }).promise();
};

exports.remove = (fileKey) => {
  return s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: fileKey }).promise();
};

exports.uploadImage = (directory) => multer({
  fileFilter: (req, file, cb) => {
    const format = file.originalname.slice(file.originalname.lastIndexOf('.'));
    return (AUTHORIZED_IMAGE_EXTENSIONS.includes(file.mimetype))
      ? cb(null, true) : 
      cb(boom.badRequest(`image_format_aws`, format), false);
  },

  storage: multerS3({
    s3: s3,
    bucket: config.aws.bucket,
    ContentDisposition: 'inline',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',

    key: function (req, file, cb) {
      const year = moment().get('years').toString();
      const userName = (req.user ? [
        req.user.firstname ? req.user.firstname.toLocaleUpperCase() : '',
        req.user.lastname ? req.user.lastname.toLocaleUpperCase() : '',
        req.user.email ? req.user.email.toLocaleLowerCase() : '',
      ] : []).filter(n => n.length);
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, `${directory}/${year}/${userName.join('_')}${userName.length ? '_' : ''}${fileName}`);
    }
  }),

  limits: {
    fileSize: 2097152 // 2MB (in bytes) per image
  }
});

exports.uploadDocument = (directory) => multer({
  fileFilter: (req, file, cb) => {
    const format = file.originalname.slice(file.originalname.lastIndexOf('.'));
    const extensions = AUTHORIZED_IMAGE_EXTENSIONS.concat(AUTHORIZED_DOCUMENT_EXTENSIONS);
    return (extensions.includes(file.mimetype))
      ? cb(null, true) :
      cb(boom.badRequest(`document_format_aws`, format), false);
  },
  storage: multerS3({
    s3: s3,
    bucket: config.aws.bucket,
    ContentDisposition: 'inline',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',

    key: function (req, file, cb) {
      const year = moment().get('years').toString();
      const userName = (req.user ? [
        req.user.firstname ? req.user.firstname.toLocaleUpperCase() : '',
        req.user.lastname ? req.user.lastname.toLocaleUpperCase() : '',
        req.user.email ? req.user.email.toLocaleLowerCase() : '',
      ] : []).filter(n => n.length);
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, `${directory}/${year}/${userName.join('_')}${userName.length ? '_' : ''}${fileName}`);
    }
  }),

  limits: {
    fileSize: 5242880 // 5MB (in bytes) per document
  }
});