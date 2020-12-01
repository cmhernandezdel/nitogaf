module.exports = {
    invoke: async(commandObj) => {
        let faces = parseInt(commandObj['params'], 10);
        if(isNaN(faces)) return "Bad usage. The usage is: !dice n, where n is an integer.";
        let n = Math.random() * faces + 1;
        return "You rolled: " + Math.round(n);
    }
};