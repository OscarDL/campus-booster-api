
import Firebase from 'firebase-admin';
import { UserModel } from '../../src/users/model/user.interface';
import { models } from '../../config/models.config'; 
const { User } = models;
import serviceAccount from './credentials/firebase.json';
import Logger from './logs/logger';
const logger = new Logger('firebase.log');

Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount as Firebase.ServiceAccount),
});

module FirebaseService {

  /**
   * Default image added to notification
   */
  export const DEFAULT_IMAGE_EMBED = "";

  /**
   * All types of custom notification for your application
   */
  export const NOTIFICATION_TYPES = <const> [
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

  /**
   * Keys of your custom notifications
   */
  export type FirebaseNotificationTypes = typeof NOTIFICATION_TYPES[number]['type'];

  interface FirebaseSetUp {
    payload: Firebase.messaging.MessagingPayload;
    options: Firebase.messaging.MessagingOptions;
  }

  const firebaseSetUp = (title: string, message: string, data: object | any, image?: string | null): FirebaseSetUp => {
    
    // SET UP PAYLOAD
    const payload: Firebase.messaging.MessagingPayload = {
      notification: {
        title: `${title}`,
        body: `${message}`,
        sound: 'default',
        color: '#FF00FF',
        icon: 'fcm_push_icon',
        image: `${image || ''}`
      },
      data: data
    };
    
    // SET UP OPTIONS
    const options: Firebase.messaging.MessagingOptions = {
      priority: 'high',
      timeToLive: 60 * 60 * 24
    };

    return { payload, options };
  } 


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
  export const subscribeToTopic = (registrationToken: string | string[], topic: string)
    : Promise<Firebase.messaging.MessagingTopicManagementResponse | null> => {
      return new Promise((resolve, reject) => {
        Firebase.messaging().subscribeToTopic(registrationToken, topic)
        .then(resolve)
        .catch(reject);
      }).catch(err => {
        console.log(`${err}`.error);
        logger.writeError(`${err} - (subscribeToTopic)`);
        return null;
      }) as Promise<Firebase.messaging.MessagingTopicManagementResponse | null>;
  }

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
  export const unsubscribeFromTopic = (registrationToken: string | string[], topic: string)
    : Promise<Firebase.messaging.MessagingTopicManagementResponse | null> => {
      return new Promise((resolve, reject) => {
        Firebase.messaging().unsubscribeFromTopic(registrationToken, topic)
        .then(resolve)
        .catch(reject);
      }).catch(err => {
        console.log(`${err}`.error);
        logger.writeError(`${err} - (unsubscribeFromTopic)`);
        return null;
      }) as Promise<Firebase.messaging.MessagingTopicManagementResponse | null>;
  }

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
  export const sendToTopic = (topic: string, title: string, message: string, data: object, image?: string | null)
    : Promise<Firebase.messaging.MessagingTopicResponse | null> => {
      return new Promise((resolve, reject) => {
        const { payload, options } = firebaseSetUp(title, message, data, image);
        Firebase.messaging().sendToTopic(topic, payload, options)
        .then(resolve)
        .catch(reject);
      }).catch(err => {
        console.log(`${err}`.error);
        logger.writeError(`${err} - (sendToTopic)`);
        return null;
      }) as Promise<Firebase.messaging.MessagingTopicResponse | null>;
  }

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
  export const sendToDevices = (registrationToken: string | string[], title: string, message: string, data: object, image?: string | null)
    : Promise<Firebase.messaging.MessagingDevicesResponse | null> => {
      return new Promise((resolve, reject) => {
        const { payload, options } = firebaseSetUp(title, message, data, image);
        Firebase.messaging().sendToDevice(registrationToken, payload, options)
        .then(resolve)
        .catch(reject);
      }).catch(err => {
        console.log(`${err}`.error);
        logger.writeError(`${err} - (sendToDevices)`);
        return null;
      }) as Promise<Firebase.messaging.MessagingDevicesResponse | null>;
  }

  const replaceName = (string: string, user: UserModel) => {
    return string.replace('%FIRSTNAME%', user.firstname as string).replace('%LASTNAME%', user.lastname as string);
  }

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
  export const sendNotifByType = (from: number, to: number, type: FirebaseNotificationTypes, value?: number | null, image?: string | null)
    : Promise<Firebase.messaging.MessagingTopicResponse | null> => {
      return new Promise( async(resolve, reject) => {
          
          // MIDDLEWARES
          const userEmitter = await User.findOne({
            attributes: ['id', 'firstname', 'lastname'],
            where: {
              id: from
            },
          }) as UserModel;

          if(!userEmitter) return reject('UserEmitter does not exist!');
          
          if(from === to) return reject('Can\'t send notification to same user!');

          const userReceiver = await User.findOne({
            attributes: ['id', 'firstname', 'lastname', 'firebase_push_token'],
            where: {
              id: to
            },
          }) as UserModel;
          
          if(!userReceiver) return reject('UserReceiver does not exist!');
          
          const informations = NOTIFICATION_TYPES.find(notif => notif.type === type);    
          
          if (userReceiver.firebase_push_token) { 
            // finally send notification
            const notification = await sendToDevices(
              userReceiver.firebase_push_token, 
              informations!.title, 
              replaceName(informations!.message, userEmitter),
              {
                type: informations!.type, 
                value: value?.toString() 
              },
              image
            );
            // success
            resolve(notification);
          } else {
            // fail
            reject(`firebase_push_token does not exist for ${userReceiver.firstname} ${userReceiver.lastname}!`);
          }
      }).catch(err => {
        console.log(`${err}`.error);
        logger.writeError(`${err} - (sendNotifByType)`);
        return null;
      }) as Promise<Firebase.messaging.MessagingTopicResponse | null>;
    }

    /**
     * Decode and check your firebase push token
     * @param token your firebase push token to verify
     * @returns {Promise} a promise of the decoded token or null
     */
    export const verifyTokenMiddleware = (token: string): Promise<Firebase.auth.DecodedIdToken | null> => {
      return new Promise<Firebase.auth.DecodedIdToken | null>((resolve, reject) => {
        try {
          Firebase.auth().verifyIdToken(token).then(resolve).catch(reject);
        } catch (err) {
          reject(err);
        }
      }).catch(err => {
        console.log(`${err}`.error);
        logger.writeError(`${err} - (verifyTokenMiddleware)`);
        return null;
      }); 
    }
}


export default FirebaseService;