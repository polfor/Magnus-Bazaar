class Player {
    socket;
    name;
    hand = [];
    enclos = [];
    tokens = [];

    constructor(socket, name) {
        this.socket = socket;
        this.name = name;
    }

    addToHand(cards) {
        cards.forEach(card => {
            this.hand.push(card);
        });
    }

    addToTokens(tokens) {
        tokens.forEach(token => {
            this.tokens.push(token);
        })
    }
}

module.exports = Player;