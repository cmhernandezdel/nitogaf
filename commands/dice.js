module.exports = {
    invoke: async(commandObj) => {
        let faces = parseInt(commandObj['params'], 10);
        let n = Math.random() * faces + 1;
        return "You rolled: " + Math.round(n);
    }
};