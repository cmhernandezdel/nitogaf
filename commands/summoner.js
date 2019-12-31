const HttpReq = require('../requests/httpget.js');
const apiKey = require('../keys/riot.json');
const basePath = "https://euw1.api.riotgames.com";
const byName= "/lol/summoner/v4/summoners/by-name/";
const mastery = "/lol/champion-mastery/v4/champion-masteries/by-summoner/"

async function getSummonerData(accountId){
  const endpoint = "/lol/league/v4/entries/by-summoner/"
  return HttpReq['httpGET'](basePath + endpoint + accountId, apiKey.token)
  .then(res => res)
  .catch(err => console.log(err))
}

module.exports = {
  invoke: async (commandObj) => {
    let response = "";
    let 

    // rank and LP
    if(commandObj['args'].includes("rank")){
      await HttpReq['httpGET'](basePath + byName + commandObj["params"], apiKey.token)
      .then(summonerData => { 
        return getSummonerData(summonerData.id)
        .then(moreSummonerData => {
          response += (moreSummonerData[0].tier + " " + moreSummonerData[0].rank + " " + moreSummonerData[0].leaguePoints + " LP\n")
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }

    // wins, losses and winratio
    if(commandObj['args'].includes("winrate")){
      await HttpReq['httpGET'](basePath + byName + commandObj["params"], apiKey.token)
      .then(summonerData => { 
        return getSummonerData(summonerData.id)
        .then(moreSummonerData => {
          response += (moreSummonerData[0].wins + " wins, " + moreSummonerData[0].losses + " losses, " + (Math.round(((moreSummonerData[0].wins / (moreSummonerData[0].losses + moreSummonerData[0].wins)) * 100))) + "% winrate\n")
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }

    if(commandObj['args'].includes("main")){
      await HttpReq['httpGET'](basePath + mastery + commandObj["params"], apiKey.token)
      .then(masteryData => {

      })
    }

    return response;
  }

};