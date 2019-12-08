function parseCommand(command){
  var commandObj = {}
  var argsList = []
  var checkingArguments = true
  var params = "";

  command.shift() // remove the first item

  for(var p in command){
    let val = command[p]
    if(contains("-", val) && checkingArguments){
      argsList.push(val.substr(1))
    }
    else if(!contains("-", val) && checkingArguments){
      checkingArguments = false
      params += val + " "
    }
    else if (!contains("-", val) && !checkingArguments){
      params += val + " "
    }
  }

  params = params.substring(0, params.length-1) // remove trailing space

  commandObj['args'] = argsList
  commandObj['params'] = params
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