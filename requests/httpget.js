const https = require("axios");

const rpc = https.create({
  baseURL: 'localhost:8000', 
  proxy: false  
})

module.exports = {
  httpGET: async (url, apiKey) => {
    try {
      const response = await https.get(url, {
        headers: {
          "X-Riot-Token" : apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
