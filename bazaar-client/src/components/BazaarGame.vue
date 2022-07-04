<template>
  <div v-if="lobby == false" class="bazaarGame">
    <!-- Leave -->
    <div class="sortir" @click="this.emitter.emit('setLobby', true)">
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

    <!-- Hand player one -->
    <div @mouseenter="handOpen = true" @mouseleave="handOpen = false" v-bind:class="{ open: handOpen }" class="player-cards player-cards-one">
      <!-- Hand -->
      <div class="hand-container-one">
        <div class="hand">
          <div v-for="card in player.hand" :key="card.id">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'leather'" class="little-card card-player" src="@/assets/Leather_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'spice'" class="little-card card-player" src="@/assets/Spices_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'cloth'" class="little-card card-player" src="@/assets/Carpet_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'silver'" class="little-card card-player" src="@/assets/Silver_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'gold'" class="little-card card-player" src="@/assets/Gold_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'diamond'" class="little-card card-player" src="@/assets/Ruby_card.png" alt="">
          </div>
        </div>
      </div>
      
      <!-- Enclosure -->
      <div class="enclosure enclosure-one">
        <img @click="active" :id="enclosure.id" :data-value="enclosure.value" v-for="enclosure in player.enclosure" :key="enclosure.index" class="little-card camel-card camel-card-one" src="@/assets/Camel_card.png" alt="">
      </div>
    </div>

    <!------------------------>

    <!-- Hand player two -->
    <div class="player-cards player-cards-two">
      <!-- Enclosure -->
      <div>
        <img v-if="opponent.enclosure.length != 0" class="little-card" src="@/assets/Camel_card.png" alt="">
      </div>

      <!-- Hand -->
      <div class="hand-container-two">
        <div class="hand">
          <img v-for="index in opponent.hand" :key="index" class="little-card card-player" src="@/assets/Back_card.png" alt="">
        </div>
      </div>
    </div>

    <!------------------------>

    <div class="game">
      <!-- Board -->
      <div class="board">
        <!-- Tokens -->
        <div class="tokens">
          <!-- Ruby -->
          <div class="token-list">
            <img v-for="index in 3" :key="index" class="token" src="@/assets/Ruby_coin-5.png" alt="">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Ruby_coin-7.png" alt="">
          </div>
          <!-- Gold -->
          <div class="token-list">
            <img v-for="index in 3" :key="index" class="token" src="@/assets/Gold_coin-5.png" alt="">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Gold_coin-6.png" alt="">
          </div>
          <!-- Silver -->
          <div class="token-list">
            <img v-for="index in 5" :key="index" class="token" src="@/assets/Silver_coin.png" alt="">
          </div>
          <!-- Carpet -->
          <div class="token-list">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Carpet_coin-1.png" alt="">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Carpet_coin-2.png" alt="">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Carpet_coin-3.png" alt="">
            <img class="token" src="@/assets/Carpet_coin-5.png" alt="">
          </div>
          <!-- Spice -->
          <div class="token-list">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Spice_coin-1.png" alt="">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Spice_coin-2.png" alt="">
            <img v-for="index in 2" :key="index" class="token" src="@/assets/Spice_coin-3.png" alt="">
            <img class="token" src="@/assets/Spice_coin-5.png" alt="">
          </div>
          <!-- Leather -->
          <div class="token-list">
            <img v-for="index in 6" :key="index" class="token" src="@/assets/Leather_coin-1.png" alt="">
            <img class="token" src="@/assets/Leather_coin-2.png" alt="">
            <img class="token" src="@/assets/Leather_coin-3.png" alt="">
            <img class="token" src="@/assets/Leather_coin-4.png" alt="">
          </div>
        </div>

        <!-- Market -->
        <div class="market">
          <div v-for="card in market" :key="card.id">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.type == 'camel'" class="card empty-cards" src="@/assets/Camel_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'leather'" class="card empty-cards" src="@/assets/Leather_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'spice'" class="card empty-cards" src="@/assets/Spices_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'cloth'" class="card empty-cards" src="@/assets/Carpet_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'silver'" class="card empty-cards" src="@/assets/Silver_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'gold'" class="card empty-cards" src="@/assets/Gold_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'diamond'" class="card empty-cards" src="@/assets/Ruby_card.png" alt="">
          </div>

          <!-- Buttons -->
          <div class="buttons" v-if="buttons">
            <button id="trade" :class="{ 'disable': !tradeButton }" class="lien">Échanger</button>
            <button id="take" :class="{ 'disable': !takeButton }" class="lien">Prendre</button>
            <button id="sell" :class="{ 'disable': !sellButton }" class="lien">Vendre</button>
          </div>
        </div>

        <!-- Interface -->
        <div class="interface">
          <!-- Name player 1 -->
          <div class="player player-one">
            <p>{{ opponent.name }}</p>
          </div>

          <!-- Game cards -->
          <div class="game-cards">
            <!-- Deck -->
            <div class="card empty-cards">
              <img src="@/assets/Deck_full.png" alt="">
            </div>

            <!-- Graveyard -->
            <div class="card empty-cards"></div>
          </div>

          <!-- Name player 2 -->
          <div class="player player-two">
            <p>{{ player.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BazaarGame',
  props : ['socket', 'lobby', 'room'],
  data () {
    return {
      wait: true,
      copy: false,

      // Boutons
      buttons: false,
      tradeButton: false,
      takeButton: false,
      sellButton: false,

      // hand
      handOpen: false,

      // json send
      playerNo: 0,
      opponentNo: 1,
      player: {
          name: "You",
          hand: [],
          enclosure: [],
          tokens: []
      },
      opponent: {
          name: "Opponent",
          hand: [],
          enclosure: [],
          tokens: []
      },
      market: [],

      // trade
      tradeGive: [],
      tradeWant: []
    }
  },
  methods: {
    requeteTest() {
        this.socket.emit('trade', {
          // Carte dans la main
          tradeGive: [],

          // Carte dans le marché
          tradeWant: []
        })
    },

    active(ev) {
      // Ajout du style pour les cartes sélectionnées
      ev.target.classList.toggle("active");

      // Add card to trade
      var card = {};
      var marketCards = document.querySelectorAll(".market img");
      if(ev.target.classList.contains('card-player') || ev.target.classList.contains('camel-card')){
        // Carte dans la main
        card = {
          "current_position": "hand",
          "new_position": "",
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
          "current_position": "market",
          "new_position": "",
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

            this.market.forEach(el => {
              el.type == "camel" ? this.tradeWant.push(card) : "";
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

      console.log("Carte dans le marché");
      console.log(this.tradeWant);

      console.log("Carte dans la main");
      console.log(this.tradeGive);

      this.activeButtons();
    },

    activeButtons() {
      // Affichage des boutons
      this.tradeWant.length != 0 || this.tradeGive.length != 0 ? this.buttons = true : this.buttons = false;

      // Activation du bouton take
      if(this.tradeWant.length == 1 && this.tradeGive.length == 0 && this.player.hand.length < 7 || this.tradeWant.every(card => card.value == "")){
        this.tradeButton = false;
        this.takeButton = true;
        this.sellButton = false;
      }
      // Activation du bouton sell
      else if(this.tradeWant.length == 0 && this.tradeGive.length >= 1){
        // Check if all card have same values
        if (this.tradeGive.every(card => card.value == this.tradeGive[0].value && card.value != "")){
          this.tradeButton = false;
          this.takeButton = false;
          this.sellButton = true;
        }
        else {
          this.tradeButton = false;
          this.takeButton = false;
          this.sellButton = false;
        }
      }
      // Activation du bouton échanger
      else if(this.tradeWant.length == this.tradeGive.length){
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

    sell: () => {
      this.socket.emit('sell');
    },

    buy: () => {
      this.socket.emit('buy')
    },

    copyText() {
      var copyText = document.getElementById("room");
      navigator.clipboard.writeText(copyText.innerHTML);

      this.copy = true
    }
  },
  mounted () {
    this.socket.on('game-start', data => {
        this.playerNo = data.playerNo;
        if(!this.playerNo){
            this.opponentNo = 1;
            data.playerNames[1] ? this.opponent.name = data.playerNames[1] : '';
            data.playerNames[0] ? this.player.name = data.playerNames[0] : '';
        }
        else {
            this.opponentNo = 0;
            data.playerNames[0] ? this.opponent.name = data.playerNames[0] : '';
            data.playerNames[1] ? this.player.name = data.playerNames[1] : '';
        }

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
    })
  }

}
</script>

<style scoped>
.bazaarGame {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.bazaarGame .lien {
  font-size: 0.875rem;
  padding: .5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  width: 9rem;
}

.bazaarGame .lien:hover {
  border-color: rgb(var(--secondary-color));
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
  height: 39px;
  width: 39px;
  padding: .6rem;
  border-radius: 5px;
  border: none;
  background-color: #ddd;
  transition: all .3s ease-in-out;
}

.room-copy.active {
  background-color: rgb(var(--secondary-color));
}

.room-copy:hover {
  cursor: pointer;
  background-color: rgb(var(--secondary-color));
}

/* Buttons */
.buttons {
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.buttons .lien.disable {
  background: #ddd !important;
  border-color: #ddd !important;
  color: black !important;
  opacity: 0.75 !important;
}

.buttons .lien.disable:hover {
  cursor: not-allowed;
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
  max-width: 20vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.token-list {
  display: flex;
  justify-content: flex-end;
  margin-right: 19%;
}

.token {
  width: 5vw;
  max-width: 3.5rem;
  height: auto;
  margin-right: -20%;
}

/* Players */
.player{
  background-color: var(--main-color);
  padding: .75rem 2rem;
  text-align: center;
  font-size: .825rem;
  border-radius: 15px 0 0 15px;
  display: inline-block;
  position: absolute;
  right: 0;
}

.player p{
  margin: 0;
}

.player-one {
  top: 0;
}

.player-two {
  bottom: 0;
}

/* -- Player cards */
.player-cards {
  display: flex;
  gap: 4rem;
  position: absolute;
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

.camel-card {
  position: absolute;
  width: 100%;
  height: auto;
}

/* -- -- Merchandise cards */
.card-player {
  margin-right: -6vw;
}

/* Game */
.game {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
}

/* Board */
.board {
  width: 100%;
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* -- Market */
.market {
  position: relative;
  max-width: 65vw;
  grid-column: 1 / span 5;
  display: flex;
  gap: 1rem;
}

/* -- Game cards */
.interface {
  max-width: 15vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 0;
}

.game-cards {
  margin-right: 3rem;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: .5rem;
}

/* ----------------------- */
/* ------ Animation ------ */
/* ----------------------- */

/* Hand */
.player-cards-one:hover .little-card{
  width: 14vw;
  max-width: 11rem;
}

.player-cards-one:hover .enclosure{
  margin-top: 16vw;
}

.player-cards-one:hover .camel-card{
  margin-top: -16vw;
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

@media (min-width: 1280px) { 
  .player-cards-one:hover .little-card{
    width: 11vw;
    max-width: 16rem;
  }

  .player-cards-one:hover .enclosure{
    margin-top: 12vw;
  }

  .player-cards-one:hover .camel-card{
    margin-top: -12vw;
    position: relative;
  }
}
</style>