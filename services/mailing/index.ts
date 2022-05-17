import mailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import config from '../../config/env.config';
const { mailing, app_name, app_uri } = config;

// TEMPLATE CONFIG
import * as ValidateAccountPage from './templates/ConfirmEmail';

const Config = <const> [
    {
        type: 'validate-account',
        config: (options: M.OptionsValidateAccount): Mail.Options => {
            return {
                from: mailing.config.auth.user,
                to: options.email,
                subject: `Validate your account ${app_name}`,
                html: ValidateAccountPage.template(options.email, options.username, options.password),
                text: options.password,
                attachments: ValidateAccountPage.attachments
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
    constructor() { this._init_(); }
    protected _init_(): void {
        this._transporter = mailer.createTransport(mailing.config as any);
        this._transporter.on("token", (token) => {
            console.log("A new access token was generated");
            console.log("User: %s", token.user);
            console.log("Access Token: %s", token.accessToken);
            console.log("Expires: %s", new Date(token.expires));
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
            return m?.accepted?.includes(options.email)!;
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
                Object.assign<Mail.Options, Mail.Options>(options, { from: mailing.config.auth.user })
            );
            return { accepted: m?.accepted, rejected: m?.rejected };
        } catch (err) {
            console.log(`${err}`.red.bold);
            return { accepted: [], rejected: emails };
        }
    }
}
namespace M {
    export interface OptionsForgotPassword {
        email: string; 
        username: string;
        token: string;
        origin: string;
    };
    export interface OptionsValidateAccount {
        email: string; 
        username: string;
        password: string;
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