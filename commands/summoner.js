const HttpReq = require('../requests/httpget.js');
const apiKey = require('../keys/riot.json');
const basePath = "https://euw1.api.riotgames.com";
const byName= "/lol/summoner/v4/summoners/by-name/";

async function checkELO(accountId){
  const endpoint = "/lol/league/v4/entries/by-summoner/"
  return HttpReq['httpGET'](basePath + endpoint + accountId, apiKey.token)
  .then(res => res)
  .catch(err => console.log(err))
}

module.exports = {
  invoke: async (args) => {
    return HttpReq['httpGET'](basePath + byName + args[1], apiKey.token)
    .then(summonerData => { 
      return checkELO(summonerData.id)
      .then(moreSummonerData => (moreSummonerData[0].tier + " " + moreSummonerData[0].rank))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }
};