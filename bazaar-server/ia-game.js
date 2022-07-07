const Game = require('./game');
const IAPlayer = require('./ia-player');
const seedrandom = require('seedrandom');


const jsonCards = require('./cards.json').cards;
const jsonTokens = require('./tokens.json').tokens;


class IAGame extends Game {

    constructor(io, player1) {
        player1.socket.emit('ia-start');
        super(io, player1.socket.id, player1, new IAPlayer())
        setTimeout(() => {
            if (this.currentPlayer == 1) {
                this.iaPlay()
                this.updateGame();
            }
        }, 2000)
    }

    buildEvents() {
        this.players[0].socket.on('trade', data => {
            this.trade(this.players[0], data)
            this.updateGame();
            setTimeout(() => {
                if (!this.isEnded()) {
                    this.iaPlay()
                    this.updateGame();
                }
            }, 2000)
        })

        this.players[0].socket.on('sell', data => {
            this.sell(this.players[0], data);
            this.updateGame();
            setTimeout(() => {
                if (!this.isEnded()) {
                    this.iaPlay()
                    this.updateGame();
                }
            }, 2000)
        })
    }

    iaPlay() {
        /*
         * Choix possibles :
         * 
         *   Vendre toutes les cartes d'un type
         *   Prendre tous les chameaux du marché
         *   Prendre une carte non chameau au hasard
         *   
         */
        if (this.players[1].getHand().length >= 7) {
            this.sell(this.players[1], this.players[1].sellRandom())
        } else {
            if (!this.players[1].getHand().length || this.players[1].getIllegalToSell()) {
                this.trade(this.players[1], this.players[1].pickRandom(this.market));
            } else {
                if (Math.random() > .5) {
                    this.sell(this.players[1], this.players[1].sellRandom());
                } else {
                    this.trade(this.players[1], this.players[1].pickRandom(this.market));
                }
            }
        }

    }



}

module.exports = IAGame;