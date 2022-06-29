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
}

module.exports = Player;