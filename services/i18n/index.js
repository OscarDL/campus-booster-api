const { I18n } = require('i18n')
const path = require('path');

exports.i18n = new I18n({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  header: 'lang',
  directory: path.join(__dirname, 'locales'),
  autoReload: true,

  missingKeyFn: function (locale, value) {
    if(value.includes('_missing')) {
      const key = value.split('_missing').first();
      switch (locale) {
        case "fr":
          return `Vous devez spécifier "${key}" dans votre requête.`;
        default:
          return `You should specify "${key}" in your request.`;
      }
    } else if(value.includes('_not_found')) {
      const key = value.split('_not_found').first();
      switch (locale) {
        case "fr":
          return `Aucun "${key.toLocaleLowerCase()}" n'a été trouvé.`;
        default:
          return `No "${key.toLocaleLowerCase()}" was found.`;
      }
    }
    return value;
  },
});