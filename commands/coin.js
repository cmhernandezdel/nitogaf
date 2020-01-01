module.exports = {
  invoke: async() => {
    let n = Math.random();
    if(n >= 0.5){
      return "Heads";
    }
    else{
      return "Tails";
    }
  }
};