<template>
    <div class="wrapper">
        <div class="playerWrapper">
            <h2>{{opponent.name}}</h2>
            <div class="cardsWrapper">
                <ul v-if="opponent.hand.length">
                    <li v-for="card in opponent.hand" :key="card.id">
                        <div>{{ card.value }}</div>
                        <button>Vendre la carte</button>
                        <button v-on:click="tradeGive.push(card)">Echanger la carte</button>
                    </li>
                </ul>   
                <ul v-if="opponent.enclos.length">
                    <li v-for="card in opponent.enclos" :key="card.id">
                        <div>{{ card.type }}</div>
                        <button v-on:click="tradeGive.push(card)">Echanger la carte</button>
                    </li>
                </ul>   
            </div>
        </div>

        <div class="market">
            <h3>Marché</h3>
            <div v-for="card in market" :key="card.id">
                <p>{{card.type}}</p> <p v-if="card.type != 'camel'">{{card.value}}</p>
                <button v-on:click="tradeWant.push(card)">Echanger la carte</button>
            </div>
            <button v-on:click="trade()">Valider l'échange</button>
        </div>
        <div class="playerWrapper">
            <h2>{{ player.name }}</h2>
            <div class="cardsWrapper">
                <ul v-if="player.hand.length">
                    <li v-for="card in player.hand" :key="card.id">
                        <div>{{ card.value }}</div>
                        <button>Vendre la carte</button>
                        <button v-on:click="tradeGive.push(card)">Echanger la carte</button>
                    </li>
                </ul>   
                <ul v-if="player.enclos.length">
                    <li v-for="card in player.enclos" :key="card.id">
                        <div>{{ card.type }}</div>
                        <button v-on:click="tradeGive.push(card)">Echanger la carte</button>
                    </li>
                </ul>   
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TempClient',
        props: ['socket'],
        data () {
            return {
                playerNo: 99,
                opponentNo: 999,
                player: {
                    name: "",
                    hand: [],
                    enclos: [],
                    tokens: []
                },
                opponent: {
                    name: "",
                    hand: [],
                    enclos: [],
                    tokens: []
                },
                market: [],
                tradeGive: [],
                tradeWant: []
            }
        },
        mounted () {
            this.socket.on('game-start', data => {
                this.playerNo = data.playerNo;
                if(!this.playerNo){
                    this.opponentNo = 1;
                    this.opponent.name = data.playerNames[1]
                    this.player.name = data.playerNames[0]
                }
                else {
                    this.opponentNo = 0;
                    this.opponent.name = data.playerNames[0]
                    this.player.name = data.playerNames[1]
                }
            })

            this.socket.on('game-update', data => {
                this.market = data.market

                this.player.hand = data.players[this.playerNo].hand
                this.player.enclos = data.players[this.playerNo].enclos
                this.player.tokens = data.players[this.playerNo].tokens

                this.opponent.hand = data.players[this.opponentNo].hand
                this.opponent.enclos = data.players[this.opponentNo].enclos
                this.opponent.tokens = data.players[this.opponentNo].tokens
            })
        },
        methods : {
            trade() {
                 this.socket.emit('trade', {
                    tradedCards: this.tradeGive,
                    takenCards: this.tradeWant
                })
            }
        }
    }
</script>

<style>
.wrapper{
    padding: 5vh;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.cardsWrapper {
    width: 75vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.market {
    display: flex;
    flex-direction: row;
    gap: 1.5vw;
}
</style>