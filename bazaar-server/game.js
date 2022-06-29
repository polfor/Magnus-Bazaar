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
const cards = require('./cards.json');

class Game {

    room;
    seed;
    deck = [];
    market = [];
    players = [];

    constructor(roomName, player1, player2) {
        this.room = roomName;
        this.seed = seedrandom(roomName)
        this.players.push(player1, player2);
    }
    createGame() {
        cards.cards.slice(0, 3).forEach(card => {
            this.market.push(card)
        })
        this.deck = this.shuffleCards(cards.cards.slice(3))
        this.deck.splice(0, 2).forEach(card => {
            this.market.push(card)
        });
        console.log(this.market)
        console.log(this.deck.length)
    }

    shuffleCards(array) {
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
}

module.exports = Game;