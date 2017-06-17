const Alexa = require("alexa-sdk");
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI(default-application_5943a68ce4b08a5f8310b0ce', '80394ec6-315c-4a75-92b8-b13bfac7f51b');

var handlers = {
  'LaunchRequest': function() {
    this.emit(':ask', "Welcome to the translate skill. Say something like translate butterfly to German");
  },

  'Translate': function() {
    const langCodes = {
        "German" : "de",
        "Dutch" : "nl",
        "English" : "en",
        "French" : "fr",
        "Italian" : "it",
        "Polish" : "pl",
        "Russian" : "ru",
        "Spanish" : "es"
    };

    var language = this.event.request.intent.slots.Language.value;
    var word = this.event.request.intent.slots.Source.value;
    var langCode = langCodes[language];

    rapid.call('GoogleTranslate', 'translateAutomatic', {
	     'apiKey': 'AIzaSyD8fly2fgta5ZFFTFICWw-7oEQvRLLnCuk',
	      'string': word,
	      'targetLanguage': langCode

    }).on('success', (payload) => {
      this.emit(":tell", `${word} is ${payload} in ${language}`);
    }).on('error', (payload) => {
      this.emit(":tell", "Sorry, translation was unsuccessful..");
    });

  }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
