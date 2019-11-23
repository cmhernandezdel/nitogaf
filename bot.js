const Discord = require('discord.js');
var auth = require('./keys/auth.json');
var commandsFile = require('./commands.json');

var bot = new Discord.Client();

bot.on('message', msg => {
  if(msg.content.substring(0, 1) === '!'){
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];

    if(cmd in commandsFile){
      let Executor = require(commandsFile[cmd]);
      let response = Executor['invoke'](args);
      msg.reply(response);
      delete require.cache[require.resolve(commandsFile[cmd])];
    }
  }
});

bot.login(auth.token);