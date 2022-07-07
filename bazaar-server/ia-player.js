const Player = require('./player');

class IAPlayer extends Player {
    constructor() {
        super("", "Le Marchand")
    }


    sellRandom() {

        let merchInHand = [{
                type: "diamond",
                nb: 0
            },
            {
                type: "gold",
                nb: 0
            },
            {
                type: "silver",
                nb: 0
            },
            {
                type: "spice",
                nb: 0
            },
            {
                type: "leather",
                nb: 0
            },
            {
                type: "cloth",
                nb: 0
            }
        ]


        this.hand.forEach(card => {
            merchInHand.forEach(merch => {
                if (merch.type == card.value) {
                    merch.nb++
                }
            })
        })

        merchInHand.sort((a, b) => {
            return b.nb - a.nb
        })


        let resourceToSell = merchInHand.splice(0, 1)[0];

        while ((resourceToSell.type == "diamond" ||
                resourceToSell.type == "gold" ||
                resourceToSell.type == "silver") &&
            resourceToSell.nb < 2) {

            resourceToSell = merchInHand.splice(0, 1)[0]
        }



        return {
            soldCards: this.hand.filter(card => {
                if (card.value == resourceToSell.type) {
                    return card
                }
            })
        }
    }

    pickRandom(market) {
        let chosenCard = Math.floor(Math.random() * market.length);
        if (market[chosenCard].type == "camel") {
            return {
                tradedCards: [],
                takenCards: market.filter(card => {
                    if (card.type == "camel") {
                        return card
                    }
                })
            }
        } else {
            return {
                tradedCards: [],
                takenCards: [
                    market[chosenCard]
                ]
            }
        }
    }

    getIllegalToSell() {
        if (!this.hand.filter(card => {
                if (card.value == "cloth" || card.value == "spice" || card.value == "leather") {
                    return card
                }
            }).length) {
            let diamond = this.hand.filter(card => {
                if (card.value == "diamond") {
                    return card
                }
            })

            let gold = this.hand.filter(card => {
                if (card.value == "gold") {
                    return card
                }
            })


            let silver = this.hand.filter(card => {
                if (card.value == "silver") {
                    return card
                }
            })

            if (silver.length < 2 && gold.length < 2 && diamond.length < 2) {
                return true;
            }

        }
        return false
    }
}


module.exports = IAPlayer;