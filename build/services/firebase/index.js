"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const models_config_1 = require("../../config/models.config");
const { User } = models_config_1.models;
const credentials_json_1 = __importDefault(require("../../credentials.json"));
const logger_1 = __importDefault(require("./logs/logger"));
const logger = new logger_1.default('firebase.log');
const env_config_1 = __importDefault(require("../../config/env.config"));
const { cloudinary: { Application: { default: APK_IMG } } } = env_config_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(credentials_json_1.default),
});
var FirebaseService;
(function (FirebaseService) {
    /**
     * Default image added to notification
     */
    FirebaseService.DEFAULT_IMAGE_EMBED = APK_IMG;
    /**
     * All types of custom notification for your application
     */
    FirebaseService.NOTIFICATION_TYPES = [
        {
            type: 'comment-like',
            title: 'New like 👍',
            message: '%FIRSTNAME% %LASTNAME% liked your comment.'
        },
        {
            type: 'publication-like',
            title: 'New like 👍',
            message: '%FIRSTNAME% %LASTNAME% liked your opinion.'
        },
        {
            type: 'publication-comment',
            title: 'New comment 💬',
            message: '%FIRSTNAME% %LASTNAME% commented your opinion.'
        },
        {
            type: 'new-follower',
            title: 'New Follower 😄',
            message: '%FIRSTNAME% %LASTNAME% started to follow you!'
        },
        {
            type: 'report-receive',
            title: 'Thanks you ♥',
            message: 'TheGoodFork has received your report and thanks you for contributing to the best community experience.'
        },
        {
            type: 'first-warning',
            title: 'Warning ⚠️',
            message: 'TheGoodFork works every day to make the application as healthy as possible, your behavior has been deemed disturbing, you are requested to be more careful under penalty of being banned.'
        }
    ];
    const firebaseSetUp = (title, message, data, image) => {
        // SET UP PAYLOAD
        const payload = {
            notification: {
                title: `${title}`,
                body: `${message}`,
                sound: 'default',
                color: '#F7B830',
                icon: 'fcm_push_icon',
                image: `${image || ''}`
            },
            data: data
        };
        // SET UP OPTIONS
        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24
        };
        return { payload, options };
    };
    /**
    * Subscribe to topic with your registration token(s)
    *
    * @param registrationToken - the registration token(s)
    * @type string | string[]
    *
    * @param topic - the topic name
    * @type string
    *
    * @example
    * ```js
    *    await subscribeToTopic(
    *      [
    *        'djQmxE4zRKW0WuCa0OnuhC:APA91bEy35Fn5ScXaWe2UdHtii_IoAuc8oOG8C4ZjDVpCtUJSTtyVSPLFKM6BD'
    *      ],
    *      'topic_name'
    *    );
    * ```
    *
    * @return — a promise of Firebase.messaging.MessagingTopicManagementResponse OR NULL
    *
    */
    FirebaseService.subscribeToTopic = (registrationToken, topic) => {
        return new Promise((resolve, reject) => {
            firebase_admin_1.default.messaging().subscribeToTopic(registrationToken, topic)
                .then(resolve)
                .catch(reject);
        }).catch(err => {
            console.log(`${err}`.error);
            logger.writeError(`${err} - (subscribeToTopic)`);
            return null;
        });
    };
    /**
    * Unsubscribe to topic with your registration token(s)
    *
    * @param registrationToken - the registration token(s)
    * @type string | string[]
    *
    * @param topic - the topic name
    * @type string
    *
    * @example
    * ```js
    *    await unsubscribeFromTopic(
    *      [
    *        'djQmxE4zRKW0WuCa0OnuhC:APA91bEy35Fn5ScXaWe2UdHtii_IoAuc8oOG8C4ZjDVpCtUJSTtyVSPLFKM6BD'
    *      ],
    *      'topic_name'
    *    );
    * ```
    *
    * @return — a promise of Firebase.messaging.MessagingTopicManagementResponse OR NULL
    *
    */
    FirebaseService.unsubscribeFromTopic = (registrationToken, topic) => {
        return new Promise((resolve, reject) => {
            firebase_admin_1.default.messaging().unsubscribeFromTopic(registrationToken, topic)
                .then(resolve)
                .catch(reject);
        }).catch(err => {
            console.log(`${err}`.error);
            logger.writeError(`${err} - (unsubscribeFromTopic)`);
            return null;
        });
    };
    /**
    * Send a notification to topic name members
    *
    * @param topic - the topic name
    * @type string
    *
    * @param title - the title of your notification
    * @type string
    * @description
    *
    * @param message - the message of your notification
    * @type string
    *
    * @param data - the data object of your notification
    * @type object
    *
    * @param image - the image of your notification
    * @type string | null
    *
    * @example
    * ```js
    *    await sendToTopic(
    *       'topic_name',
    *       'TITLE',
    *       'MESSAGE',
    *       {
    *         'type': 'notif-test'
    *       },
    *       'https://my.image.com'
    *    );
    * ```
    *
    * @return — a promise of Firebase.messaging.MessagingTopicResponse OR NULL
    *
    */
    FirebaseService.sendToTopic = (topic, title, message, data, image) => {
        return new Promise((resolve, reject) => {
            const { payload, options } = firebaseSetUp(title, message, data, image);
            firebase_admin_1.default.messaging().sendToTopic(topic, payload, options)
                .then(resolve)
                .catch(reject);
        }).catch(err => {
            console.log(`${err}`.error);
            logger.writeError(`${err} - (sendToTopic)`);
            return null;
        });
    };
    /**
    * Send a notification to your registration token(s)
    *
    * @param registrationToken - the registration token(s)
    * @type string | string[]
    *
    * @param title - the title of your notification
    * @type string
    *
    * @param message - the message of your notification
    * @type string
    *
    * @param data - the data object of your notification
    * @type object
    *
    * @param image - the image of your notification
    * @type string | null
    *
    * @example
    * ```js
    *    await sendToDevice(
    *       [
    *         'djQmxE4zRKW0WuCa0OnuhC:APA91bEy35Fn5ScXaWe2UdHtii_IoAuc8oOG8C4ZjDVpCtUJSTtyVSPLFKM6BD'
    *       ],
    *       'TITLE',
    *       'MESSAGE',
    *       {
    *         'type': 'notif-test'
    *       },
    *       'https://my.image.com'
    *    );
    * ```
    * @return — a promise of Firebase.messaging.MessagingTopicResponse
    *
    */
    FirebaseService.sendToDevices = (registrationToken, title, message, data, image) => {
        return new Promise((resolve, reject) => {
            const { payload, options } = firebaseSetUp(title, message, data, image);
            firebase_admin_1.default.messaging().sendToDevice(registrationToken, payload, options)
                .then(resolve)
                .catch(reject);
        }).catch(err => {
            console.log(`${err}`.error);
            logger.writeError(`${err} - (sendToDevices)`);
            return null;
        });
    };
    const replaceName = (string, user) => {
        return string.replace('%FIRSTNAME%', user.firstname).replace('%LASTNAME%', user.lastname);
    };
    /**
    * Send a notification to your registration token(s)
    *
    * @param from - the id of the user emitter
    * @type number
    *
    * @param to - the id of the user receiver
    * @type number
    *
    * @param type - the type of notification (firebase-config.json)
    * @type string
    *
    * @param value - the embed value into the notification data
    * @type number | null
    *
    * @param image - the image of your notification
    * @type string | null
    *
    * @example
    * ```js
    *    await sendNotifByType(
    *       1,
    *       2,
    *       'comment-like',
    *       17,
    *       'https://my.image.com'
    *    );
    * ```
    * @return — a promise of Firebase.messaging.MessagingTopicResponse OR NULL
    *
    */
    FirebaseService.sendNotifByType = (from, to, type, value, image) => {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // MIDDLEWARES
            const userEmitter = yield User.findOne({
                attributes: ['id', 'firstname', 'lastname'],
                where: {
                    id: from
                },
            });
            if (!userEmitter)
                return reject('UserEmitter does not exist!');
            if (from === to)
                return reject('Can\'t send notification to same user!');
            const userReceiver = yield User.findOne({
                attributes: ['id', 'firstname', 'lastname', 'firebase_push_token'],
                where: {
                    id: to
                },
            });
            if (!userReceiver)
                return reject('UserReceiver does not exist!');
            const informations = FirebaseService.NOTIFICATION_TYPES.find(notif => notif.type === type);
            if (userReceiver.firebase_push_token) {
                // finally send notification
                const notification = yield FirebaseService.sendToDevices(userReceiver.firebase_push_token, informations.title, replaceName(informations.message, (userEmitter) ? userEmitter : new Object()), {
                    type: informations.type,
                    value: value === null || value === void 0 ? void 0 : value.toString()
                }, image);
                // success
                resolve(notification);
            }
            else {
                // fail
                reject(`firebase_push_token does not exist for ${userReceiver.firstname} ${userReceiver.lastname}!`);
            }
        })).catch(err => {
            console.log(`${err}`.error);
            logger.writeError(`${err} - (sendNotifByType)`);
            return null;
        });
    };
    /**
     * Decode and check your firebase push token
     * @param token your firebase push token to verify
     * @returns {Promise} a promise of the decoded token or null
     */
    FirebaseService.verifyTokenMiddleware = (token) => {
        return new Promise((resolve, reject) => {
            try {
                firebase_admin_1.default.auth().verifyIdToken(token).then(resolve).catch(reject);
            }
            catch (err) {
                reject(err);
            }
        }).catch(err => {
            console.log(`${err}`.error);
            logger.writeError(`${err} - (verifyTokenMiddleware)`);
            return null;
        });
    };
})(FirebaseService || (FirebaseService = {}));
exports.default = FirebaseService;
