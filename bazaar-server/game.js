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

        this.players.forEach((player, index) => {
            this.deck.splice(0, 5).forEach(card => {
                if (card.type != "camel") {
                    player.addToHand(card)
                } else {
                    player.addCamel(card)
                }
            })
            player.socket.on('sell', data => {
                sell(player, data);
            })
            player.socket.on('buy', data => {
                buy(player, data);
            })
            player.socket.emit('game-start', { playerNo: index, playerNames: [this.players[0].name, this.players[1].name] })
        })

        this.buildEvents();

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

    buildEvents() {
        this.players.forEach(player => {
            player.socket.on('trade', data => {
                this.trade(player, data)
                this.updateGame();
            })

            player.socket.on('sell', data => {
                this.sell(player, data)
                this.updateGame();
            })
        })


    }

    updateGame() {
       
        if(this.checkGameEnd()) {
            this.endGame();
        }
        else {
            if(this.currentPlayer == 0) {
                this.currentPlayer = 1;
            }
            else {
                this.currentPlayer = 0;
            }
    
            this.io.to(this.room).emit('game-update', {
                deck: this.deck,
                players: [
                    {
                        hand: this.players[0].getHand(),
                        enclosure: this.players[0].getEnclos(),
                        tokens: this.players[0].getTokens()
                    },
                    {
                        hand: this.players[1].getHand(),
                        enclosure: this.players[1].getEnclos(),
                        tokens: this.players[1].getTokens()
                    }
                ],
                market: this.market,
                graveyard: this.graveyard,
                tokens: this.tokens,
                currentPlayer: this.currentPlayer
            })
        }

        
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

        while (this.market.length < 5) {
            if(this.deck.length) {
                this.market.push(this.deck.splice(0, 1));
            }
            else {
                this.io.to(this.room).emit("alert", { type: "notif", message: "Plus assez de cartes dans le deck !" })
                this.endGame();
                return;
            }
        }
    }

    sell(player, data) {
        data.soldCards.forEach(card => {
            this.graveyard.push(player.removeFromHand(card));
            switch (card.value) {
                case "diamond":
                    player.addToTokens(this.tokens.diamond.splice(0, 1))
                    break;
                case "gold":
                    player.addToTokens(this.tokens.gold.splice(0, 1))
                    break;
                case "silver":
                    player.addToTokens(this.tokens.silver.splice(0, 1))
                    break;
                case "cloth":
                    player.addToTokens(this.tokens.cloth.splice(0, 1))
                    break;
                case "spice":
                    player.addToTokens(this.tokens.spice.splice(0, 1))
                    break;
                case "leather":
                    player.addToTokens(this.tokens.leather.splice(0, 1))
                    break;
                default:
                    player.socket.emit("alert", { type: "error", message: "Essayé de vendre une carte illégale", card: card })
                    return;
            }
        })
        let nbSoldCards = data.soldCards.length
        if (nbSoldCards >= 3) {
            if (nbSoldCards >= 5) {
                player.addToTokens(this.tokens.bonus[5].splice(0, 1));
            } else {
                player.addToTokens(this.tokens.bonus[nbSoldCards].splice(0, 1));
            }
        }

    }

    changePlayerSocket(playerNb, socket) {
        this.players[playerNb].setSocket(socket);
        this.players.forEach((player, index) => {
            player.socket.emit('game-start', { playerNo: index, playerNames: [this.players[0].name, this.players[1].name] })
        })
        socket.emit('game-update', {
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

    isPlayerConnected(playerNb) {
        for (let player of this.io.to('/').adapter.rooms.get(this.room)) {
            if (player == this.players[playerNb].getSocketId()) {
                return (true)
            }
        }
        return (false)
    }

    checkGameEnd() {
        let emptyTokens = 0;
        this.tokens.forEach(tokenType => {
            if(Array.isArray(tokenType) && !tokenType.length) {
                emptyTokens++;
            }
        })
        if(emptyTokens >= 3) {
            return true;
        }
        return false;
    }

    endGame() {
        let results = {
            players: [
                {
                    totalPoints: 0,
                    camelToken : false
                },
                {
                    totalPoints: 0,
                    camelToken : false
                }
            ],
            winner
        }
        this.players.forEach( (player, index) => {
            player.getTokens().forEach( token => {
                results.players[index].totalPoints += token.value;
            })
        })

        if(this.players[0].getEnclos().length > this.players[1].getEnclos().length) {
            results.players[0].camelToken = true;
            results.players[0].totalPoints += 5;
        }
        else {
            if(this.players[1].getEnclos().length > this.players[0].getEnclos().length) {
                results.players[1].camelToken = true;
                results.players[1].totalPoints += 5;
            }
        }

        if(results.players[0].totalPoints > results.players[1].totalPoints){
            results.winner = 0;
        }
        else {
            if(results.players[1].totalPoints > results.players[0].totalPoints) {
                results.winner = 1;
            }
            else {
                let jetonsBonus = [ 
                    this.players[0].getTokens().map(token =>{
                        if(token.type.includes('bonus')) {
                            return token;
                        }
                    }).length,
                    this.players[1].getTokens().map(token =>{
                        if(token.type.includes('bonus')) {
                            return token;
                        }
                    }).length
                ]
                if(jetonsBonus[0] > jetonsBonus[1]) {
                    results.winner = 0
                }
                else {
                    if(jetonsBonus[1] > jetonsBonus[0]){
                        results.winner = 1
                    }
                    else {
                        
                    }
                }
            }
        }
    }
}

module.exports = Game;