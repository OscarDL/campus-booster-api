"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { mailing, app_name, app_uri } = env_config_1.default;
const ForgetpasswordPage = __importStar(require("./templates/ResetPassword"));
const ValidateAccountPage = __importStar(require("./templates/ConfirmEmail"));
const Config = [
    {
        type: 'forget-password',
        options: {},
        config: (options) => {
            return {
                from: mailing.config.auth.user,
                to: options.email,
                subject: `Update your password ${app_name}`,
                html: ForgetpasswordPage.template(options.email, options.username, options.token, options.origin),
                text: `${app_uri}/auth/reset_password?redirectUri=${options.origin}&email=${options.email}&token=${options.token}`,
                attachments: ForgetpasswordPage.attachments
            };
        }
    },
    {
        type: 'validate-account',
        options: {},
        config: (options) => {
            return {
                from: mailing.config.auth.user,
                to: options.email,
                subject: `Validate your account ${app_name}`,
                html: ValidateAccountPage.template(options.email, options.username, options.token, options.origin),
                text: `${app_uri}/auth/validate_account?redirectUri=${options.origin}&email=${options.email}&token=${options.token}`,
                attachments: ValidateAccountPage.attachments
            };
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
class MailerService {
    constructor() { this._init_(); }
    _init_() {
        this._transporter = nodemailer_1.default.createTransport(mailing.config);
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
    custom(type, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const m = yield this._transporter.sendMail((_a = Config.find(c => (c === null || c === void 0 ? void 0 : c.type) === type)) === null || _a === void 0 ? void 0 : _a.config(options));
                return (_b = m === null || m === void 0 ? void 0 : m.accepted) === null || _b === void 0 ? void 0 : _b.includes(options.email);
            }
            catch (err) {
                console.log(`${err}`.error);
                return false;
            }
        });
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
    send(options, ...emails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const m = yield this._transporter.sendMail(Object.assign(options, { from: mailing.config.auth.user }));
                return { accepted: m === null || m === void 0 ? void 0 : m.accepted, rejected: m === null || m === void 0 ? void 0 : m.rejected };
            }
            catch (err) {
                console.log(`${err}`.error);
                return { accepted: [], rejected: emails };
            }
        });
    }
}
exports.default = MailerService;
var MailerServiceNamespace;
(function (MailerServiceNamespace) {
    ;
    ;
    ;
})(MailerServiceNamespace || (MailerServiceNamespace = {}));
