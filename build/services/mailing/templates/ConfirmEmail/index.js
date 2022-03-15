"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachments = exports.template = void 0;
const env_config_1 = __importDefault(require("../../../../config/env.config"));
function template(to, username, token, origin) {
    return `
        <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
        <html xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office' style='width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0'>
        <head> 
        <meta charset='UTF-8'> 
        <meta content='width=device-width, initial-scale=1' name='viewport'> 
        <meta name='x-apple-disable-message-reformatting'> 
        <meta http-equiv='X-UA-Compatible' content='IE=edge'> 
        <meta content='telephone=no' name='format-detection'> 
        <title>ConfirmEmail</title> 
        <!--[if (mso 16)]>
            <style type='text/css'>
            a {text-decoration: none;}
            </style>
            <![endif]--> 
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]--> 
        <style type='text/css'>
        #outlook a {
            padding:0;
        }
        .ExternalClass {
            width:100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height:100%;
        }
        .es-button {
            mso-style-priority:100!important;
            text-decoration:none!important;
        }
        a[x-apple-data-detectors] {
            color:inherit!important;
            text-decoration:none!important;
            font-size:inherit!important;
            font-family:inherit!important;
            font-weight:inherit!important;
            line-height:inherit!important;
        }
        .es-desk-hidden {
            display:none;
            float:left;
            overflow:hidden;
            width:0;
            max-height:0;
            line-height:0;
            mso-hide:all;
        }
        .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
            background:#ffffff!important;
            border-color:#ffffff!important;
        }
        .es-button-border:hover {
            background:#ffffff!important;
            border-style:solid solid solid solid!important;
            border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
        }
        [data-ogsb] .es-button {
            border-width:0!important;
            padding:15px 20px 15px 20px!important;
        }
        td .es-button-border-1:hover {
            border-color:#ff7519 #ff7519 #ff7519 #ff7519!important;
            background:#ffffff!important;
        }
        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1 { font-size:20px!important; text-align:center; line-height:120%!important } h2 { font-size:16px!important; text-align:left; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:20px!important } h2 a { text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:16px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:10px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class='gmail-fix'] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
        </style> 
        </head> 
        <body style='width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0'> 
        <div class='es-wrapper-color' style='background-color:#FAFAFA'> 
        <!--[if gte mso 9]>
                    <v:background xmlns:v='urn:schemas-microsoft-com:vml' fill='t'>
                        <v:fill type='tile' color='#fafafa'></v:fill>
                    </v:background>
                <![endif]--> 
        <table class='es-wrapper' width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top'> 
            <tr style='border-collapse:collapse'> 
            <td valign='top' style='padding:0;Margin:0'> 
            <table cellpadding='0' cellspacing='0' class='es-header' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top'> 
                <tr style='border-collapse:collapse'> 
                <td class='es-adaptive' align='center' style='padding:0;Margin:0'> 
                <table class='es-header-body' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3D5CA3;width:600px' cellspacing='0' cellpadding='0' bgcolor='#3d5ca3' align='center'> 
                    <tr style='border-collapse:collapse'> 
                    <td style='Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#37DBFF' bgcolor='#37dbff' align='left'> 
                    <!--[if mso]><table style='width:560px' cellpadding='0' 
                                cellspacing='0'><tr><td style='width:100px' valign='top'><![endif]--> 
                    <table class='es-left' cellspacing='0' cellpadding='0' align='left' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left'> 
                        <tr style='border-collapse:collapse'> 
                        <td class='es-m-p20b' align='left' style='padding:0;Margin:0;width:100px'> 
                        <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                            <tr style='border-collapse:collapse'> 
                            <td class='es-m-p0l es-m-txt-c' align='left' style='padding:0;Margin:0;font-size:0px'><a href='https://thegoodfork.herokuapp.com/' target='_blank' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1376C8;font-size:14px'><img src='cid:logo' alt style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic' width='100'></a></td> 
                            </tr> 
                        </table></td> 
                        </tr> 
                    </table> 
                    <!--[if mso]></td><td style='width:20px'></td><td style='width:440px' valign='top'><![endif]--> 
                    <table class='es-right' cellspacing='0' cellpadding='0' align='right' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right'> 
                        <tr style='border-collapse:collapse'> 
                        <td align='left' style='padding:0;Margin:0;width:440px'> 
                        <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                            <tr style='border-collapse:collapse'> 
                            <td align='right' style='padding:0;Margin:0;padding-bottom:10px;padding-top:15px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#FFFFFF;font-size:30px'><strong>TheGoodFork</strong></p></td> 
                            </tr> 
                        </table></td> 
                        </tr> 
                    </table> 
                    <!--[if mso]></td></tr></table><![endif]--></td> 
                    </tr> 
                </table></td> 
                </tr> 
            </table> 
            <table class='es-content' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%'> 
                <tr style='border-collapse:collapse'> 
                <td style='padding:0;Margin:0;background-color:#FAFAFA' bgcolor='#fafafa' align='center'> 
                <table class='es-content-body' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px' cellspacing='0' cellpadding='0' bgcolor='#ffffff' align='center'> 
                    <tr style='border-collapse:collapse'> 
                    <td style='padding:0;Margin:0;padding-top:10px;padding-left:10px;padding-right:10px;background-color:transparent' bgcolor='transparent' align='left'> 
                    <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                        <tr style='border-collapse:collapse'> 
                        <td valign='top' align='center' style='padding:0;Margin:0;width:580px'> 
                        <table style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top' width='100%' cellspacing='0' cellpadding='0' role='presentation'> 
                            <tr style='border-collapse:collapse'> 
                            <td align='center' style='padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px'><img src='cid:illustration' alt style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic' width='250'></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='center' style='padding:0;Margin:0;padding-top:15px;padding-bottom:15px'><h1 style='Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333'><strong>ACCOUNT VALIDATION FOR ${env_config_1.default.app_name}</strong></h1></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='center' style='padding:0;Margin:0;padding-left:40px;padding-right:40px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;font-size:16px'>HI&nbsp;<b>${username}</b>,</p></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='center' style='padding:0;Margin:0;padding-right:35px;padding-left:40px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;font-size:16px'>There was an account validation request!</p></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='center' style='padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;font-size:16px'>If did not make this request, just ignore this email. Otherwise, please click the button below to validate your email:</p></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='center' style='Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px'><span class='es-button-border-1 es-button-border' style='border-style:solid;border-color:#FF954D;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto'><a href='${env_config_1.default.app_uri}/auth/validate_account?redirectUri=${origin}&email=${to}&token=${token}' class='es-button' target='_blank' style='mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FF954D;font-size:14px;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center'>CONTINUE</a></span></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='left' style='padding:0;Margin:0;padding-bottom:10px;padding-left:40px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;font-size:16px'>Kind Regards,<br>${env_config_1.default.author}.</p></td> 
                            </tr> 
                        </table></td> 
                        </tr> 
                    </table></td> 
                    </tr> 
                    <tr style='border-collapse:collapse'> 
                    <td align='left' style='padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px'> 
                    <!--[if mso]><table style='width:580px' cellpadding='0' cellspacing='0'><tr><td style='width:199px' valign='top'><![endif]--> 
                    <table class='es-left' cellspacing='0' cellpadding='0' align='left' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left'> 
                        <tr style='border-collapse:collapse'> 
                        <td align='left' style='padding:0;Margin:0;width:199px'> 
                        <table style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center' width='100%' cellspacing='0' cellpadding='0' role='presentation'> 
                            <tr style='border-collapse:collapse'> 
                            <td class='es-m-txt-c' align='right' style='padding:0;Margin:0;padding-top:10px;padding-bottom:10px;padding-left:40px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:19px;color:#666666;font-size:16px'><strong>Follow us:</strong></p></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td class='es-m-txt-c' align='right' style='padding:0;Margin:0;padding-top:10px;padding-bottom:10px;padding-left:40px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:14px;color:#666666;font-size:12px'>Contact us:</p></td> 
                            </tr> 
                        </table></td> 
                        </tr> 
                    </table> 
                    <!--[if mso]></td><td style='width:20px'></td><td style='width:361px' valign='top'><![endif]--> 
                    <table class='es-right' cellspacing='0' cellpadding='0' align='right' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right'> 
                        <tr style='border-collapse:collapse'> 
                        <td align='left' style='padding:0;Margin:0;width:361px'> 
                        <table style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center center' width='100%' cellspacing='0' cellpadding='0' role='presentation'> 
                            <tr style='border-collapse:collapse'> 
                            <td class='es-m-txt-c' align='left' style='padding:0;Margin:0;padding-top:5px;padding-bottom:5px;padding-left:15px;font-size:0'> 
                            <table class='es-table-not-adapt es-social' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                                <tr style='border-collapse:collapse'> 
                                <td valign='top' align='center' style='padding:0;Margin:0;padding-right:25px'><a target='_blank' href='https://facebook.com/thegoodforkoff' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#0B5394;font-size:16px'><img src='cid:facebook' alt='Fb' title='Facebook' width='32' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic'></a></td> 
                                <td valign='top' align='center' style='padding:0;Margin:0;padding-right:25px'><a target='_blank' href='https://twitter.com/thegoodforkoff' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#0B5394;font-size:16px'><img src='cid:twitter' alt='Tw' title='Twitter' width='32' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic'></a></td> 
                                <td valign='top' align='center' style='padding:0;Margin:0'><a target='_blank' href='https://instagram.com/thegoodforkoff' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#0B5394;font-size:16px'><img src='cid:instagram' alt='Ig' title='Instagram' width='32' style='display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic'></a></td> 
                                </tr> 
                            </table></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='left' style='padding:0;Margin:0;padding-top:5px;padding-bottom:15px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#666666;font-size:14px'><a target='_blank' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#666666;font-size:14px' href='tel:123456789'>+</a>33685539966 | thegoodfork.co@outlook.com</p></td> 
                            </tr> 
                        </table></td> 
                        </tr> 
                    </table> 
                    <!--[if mso]></td></tr></table><![endif]--></td> 
                    </tr> 
                </table></td> 
                </tr> 
            </table> 
            <table class='es-footer' cellspacing='0' cellpadding='0' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top'> 
                <tr style='border-collapse:collapse'> 
                <td style='padding:0;Margin:0;background-color:#FAFAFA' bgcolor='#fafafa' align='center'> 
                <table class='es-footer-body' cellspacing='0' cellpadding='0' bgcolor='#ffffff' align='center' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px'> 
                    <tr style='border-collapse:collapse'> 
                    <td style='Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#37DBFF' bgcolor='#37dbff' align='left'> 
                    <table width='100%' cellspacing='0' cellpadding='0' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                        <tr style='border-collapse:collapse'> 
                        <td valign='top' align='center' style='padding:0;Margin:0;width:560px'> 
                        <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'> 
                            <tr style='border-collapse:collapse'> 
                            <td align='left' style='padding:0;Margin:0;padding-top:5px;padding-bottom:5px'><h2 style='Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#FFFFFF'><strong>Have quastions?</strong></h2></td> 
                            </tr> 
                            <tr style='border-collapse:collapse'> 
                            <td align='left' style='padding:0;Margin:0;padding-bottom:5px'><p style='Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px'>We are here to help, learn more about us <a target='_blank' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px' href=''>here</a> or <a target='_blank' style='-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px' href=''>contact us</a></p></td> 
                            </tr> 
                        </table></td> 
                        </tr> 
                    </table></td> 
                    </tr> 
                </table></td> 
                </tr> 
            </table></td> 
            </tr> 
        </table> 
        </div>  
        </body>
        </html>
    `;
}
exports.template = template;
exports.attachments = [
    {
        filename: '2231619622330540.png',
        path: __dirname + '/images/2231619622330540.png',
        cid: 'illustration'
    },
    {
        filename: '22661619618814374.png',
        path: __dirname + '/images/22661619618814374.png',
        cid: 'logo'
    },
    {
        filename: 'facebook-rounded-colored-bordered.png',
        path: __dirname + '/images/facebook-rounded-colored-bordered.png',
        cid: 'facebook'
    },
    {
        filename: 'instagram-rounded-colored-bordered.png',
        path: __dirname + '/images/instagram-rounded-colored-bordered.png',
        cid: 'instagram'
    },
    {
        filename: 'twitter-rounded-colored-bordered.png',
        path: __dirname + '/images/twitter-rounded-colored-bordered.png',
        cid: 'twitter'
    }
];
