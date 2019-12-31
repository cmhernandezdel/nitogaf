const HttpReq = require('../requests/httpget.js');
const apiKey = require('../keys/riot.json');
const basePath = "https://euw1.api.riotgames.com";
const byName= "/lol/summoner/v4/summoners/by-name/";
const championList = require('../data/champions.json');

async function getSummonerData(accountId){
  let endpoint = "/lol/league/v4/entries/by-summoner/";
  return HttpReq['httpGET'](basePath + endpoint + accountId, apiKey.token)
  .then(res => res)
  .catch(err => console.log(err));
}

async function getMain(accountId){
  let endpoint = "/lol/champion-mastery/v4/champion-masteries/by-summoner/";
  return HttpReq['httpGET'](basePath + endpoint + accountId, apiKey.token)
  .then(res => res)
  .catch(err => console.log(err));
}

module.exports = {
  invoke: async (commandObj) => {
    let response = "";
    let accountObj = await HttpReq['httpGET'](basePath + byName + commandObj["params"], apiKey.token);
    let accountId = accountObj.id; // this is the encrypted account ID used in every op
    
    // rank and LP
    if(commandObj['args'].includes("rank")){
      await getSummonerData(accountId)
      .then(moreSummonerData => {
        response += (moreSummonerData[0].tier + " " + moreSummonerData[0].rank + " " + moreSummonerData[0].leaguePoints + " LP\n")
      })
      .catch(err => console.log(err));
    }
    
    // wins, losses and winratio
    if(commandObj['args'].includes("winrate")){
      await getSummonerData(accountId)
      .then(moreSummonerData => {
        console.log(moreSummonerData);
        response += (moreSummonerData[0].wins + " wins, " + moreSummonerData[0].losses + " losses, " + (Math.round(((moreSummonerData[0].wins / (moreSummonerData[0].losses + moreSummonerData[0].wins)) * 100))) + "% winrate\n")
      })
      .catch(err => console.log(err));
    }
    

    // main
    if(commandObj['args'].includes("main")){
      await getMain(accountId)
      .then(mainData => {
        Object.keys(championList['data']).forEach(function(champName) {
          if(championList['data'][champName].key == mainData[0].championId){
            response += "Main champion (most mastery points): " + champName + "\n";
          }
        });
      })
      .catch(err => console.log(err));
    }

    return response;
  }
  
};