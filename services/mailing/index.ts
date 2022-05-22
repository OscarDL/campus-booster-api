import mailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// TEMPLATE CONFIG
import * as SendPasswordFr from './templates/SendPasswordFr';
import * as SendPasswordEn from './templates/SendPasswordEn';

const Config = <const> [
    {
        type: 'send-password-fr',
        config: (options: M.OptionsSendPassword): Mail.Options => {
            return {
                from: process.env.SMTP_USERNAME,
                to: options.to,
                subject: `Votre accès à Campus Booster`,
                html: SendPasswordFr.template(options.email, options.username, options.password),
                text: options.password,
                attachments: SendPasswordFr.attachments
            }
        }
    },
    {
        type: 'send-password-en',
        config: (options: M.OptionsSendPassword): Mail.Options => {
            return {
                from: process.env.SMTP_USERNAME,
                to: options.to,
                subject: `Your Campus Booster access`,
                html: SendPasswordEn.template(options.email, options.username, options.password),
                text: options.password,
                attachments: SendPasswordEn.attachments
            }
        }
    }
];



/**
 * Node mailer custom service
 * @author Ulysse Dupont
 * @class MailerService
 * @namespace MailerService
 * 
 * @init
 *  https://www.google.com/settings/u/1/security/lesssecureapps
 *  https://accounts.google.com/b/0/DisplayUnlockCaptcha
 *  https://security.google.com/settings/security/activity?hl=en&pli=1
 */
export default class MailerService<
    T extends typeof Config,
    K extends T[number]['type'],
    C extends T[number]['config']
> {
    protected _transporter!: mailer.Transporter;
    protected _accessToken!: string;
    private _envKeys = [ "SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_CIPHER", "SMTP_PORT"];
    constructor() { this._init_(); }
    protected _init_(): void {
        this._envKeys.forEach(env => {
            if(!process.env[env]) throw new Error(`Missing SMTP env key '${env}'.`.red);
        });
        this._transporter = mailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT!),
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            pool: true,
            tls: {
                ciphers: process.env.SMTP_CIPHER,
                rejectUnauthorized: false,
            }
        });
        this._transporter.verify((error) => {
            if (error) {
              console.log(`\n✖ SMTP Error: ${error.message}`.red);
            } else {
              console.log("\n📩 SMTP Server is ready to send emails".green);
            }
        });
    }
    /**
     * Sends an email using custom config
     * 
     * @param type The topic of your email.
     * @param options Options to complete email template.
     * 
     *      
     * @example
     * ```ts 
     *  const Mailer = new MailerService();
     *  const mail = await Mailer.custom(
     *    'validate-account',
     *    {
     *      email: 'my_email_address',
     *      origin: 'http://locaalhost:3000',
     *      token: '46454645431947505705017',
     *      username: `My name`
     *    }
     *  );
     *  console.log(mail);
     * ```
     * ```shell
     *  >> true   #SEND
     *  >> false  #ERROR
     * ```
     * @returns A promise boolean
     */
    public async custom(type: K, options: M.UnpackFirstParam<C>): Promise<boolean> {
        try {
            const m: M.MailerResponse = await this._transporter.sendMail(
                Config.find(c => c?.type === type)?.config(options as any)!
            );
            return m?.accepted?.includes(options.to)!;
        } catch (err) {
            console.log(`${err}`.red.bold);
            return false;
        }
    }
    /**
     * Sends an email using the preselected transport object
     * 
     * @param email The target email address.
     * @param options Options to create your email.
     * 
     * @example
     * ```ts 
     *  const Mailer = new MailerService();
     *  const mail = await Mailer.send(
     *    {
     *       to: 'my_email_address',
     *       subject: 'test',
     *       text: 'Hello world with node mailer!'
     *    }
     *  );
     *  console.log(mail);
     * ```
     * ```shell
     *  >> { accepted: [ 'my_email_address' ], rejected: [] }
     * ```
     * * @returns A promise object with accepted and rejected emails
     */
    public async send(options: Omit<Mail.Options, 'from'>, ...emails: string[]): Promise<{
        accepted?: string[];
        rejected?: string[];
    }> {
        try {
            const m: M.MailerResponse = await this._transporter.sendMail(
                Object.assign<Mail.Options, Mail.Options>(options, { from: process.env.SMTP_USERNAME })
            );
            return { accepted: m?.accepted, rejected: m?.rejected };
        } catch (err) {
            console.log(`${err}`.red.bold);
            return { accepted: [], rejected: emails };
        }
    }
}
namespace M {
    export interface OptionsSendPassword {
        email: string; 
        username: string;
        password: string;
        to: string;
    };
    export interface MailerResponse {
        accepted?: string[];
        rejected?: string[];
        envelopeTime?: number;
        messageTime?: number;
        messageSize?: number;
        response?: string;
        envelope?: {
            from?: string;
            to?: string[];
        };
        messageId?: string;
    };
    export type UnpackFirstParam<T> = T extends (p: infer P, ...next: any) => any ? P : never;
}