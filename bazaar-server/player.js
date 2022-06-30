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

    addToHand(card) {
        this.hand.push(card);
    }

    addToTokens(token) {
        this.tokens.push(token);
    }

    addCamel(camel) {
        this.enclos.push(camel)
    }

    removeFromHand(card) {
        // this.
    }

    getHand() {
        return this.hand;
    }

    getEnclos() {
        return this.enclos;
    }

    getTokens() {
        return this.tokens;
    }
}

module.exports = Player;