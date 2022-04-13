const { I18n } = require('i18n')
const path = require('path');

exports.i18n = new I18n({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  header: 'lang',
  directory: path.join(__dirname, 'locales')
});