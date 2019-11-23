var Discord = require('discord.io');
var auth = require('./auth.json');
var commands = require('./commands.json');

var bot = new Discord.client({
  token: auth.token,
  autorun: true
});

bot.on('message', function (user, userID, channelID, message, evt) {
  if(message.substring(0, 1) == '!'){
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    if(cmd in commands){
      var Executor = require(commands[cmd]);
      var commandExecutor = new Executor();
      commandExecutor.invoke();
      delete require.cache[require.resolve(Executor)];
    }
    
  }
});