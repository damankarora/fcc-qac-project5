'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;

      if (text === "") {
        return res.status(400).json({ error: 'No text to translate' });
      }
      
      if(!text || !locale){
        return res.status(400).json({ error: 'Required field(s) missing' })
      }

      

      let locales = ["american-to-british", "british-to-american"]
      if(!locales.includes(locale)){
        return res.status(400).json({ error: 'Invalid value for locale field' });
      }

      let mode = locales.indexOf(locale);
      let result = null;
      if(mode === 0){
        result = translator.toBritish(text, true);
      }else if(mode === 1){
        result = translator.toAmerican(text, true);
      }

      if(result === text){
        return res.json({ text: text, translation: "Everything looks good to me!"});
      }else{
        return res.json({text: text, translation: result});
      }
    });
};
