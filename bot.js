const Discord = require('discord.js');
var auth = require('./keys/auth.json');
var commandsFile = require('./commands.json');

var bot = new Discord.Client();

bot.on('ready', () => {
  console.log("Ready!")
})

bot.on('message', msg => {
  if(msg.content.substring(0, 1) === '!'){
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];

    if(cmd in commandsFile){
      let Executor = require(commandsFile[cmd]['location']);
      Executor['invoke'](args)
      .then(res => {
        msg.reply(res)
      } )
      .catch(err => msg.reply('Sorry, I didn\'t found that summoner.'))
      delete require.cache[require.resolve(commandsFile[cmd]['location'])];
    }
  }
});

bot.login(auth.token);