const { I18n } = require('i18n')
const path = require('path');

exports.i18n = new I18n({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  header: 'lang',
  directory: path.join(process.cwd(), 'services/i18n/locales'),
  autoReload: true,
  missingKeyFn: function (locale, value) {
    console.log(locale, value);
    //return locale === "fr" ? 'Erreur inconnue du serveur.' : 'Unknow server error.';
  },
});