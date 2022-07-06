<template>
  <div v-if="lobby == false" class="bazaarGame">
    <!-- Leave -->
    <div class="sortir" @click="quit">
      <svg class="bouton_maison" width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.2004 14L31.9498 18.375L28.2004 14ZM28.2004 22.75L31.9498 18.375L28.2004 22.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.7 18.375H18M7.19995 6.125H23.4M7.19995 30.625H23.4M23.4 6.125V13.125M23.4 23.625V30.625M7.19995 6.125V30.625" stroke="white" stroke-width="2" stroke-linecap="round"></path></svg>
    </div>

    <!-- Loaded -->
    <div class="loaded" v-if="wait">
      <div class="loaded-container">
        <div>
          <h2>Nom de la partie</h2>
          <div class="room">
            <p id="room">{{ room }}</p>
            <button class="room-copy" :class="{ 'active': copy }" @click="copyText">
              <svg v-if="copy" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12l6 6L20 6"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                <g fill="currentColor">
                  <path d="M8 2a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2H8Z"/>
                  <path d="M3 5a2 2 0 0 1 2-2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3a2 2 0 0 1 2 2v6h-4.586l1.293-1.293a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414-1.414L10.414 13H15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm12 6h2a1 1 0 1 1 0 2h-2v-2Z"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <p>En attente de l'adversaire ...</p>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
      </div>
    </div>

    <WinnerTable :socket="this.socket" :winnerOverlay="this.winnerOverlay" :player="this.player" :opponent="this.opponent" :winner="this.winner" />

    <HandPlayer :wait="this.wait" :player="this.player" />
    <HandOpponent :opponent="this.opponent" />

    <BoardGame  :socket="this.socket" 
                :playerNo="this.playerNo"
                :opponentNo="this.opponentNo"
                :buttons="this.buttons" 
                :tradeButton="this.tradeButton" 
                :takeButton="this.takeButton" 
                :sellButton="this.sellButton" 
                :wait="this.wait" 
                :player="this.player"
                :opponent="this.opponent"
                :currentPlayer="this.currentPlayer" 
                :tokens="this.tokens"
                :market="this.market"
                :deck="this.deck"
                :graveyard="this.graveyard" />
  </div>
</template>

<script>
import WinnerTable from "./game/WinnerTable.vue"
import HandPlayer from "./game/HandPlayer.vue"
import HandOpponent from "./game/HandOpponent.vue"
import BoardGame from "./game/BoardGame.vue"

export default {
  name: 'BazaarGame',
  props : ['socket', 'lobby', 'room'],
  data () {
    return {
      wait: true,
      winnerOverlay: false,
      copy: false,

      // Boutons
      buttons: false,
      tradeButton: false,
      takeButton: false,
      sellButton: false,

      // json send
      playerNo: 0,
      opponentNo: 1,
      ia: false,
      player: {
          name: "",
          hand: [],
          enclosure: [],
          tokens: [],
          merchandisesPoints: 0,
          bonusPoints: 0,
          totalPoints: 0
      },
      opponent: {
          name: "",
          hand: [],
          enclosure: [],
          tokens: [],
          merchandisesPoints: 0,
          bonusPoints: 0,
          totalPoints: 0
      },
      tokens: [],
      deck: 0,
      graveyard: [],
      market: [],
      currentPlayer: 0,
      winner: "",

      // trade
      tradeGive: [],
      tradeWant: []
    }
  },
  components: {
    WinnerTable,
    HandPlayer,
    HandOpponent,
    BoardGame
  },
  methods: {
    active(ev) {
      if(this.currentPlayer == this.playerNo){
        // Ajout du style pour les cartes sélectionnées
        ev.target.classList.toggle("active");
  
        // Add card to trade
        var card = {};
        var marketCards = document.querySelectorAll(".market img");
        if(ev.target.classList.contains('card-player') || ev.target.classList.contains('camel-card')){
          // Carte dans la main
          card = {
            "id": parseInt(ev.target.id),
            "type": ev.target.dataset.value ? "merchandise" : "camel",
            "value": ev.target.dataset.value
          }
  
          if(ev.target.classList.contains('active')){
            this.tradeGive.push(card);
          }
          else{
            this.tradeGive.splice(this.tradeGive.findIndex(card => card.value === ev.target.dataset.value), 1);
          }
        }
        else {
          // Carte dans le marché
          card = {
            "id": parseInt(ev.target.id),
            "type": ev.target.dataset.value ? "merchandise" : "camel",
            "value": ev.target.dataset.value
          }
  
          // -- Sélection de tous les chamaux
          if(ev.target.dataset.value == ""){
            if(ev.target.classList.contains('active')){
              // Suppresion des marchandises
              while(this.tradeWant.filter( card => card.value !== "" ).length != 0){
                 this.tradeWant.splice(this.tradeWant.findIndex(card => card.value === ev.target.dataset.value), 1);
              }
  
              marketCards.forEach(el => {
                el.dataset.value == "" ? this.tradeWant.push({
                  "id": parseInt(el.id),
                  "type": el.dataset.value ? "merchandise" : "camel",
                  "value": el.dataset.value
                }) : "";
              });
  
              // Ajout du style pour tous les chamaux
              marketCards.forEach(card => {
                card.dataset.value == "" ? card.classList.add("active") : card.classList.remove("active");
              });
            }
            else {
              // Suppresion des chamaux
              while(this.tradeWant.filter( card => card.value === "" ).length != 0){
                 this.tradeWant.splice(this.tradeWant.findIndex(card => card.value === ev.target.dataset.value), 1);
              }
  
              // Ajout du style pour tous les chamaux
              marketCards.forEach(card => {
                card.dataset.value == "" ? card.classList.remove("active") : "";
              });
            }
          }
  
          // -- Sélection de toutes les marchandises
          else {
            // Suppresion des chamaux
            while(this.tradeWant.filter( card => card.value === "" ).length != 0){
              this.tradeWant.splice(this.tradeWant.findIndex(card => card.value === ev.target.dataset.value), 1);
            }
  
            marketCards.forEach(card => {
              card.dataset.value == "" ? card.classList.remove("active") : "";
            });
  
            if(ev.target.classList.contains('active')){
              this.tradeWant.push(card);
            }
            else{
              this.tradeWant.splice(this.tradeWant.findIndex(card => card.value === ev.target.dataset.value), 1);
            }
          }
        }

        this.activeButtons();
      }
    },

    activeButtons() {
      // Affichage des boutons
      this.tradeWant.length != 0 || this.tradeGive.length != 0 ? this.buttons = true : this.buttons = false;

      // Activation du bouton take
      if(
        this.tradeWant.length == 1 && 
        this.tradeGive.length == 0 && 
        this.player.hand.length < 7 || 
        this.tradeWant.every(card => card.value == "") && 
        this.tradeGive.length == 0 && 
        this.tradeWant.length >= 1
        ){
        this.tradeButton = false;
        this.takeButton = true;
        this.sellButton = false;
      }
      // Activation du bouton sell
      else if(
        // leather, cloth, spice
        this.tradeWant.length == 0 && 
        this.tradeGive.length >= 1 && 
        this.tradeGive.every(card => card.value == this.tradeGive[0].value && (card.value == "cloth" || card.value == "leather" || card.value == "spice")) ||
        // ruby, gold, silver
        this.tradeWant.length == 0 && 
        this.tradeGive.length >= 2 && 
        this.tradeGive.every(card => card.value == this.tradeGive[0].value && (card.value == "diamond" || card.value == "gold" || card.value == "silver"))
        ){
        this.tradeButton = false;
        this.takeButton = false;
        this.sellButton = true;
      }
      // Activation du bouton échanger
      else if(
        this.tradeWant.length == this.tradeGive.length && 
        this.tradeWant.length >= 2 && 
        this.tradeGive.length >= 2 &&
        this.tradeWant.every(card => card.value != "") &&
        this.tradeGive.filter(card => card.value == "").length + this.player.hand.length <= 7 &&
        this.differentValue()
        ){
        this.tradeButton = true;
        this.takeButton = false;
        this.sellButton = false;
      }
      // Désactivation des boutons
      else {
        this.tradeButton = false;
        this.takeButton = false;
        this.sellButton = false;
      }
    },

    differentValue() {
      let result = this.tradeWant.filter(cardWant => this.tradeGive.some(cardGive => cardWant.value === cardGive.value));
      return result.length != 0 ? false : true;
    },

    quit() {
      this.socket.emit('leave', {room: this.room});
      this.emitter.emit('setLobby', true);
      this.resetValue();
    },

    resetValue() {
      this.wait = true
      this.winnerOverlay = false
      this.copy = false
            
      // Boutons
      this.buttons = false
      this.tradeButton = false
      this.takeButton = false
      this.sellButton = false

      this.player.name = ""
      this.player.hand = []
      this.player.enclosure = []
      this.player.tokens = []
      this.player.totalPoints = 0

      this.opponent.name = ""
      this.opponent.hand = []
      this.opponent.enclosure = []
      this.opponent.tokens = []
      this.opponent.totalPoints = 0

      this.tokens = []
      this.deck = 0
      this.graveyard = []
      this.market = []
      this.currentPlayer = 0
      this.winner = ""

      // trade
      this.tradeGive = []
      this.tradeWant = []   
    },

    sell() {
      this.socket.emit('sell', {soldCards: this.tradeGive});
      this.resetPlayer();
    },

    trade() {
      this.socket.emit('trade', {takenCards: this.tradeWant, tradedCards: this.tradeGive})
      this.resetPlayer();
    },

    resetPlayer() {
      this.tradeWant = []
      this.tradeGive = []
      this.buttons = false
      document.querySelectorAll(".card-selected").forEach(card => {
        card.classList.remove("active");
      });
    },

    copyText() {
      var copyText = document.getElementById("room");
      navigator.clipboard.writeText(copyText.innerHTML);

      this.copy = true;

      this.emitter.emit('addAlert', {
          type: "check",
          message: "Le nom de la salle a bien été copier",
      });
    }
  },
  mounted () {
    this.socket.on('game-start', data => {
        // Réinitialiation pour le restart 
        this.winnerOverlay = false;
        this.copy = false
        this.buttons = false
        this.tradeButton = false
        this.takeButton = false
        this.sellButton = false

        // Setup
        this.playerNo = data.playerNo;
        if(!this.playerNo){
            this.opponentNo = 1;
            data.playerNames[1] ? this.opponent.name = data.playerNames[1] : 'Opponent';
            data.playerNames[0] ? this.player.name = data.playerNames[0] : 'You';
        }
        else {
            this.opponentNo = 0;
            data.playerNames[0] ? this.opponent.name = data.playerNames[0] : 'Opponent';
            data.playerNames[1] ? this.player.name = data.playerNames[1] : 'You';
        }

        this.copy = false,
        this.wait = false;
    })

    this.socket.on('game-update', data => {
        this.market = data.market

        this.player.hand = data.players[this.playerNo].hand
        this.player.enclosure = data.players[this.playerNo].enclosure
        this.player.tokens = data.players[this.playerNo].tokens

        this.opponent.hand = data.players[this.opponentNo].hand
        this.opponent.enclosure = data.players[this.opponentNo].enclosure
        this.opponent.tokens = data.players[this.opponentNo].tokens
        this.tokens = data.tokens

        this.deck = data.deck.length
        this.graveyard = data.graveyard

        this.ia && data.currentPlayer == 0 ? setTimeout(this.currentPlayer = data.currentPlayer, 3000) : this.currentPlayer = data.currentPlayer

        // Calcul du nombre de point du joueur
        this.player.merchandisesPoints = 0
        this.player.bonusPoints = 0
        this.player.tokens.forEach(token => {
          if(token.type != "bonus_3" && token.type != "bonus_4" && token.type != "bonus_5"){
            this.player.merchandisesPoints += token.value;
          }
          else{
            this.player.bonusPoints += token.value;
          }
        })

        // Calcul du nombre de point de l'adversaire
        this.opponent.merchandisesPoints = 0
        this.opponent.bonusPoints = 0
        this.opponent.tokens.forEach(token => {
          if(token.type != "bonus_3" && token.type != "bonus_4" && token.type != "bonus_5"){
            this.opponent.merchandisesPoints += token.value;
          }
          else{
            this.opponent.bonusPoints += token.value;
          }
        })
    })

    this.socket.on('game-end', data => {
      this.resetPlayer()
      this.winnerOverlay = true

      if(data.players[this.playerNo].camelToken){
        this.player.bonusPoints += 5;
      }
      else if(data.players[this.opponentNo].camelToken){
        this.opponent.bonusPoints += 5;
      }
      this.player.totalPoints = data.players[this.playerNo].totalPoints
      this.opponent.totalPoints = data.players[this.opponentNo].totalPoints

      this.winner = data.winner == this.playerNo ? this.player.name : this.opponent.name
    })

    this.socket.on('opponent-left', () => {
      this.copy = false,
      this.wait = true;
      var player = this.player.name ? this.player.name : "Un joueur";
      this.emitter.on('leave', () => {
        this.emitter.emit('addAlert', {
            type: "leave",
            message: player + " a quitté la salle " + this.room,
        });
      });
    })

    this.socket.on('ia-start', () => { 
      this.wait = false 
      this.ia = true
    })
    this.emitter.on('activeCards', (ev) => this.active(ev))
    this.emitter.on('setCards', () => this.activeButtons())
    this.emitter.on('sell', () => this.sell())
    this.emitter.on('trade', () => this.trade())
  }
}
</script>

<style>
.bazaarGame .lien {
  font-size: 0.875rem;
  padding: .5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  width: 9rem;
}

.bazaarGame .lien:hover {
  border-color: rgb(var(--secondary-color));
}

/* Cards */
.card, .little-card {
  width: 10vw;
  max-width: 9.5rem;
  height: auto;
  border-radius: .7vw;
}

.card.active, .little-card.active, .little-card.camel-card.active {
  outline: 2px solid rgb(var(--secondary-color));
  outline-offset: 2px;
}

.open .card.active, .open .little-card.active {
  position: relative;
  bottom: 2rem;
}

.open .little-card.camel-card.active{
  position: relative;
  bottom: 0;
  right: 1rem;
  transform: rotate(-12deg);
}

.card-hidden {
  opacity: 0;
}

.card-graveyard {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.little-card {
  width: 10vw;
  max-width: 100px;
  height: auto;
  transition: width .5s ease-in-out;
}

.empty-cards {
  border-radius: .7vw;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-shadow:0px 0px 0px 1px rgba(var(--secondary-color), 0.4) inset;
  display: flex;
  align-items: flex-end;
}

.empty-cards>img {
  width: 100%;
}

/* Tokens */
.tokens {
  position: relative;
  width: 21vw;
}

.token-list {
  display: flex;
  justify-content: flex-end;
  margin-right: 20%;
}

.token {
  width: 5vw;
  max-width: 3.5rem;
  height: auto;
  margin-right: -20%;
}

.token-hidden {
  opacity: 0;
}

/* -- Player cards */
.player-cards {
  display: flex;
  gap: 4rem;
  position: absolute;
  z-index: 10;
}

.player-cards-one {
  z-index: 10;
  right: 8vw;
  bottom: -2rem;
}

.player-cards-two {
  left: 8vw;
  top: -2rem;
}

/* -- -- Hand */
.hand {
  display: flex;
  margin-right: 6vw;
}

.hand-container-one {
  align-self: flex-end;
}

.hand-container-two {
  align-self: flex-start;
}

/* -- -- Enclosure */
.enclosure {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 10vw;
  max-width: 6.5rem;
}

.enclosure-number, .deck-number {
  position: absolute;
  top: -.5rem;
  left: -.5rem;
  width: 24px;
  height: 24px;
  color: var(--main-color);
  background-color: #fff;
  border-radius: 100%;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.camel-card {
  position: absolute;
  width: 100%;
  height: auto;
}

/* -- -- Merchandise cards */
.card-player {
  margin-right: -6vw;
}

/* ----------------------- */
/* ------ Animation ------ */
/* ----------------------- */

/* Tokens */
.tokens.active .tokens-container {
  max-width: 35rem;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  z-index: 50;
}

.tokens.active .tokens-container:hover {
  cursor: auto;
}

.tokens.active .tokens-hover {
  z-index: 40;
  opacity: 1;
}

.tokens.active .tokens-zoom {
  opacity: 0 !important;
}

.tokens.zoom .tokens-zoom {
  opacity: 1;
}

.tokens.active .token-list{
  margin-right: 5%;
}

.tokens.active .token{
  width: 8vw;
  max-width: 5rem;
  height: auto;
  margin-right: -5%;
}

/* Hand */
.player-cards-one:hover .little-card{
  width: 14vw;
  max-width: 8rem;
}

.player-cards-one:hover .enclosure{
  margin-top: 9rem;
}

.player-cards-one:hover .enclosure-number{
  z-index: -1;
  opacity: 0;
}

.player-cards-one:hover .camel-card{
  margin-top: -9rem;
  position: relative;
}

.player-cards-one .little-card:hover{
  position: relative;
  bottom: 2rem;
  cursor: pointer;
}

.player-cards-one  .little-card.camel-card:hover{
  position: relative;
  bottom: 0;
  right: 1rem;
  transform: rotate(-12deg);
}

.market .card:hover{
  cursor: pointer;
}

@media (min-width: 1024px) { 
  .tokens {
    width: 27vw;
  }

  .token-list {
    margin-right: 10%;
  }

  .token {
    margin-right: -10%;
  }

  .hand {
    margin-right: 4vw;
  }

  .card-player {
    margin-right: -4vw;
  }
}

@media (min-width: 1280px) { 
  .tokens {
    width: 24vw;
  }

  .player-cards-one:hover .little-card{
    width: 11vw;
    max-width: 14rem;
  }

  .player-cards-one:hover .enclosure{
    margin-top: 13vw;
  }

  .player-cards-one:hover .camel-card{
    margin-top: -13vw;
    position: relative;
  }
}

@media (min-width: 1536px) {
  /* Buttons */
  .bazaarGame .lien {
    font-size: 1.5rem;
  }

  /* Interface */
  .player {
    font-size: 1rem;
  }

  .interface {
    padding: 6rem 0;
  }

  .enclosure-number, .deck-number {
    top: -1rem;
    left: -1rem;
    width: 46px;
    height: 46px;
    font-size: 1.5rem;
  }

  .player-current {
    top: -2rem;
    left: -3rem;
    width: 42px;
    height: 42px;
  }

  /* Token */
  .tokens {
    width: 23vw;
  }

  .token {
    max-width: 4.25rem;
  }

  .tokens.active .tokens-container {
    max-width: 56rem;
  }

  .tokens.active .token{
    max-width: 7.5rem;
  }

  /* Hand */
  .card, .little-card {
    width: 13vw;
    max-width: 11.5rem;
  }

  .little-card {
    width: 13vw;
    max-width: 160px;
  }

  .player-cards-one:hover .little-card{
    width: 13vw;
    max-width: 14rem;
  }
}
</style>

<style scoped>
.bazaarGame {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.bazaarGame .button_cross {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  z-index: 40;
  top: 1rem;
  right: 1rem;
}

/* Loader */
.loaded {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 30;
  padding: 1rem;
}

.loaded p{
  margin: 0;
}

.loaded h2{
  margin-top: 0;
}

.loaded-container {
  border-radius: 20px;
  background: var(--main-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-width: 340px;
}

/* -- Room */
.room {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
}

#room {
  background: #fff;
  padding: .5rem 1rem;
  border-radius: 5px;
  color: #000;
}

.room-copy {
  height: 46px;
  width: 46px;
  padding: .7rem;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: var(--main-color-light);
  transition: all .3s ease-in-out;
}

.room-copy.active {
  background-color: rgb(var(--secondary-color));
}

.room-copy:hover {
  cursor: pointer;
  background-color: rgb(var(--secondary-color));
}
</style>