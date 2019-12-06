const https = require("axios");

module.exports = {
  httpGET: async (theUrl, apiKey) => {
    return https({
      url: theUrl,
      method: 'get',
      timeout: 8000,
      headers: {
        'X-Riot-Token': apiKey,
      }
    })
    .then(res => res.data)
    .catch(err => console.log(err))
  } 
}