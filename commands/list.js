var commandsFile = require('../commands.json');

module.exports = {
  invoke: async () => {
    let keys = Object.keys(commandsFile)
    var length = keys.length;
    let strKeys = "\nCommands:\n"
    for(var i = 0; i < length; i++){
      strKeys += "!" + keys[i] + ": " + commandsFile[keys[i]]['description'] + ".\n";
    }
    return strKeys
  }
};