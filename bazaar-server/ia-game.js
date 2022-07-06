const Game = require('./game');
const IAPlayer = require('./ia-player');
const seedrandom = require('seedrandom');


const jsonCards = require('./cards.json').cards;
const jsonTokens = require('./tokens.json').tokens;


class IAGame extends Game {

    constructor(io, player1) {
        player1.socket.emit('ia-start');
        super(io, player1.socket.id, player1, new IAPlayer())
    }

    buildEvents() {
        this.players[0].socket.on('trade', data => {
            this.trade(player, data)
            this.iaPlay();
            this.updateGame();
        })

        this.players[0].socket.on('sell', data => {
            this.sell(player, data);
            this.iaPlay();
            this.updateGame();
        })
    }

    iaPlay() {
        /*
        Choix possibles :
        *   Vendre toutes les cartes d'un type
        *   Prendre tous les chameaux du marché
        *   Prendre une carte non chameau au hasard
        *   Echanger 
        *
        */
    }


}

module.exports = IAGame;