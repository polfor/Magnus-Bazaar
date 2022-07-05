const Player = require('./player');

class IAPlayer extends Player {
    constructor () {
        super("", "Le Marchand")
        console.log(this.addToHand)
    }
}


module.exports = IAPlayer;