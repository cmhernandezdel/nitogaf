const Discord = require('discord.js');
var auth = require('./keys/auth.json');
var commandsFile = require('./commands.json');
var parser = require('./parser.js');

var bot = new Discord.Client();

bot.on('ready', () => {
  console.log("Ready!");
});

bot.on('message', msg => {
  if(msg.content.substring(0, 1) === '!'){
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];
    var commandObj = parser.parse(args);

    if(cmd in commandsFile){
      let Executor = require(commandsFile[commandObj['command']]['location']);
      Executor['invoke'](commandObj)
      .then(res => {
        msg.reply(res)
      } )
      .catch(err => msg.reply('Could not perform operation. Type !list to see the commands.'))
      delete require.cache[require.resolve(commandsFile[cmd]['location'])];
    }
  }
});

bot.login(auth.token);