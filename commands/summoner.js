const HttpReq = require('../requests/httpget.js');
const apiKey = require('../keys/riot.json');
const basePath = "https://euw1.api.riotgames.com";
const endPoint= "/lol/summoner/v4/summoners/by-name/";


module.exports = {
  invoke: function (args) {
    HttpReq['httpGET'](basePath + endPoint + args[1], apiKey.token);
  }
};