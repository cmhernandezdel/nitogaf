function parseCommand(command){
  var commandObj = {}
  var argsList = []
  var checkingArguments = true
  var params = "";

  for(var p in command){
    if(contains("-", p) && checkingArguments){
      argsList.push(p.substr(1))
    }
    else if(!contains("-", p) && checkingArguments){
      checkingArguments = false
      params += p
    }
    else{
      params += p
    }
  }

  commandObj['key'] = 'value'
  console.log(commandObj)
}

function contains(substr, str){
  if(str.indexOf(substr) > -1) {
    return true;
  }
  else{
    return false;
  }
}

module.exports = {
  parse: (args) => parseCommand(args)
}