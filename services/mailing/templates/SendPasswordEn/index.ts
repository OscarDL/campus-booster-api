import path from "path";

export function template(email: string, username: string, password: string): string {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
     <head> 
      <meta charset="UTF-8"> 
      <meta content="width=device-width, initial-scale=1" name="viewport"> 
      <meta name="x-apple-disable-message-reformatting"> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
      <meta content="telephone=no" name="format-detection"> 
      <title>Supinfo Notification</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--> 
      <style type="text/css">
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
    [data-ogsb] .es-button {
        border-width:0!important;
        padding:10px 15px 10px 15px!important;
    }
    [data-ogsb] .es-button.es-button-1 {
        padding:5px 10px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h1 a { text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } h2 a { text-align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } h3 a { text-align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:11px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
    </style> 
     </head> 
     <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
      <div class="es-wrapper-color" style="background-color:#F7F7F7"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f7f7f7"></v:fill>
                </v:background>
            <![endif]--> 
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td valign="top" style="padding:0;Margin:0"> 
           <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
             <tr style="border-collapse:collapse"> 
              <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
               <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3d5ca3;width:600px" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td style="Margin:0;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:20px;background-color:#3d2683" bgcolor="#3d2683" align="left"><!--[if mso]><table style="width:570px" cellpadding="0" 
                            cellspacing="0"><tr><td style="width:274px" valign="top"><![endif]--> 
                   <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:274px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="es-m-p0l es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0px"><a href="https://supinfo.com" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#3D5CA3;font-size:14px"><img src="cid:supinfo" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if mso]></td><td style="width:20px"></td><td style="width:276px" valign="top"><![endif]--> 
                   <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;width:276px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="right" style="padding:0;Margin:0;padding-right:25px;padding-top:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#ffffff;font-size:25px"><strong>Notification</strong></p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fafafa;width:600px" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td style="padding:0;Margin:0;background-repeat:no-repeat" align="left"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0;position:relative" align="center"><img class="adapt-img" src="cid:background" alt title width="600" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px;background-image:url('cid:font');background-position:center top;background-repeat:no-repeat" align="left" background="cid:font"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">Hello <strong>${username}</strong>,</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#333333;font-size:18px">This e-mail corresponds to your request to create an account for the Campus Booster platform.<br>Please find below your access details for ${email}</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px">Password :</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#3d2683;font-size:16px;border:2px solid #3d2683;width:30%;border-radius:.25rem;padding:5px"><b>${password}</b></p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#333333;text-align:center"><strong>Most popular</strong></h2></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:40px;padding-right:40px"><!--[if mso]><table style="width:520px" cellpadding="0" 
                                cellspacing="0"><tr><td style="width:175px" valign="top"><![endif]--> 
                   <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:170px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0px"><a target="_blank" href="https://www.supinfo.com/ecole-metiers-informatique/faq/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#3D5CA3;font-size:14px"><img src="cid:faq" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="75"></a></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:5px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333">FAQ</h3></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:20px"><span class="es-button-border" style="border-style:solid;border-color:#3d2683;background:#ffffff;border-width:2px;display:inline-block;border-radius:4px;width:auto"><a href="https://www.supinfo.com/ecole-metiers-informatique/faq/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#3d2683;font-size:14px;border-style:solid;border-color:#FFFFFF;border-width:5px 10px;display:inline-block;background:#FFFFFF;border-radius:4px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center">See more »</a></span></td> 
                         </tr> 
                       </table></td> 
                      <td class="es-hidden" style="padding:0;Margin:0;width:5px"></td> 
                     </tr> 
                   </table><!--[if mso]></td><td style="width:170px" valign="top"><![endif]--> 
                   <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:170px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0"><a target="_blank" href="https://www.supinfo.com/formations-metiers-informatique/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#3D5CA3;font-size:14px"><img src="cid:programme" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="75"></a></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:5px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333">Program</h3></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:20px"><span class="es-button-border" style="border-style:solid;border-color:#3d2683;background:#ffffff;border-width:2px;display:inline-block;border-radius:4px;width:auto"><a href="https://www.supinfo.com/formations-metiers-informatique/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#3d2683;font-size:14px;border-style:solid;border-color:#FFFFFF;border-width:5px 10px;display:inline-block;background:#FFFFFF;border-radius:4px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center">See more »</a></span></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if mso]></td><td style="width:5px"></td><td style="width:170px" valign="top"><![endif]--> 
                   <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:170px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0px"><a target="_blank" href="https://www.supinfo.com/domaines-specialisation-informatique/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#3D5CA3;font-size:14px"><img src="cid:competences" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="75"></a></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:5px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333">Skills</h3></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:20px"><span class="es-button-border" style="border-style:solid;border-color:#3d2683;background:#ffffff;border-width:2px;display:inline-block;border-radius:4px;width:auto"><a href="https://www.supinfo.com/domaines-specialisation-informatique/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#3d2683;font-size:14px;border-style:solid;border-color:#FFFFFF;border-width:5px 10px;display:inline-block;background:#FFFFFF;border-radius:4px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center">See more »</a></span></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:10px;Margin:0;font-size:0"> 
                           <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td style="padding:0;Margin:0;border-bottom:0px solid #efefef;background:none 0% 0% repeat scroll #FFFFFF;height:1px;width:100%;margin:0px"></td> 
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
           <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" bgcolor="#3d2683" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3d2683;width:600px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px"><!--[if mso]><table style="width:580px" cellpadding="0"
                                cellspacing="0"><tr><td style="width:190px" valign="top"><![endif]--> 
                   <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:190px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="es-m-txt-c" esdev-links-color="#666666" align="right" style="padding:0;Margin:0;padding-top:5px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#ffffff">Follow us:</h4></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if mso]></td><td style="width:20px"></td><td style="width:370px" valign="top"><![endif]--> 
                   <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;width:370px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0"> 
                           <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://facebook.com/supinfo" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px"><img title="Facebook" src="cid:facebook" alt="Fb" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                              <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://twitter.com/supinfo" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px"><img title="Twitter" src="cid:twitter" alt="Tw" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                              <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://instagram.com/supinfo" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px"><img title="Instagram" src="cid:instagram" alt="Inst" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                              <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://www.youtube.com/channel/UCmi8vixnGa8z5sJF_NZCUzg" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px"><img title="Youtube" src="cid:youtube" alt="Yt" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                              <td valign="top" align="center" style="padding:0;Margin:0"><a target="_blank" href="https://www.linkedin.com/school/supinfo-ecoleinformatique/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px"><img title="Linkedin" src="cid:linkedin" alt="In" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:580px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h5 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#ffffff">Contact us: <a target="_blank" href="tel:0144788888" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:12px">01 44 78 88 88</a>&nbsp;| <a target="_blank" href="https://supinfo.com/contact" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:12px">Supinfo.com/contact</a></h5></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#dddcdc;font-size:9px">This school is a member of IONIS Education Group as : ISG - ISG LUXURY MANAGEMENT - ISG SPORT BUSINESS MANAGEMENT - ISEG - Groupe ISEFAC - ISEFAC R.H. - ICS Bégué - XP - MOD’SPE Paris - EPITA - EPITA I.A INSTITUT - ESME - IPSA - Sup'Biotech - Epitech Technology - Epitech Digital - Coding Academy - Web@cademie - e-artsup - Ionis - STM - ETNA - SUPINFO DIGITAL - IONIS 361 - IONISx - PHG - SECURESPHERE by EPITA - Concours Advance - Fondation IONIS</p></td> 
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


export const attachments = [
    {
        filename: 'supinfo.png',
        path: path.join(__dirname, '/images/supinfo.png'),
        cid: 'supinfo'
    },
    {
        filename: 'background.png',
        path: path.join(__dirname, '/images/background.png'),
        cid: 'background'
    },
    {
        filename: 'competences.png',
        path: path.join(__dirname, '/images/competences.png'),
        cid: 'competences'
    },
    {
        filename: 'facebook.png',
        path: path.join(__dirname, '/images/facebook.png'),
        cid: 'facebook'
    },
    {
        filename: 'faq.png',
        path: path.join(__dirname, '/images/faq.png'),
        cid: 'faq'
    },
    {
        filename: 'font.png',
        path: path.join(__dirname, '/images/font.png'),
        cid: 'font'
    },
    {
        filename: 'instagram.png',
        path: path.join(__dirname, '/images/instagram.png'),
        cid: 'instagram'
    },
    {
        filename: 'linkedin.png',
        path: path.join(__dirname, '/images/linkedin.png'),
        cid: 'linkedin'
    },
    {
        filename: 'programme.png',
        path: path.join(__dirname, '/images/programme.png'),
        cid: 'programme'
    },
    {
        filename: 'twitter.png',
        path: path.join(__dirname, '/images/twitter.png'),
        cid: 'twitter'
    },
    {
        filename: 'youtube.png',
        path: path.join(__dirname, '/images/youtube.png'),
        cid: 'youtube'
    }
]