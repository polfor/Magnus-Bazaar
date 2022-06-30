const Player = require('./player');
seedrandom = require('seedrandom');
const cardsTemplate = {
    "cards": [{
        "current_position": "",
        "new_position": "",
        "type": "",
        "value": ""
    }],
    "deck": ""
}
const baseCards = require('./cards.json').cards;
const baseTokens = require('./tokens.json').tokens;

class Game {

    io;
    room;
    seed;
    deck = [];
    graveyard = [];
    market = [];
    tokens = {
        diamond: [],
        gold: [],
        silver: [],
        cloth: [],
        spice: [],
        leather: [],
        bonus: {
            3: [],
            4: [],
            5: []
        }
    }
    players = [];
    currentPlayer;

    constructor(io, roomName, player1, player2) {
        this.io = io;
        this.room = roomName;
        this.seed = seedrandom(roomName)
        this.players.push(player1, player2);

        if (this.seed.quick() >= .5) {
            this.currentPlayer = 0
        } else {
            this.currentPlayer = 1
        }

        baseCards.slice(0, 3).forEach(card => {
            this.market.push(card)
        })
        this.deck = this.shuffle(baseCards.slice(3))
        this.deck.splice(0, 2).forEach(card => {
            this.market.push(card)
        });

        this.tokens.diamond = baseTokens.diamond;
        this.tokens.gold = baseTokens.gold;
        this.tokens.silver = baseTokens.silver;
        this.tokens.cloth = baseTokens.cloth;
        this.tokens.spice = baseTokens.spice;
        this.tokens.leather = baseTokens.leather;
        this.tokens.bonus[3] = this.shuffle(baseTokens.bonus[3]);
        this.tokens.bonus[4] = this.shuffle(baseTokens.bonus[4]);
        this.tokens.bonus[5] = this.shuffle(baseTokens.bonus[5]);

        let i = 1
        this.players.forEach(player => {
            this.deck.splice(0, 5).forEach(card => {
                player.addToHand(card)
            })
            player.socket.on('sell', data => {
                sell(player, data);
            })
            player.socket.on('buy', data => {
                buy(player, data);
            })
            this.io.to(player.socket).emit('game-start', { playerNo: i++, player1Name: this.players[0].name, player2Name: this.players[1].name })
        })


        this.updateGame();
    }

    shuffle(array) {
        let curId = array.length;
        while (0 !== curId) {
            let randId = Math.floor(this.seed.quick() * curId);
            curId -= 1;
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    }

    updateGame() {
        this.io.to(this.room).emit('game-update', {
            deck: this.deck,
            players: [{
                    hand: this.players[0].getHand(),
                    enclos: this.players[0].getEnclos(),
                    tokens: this.players[0].getTokens()
                },
                {
                    hand: this.players[1].getHand(),
                    enclos: this.players[1].getEnclos(),
                    tokens: this.players[1].getTokens()
                }
            ],
            market: this.market,
            graveyard: this.graveyard,
            tokens: this.tokens,
            currentPlayer: this.currentPlayer
        })

    }

    trade(player, data) {
        data.tradedCards.forEach(card => {
            if (card.type != "camel") {
                player.removeFromHand(card)
            } else {
                player.removeCamel(card)
            }
        })

        data.takenCards.forEach(card => {
            if (card.type != "camel") {
                player.addToHand(card)
            } else {
                player.addCamel(card)
            }
        })
    }
}

module.exports = Game;