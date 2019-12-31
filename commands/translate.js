var wr = require('wordreference-api');

module.exports = {
  invoke: async(commandObj) => {
    let translation = "";
    let response = "";

    // spanish to english
    if(commandObj['args'].includes("en")){
      await wr(commandObj['params'], 'es', 'en')
      .then(tl => {
        translation = tl;
      })
      .catch(err => console.log(err));
    }

    // english to spanish
    else{
      await wr(commandObj['params'], 'en', 'es')
      .then(tl => {
        translation = tl;
      })
      .catch(err => console.log(err));
    }

    for(var i = 0; i < translation.translations[0].translations.length; i++){
      response += translation.translations[0].translations[i].to + ", ";
    }

    return response;
  }
};