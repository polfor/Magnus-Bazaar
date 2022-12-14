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
        this.hand.splice(this.hand.findIndex(handCard => handCard.id === card.id), 1)
        return (card);
    }

    removeCamel(card) {
        this.enclos.splice(this.enclos.findIndex(handCard => handCard.id === card.id), 1)
        return (card);
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

    getSocketId() {
        return this.socket.id
    }
    setSocket(newSocket) {
        this.socket = newSocket;
    }
    getSocketId() {
        return this.socket.id
    }

    getName() {
        return this.name;
    }
}

module.exports = Player;