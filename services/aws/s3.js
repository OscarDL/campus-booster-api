'use strict';
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const config = require('../../config/env.config').default;
const moment = require('moment');

const AUTHORIZED_IMAGE_EXTENSIONS = [
  'image/png',
  'image/jpeg',
  'image/webp',
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


exports.download = (fileKey) => {
  return s3.getObject({ Bucket: config.aws.bucket, Key: fileKey }).promise();
}

exports.remove = (fileKey) => {
  return s3.deleteObject({ Bucket: config.aws.bucket, Key: fileKey }).promise();
}

exports.uploadImage = (directory) => multer({
  fileFilter: (req, file, cb) => {
    console.log(file)
    return (AUTHORIZED_IMAGE_EXTENSIONS.includes(file.mimetype)) 
      ? cb(null, true) :
      cb(new Error('Invalid Mime Type'), false);
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
  })
});

exports.uploadDocument = (directory) => multer({
  fileFilter: (req, file, cb) => {
    console.log(file)
    const extensions = AUTHORIZED_IMAGE_EXTENSIONS.concat(AUTHORIZED_DOCUMENT_EXTENSIONS);
    return (extensions.includes(file.mimetype)) 
      ? cb(null, true) :
      cb(new Error('Invalid Mime Type'), false);
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
  })
});