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

    <!-- Hand player one -->
    <div @mouseenter="handOpen = true" @mouseleave="handOpen = false" v-bind:class="{ open: handOpen }" class="player-cards player-cards-one">
      <!-- Hand -->
      <div class="hand-container-one">
        <div class="hand">
          <div v-for="card in player.hand" :key="card.id">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'leather'" class="little-card card-player card-selected" src="@/assets/Leather_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'spice'" class="little-card card-player card-selected" src="@/assets/Spices_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'cloth'" class="little-card card-player card-selected" src="@/assets/Carpet_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'silver'" class="little-card card-player card-selected" src="@/assets/Silver_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'gold'" class="little-card card-player card-selected" src="@/assets/Gold_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'diamond'" class="little-card card-player card-selected" src="@/assets/Ruby_card.png" alt="">
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
            <template v-for="diamond in this.tokens.diamond">
              <img v-if="diamond.value == 5" :key="diamond.id" class="token" src="@/assets/Ruby_coin-5.png" alt="">
              <img v-if="diamond.value == 7" :key="diamond.id" class="token" src="@/assets/Ruby_coin-7.png" alt="">
            </template>
          </div>
          <!-- Gold -->
          <div class="token-list">
            <template v-for="gold in this.tokens.gold">
              <img v-if="gold.value == 5" :key="gold.id" class="token" src="@/assets/Gold_coin-5.png" alt="">
              <img v-if="gold.value == 6" :key="gold.id" class="token" src="@/assets/Gold_coin-6.png" alt="">
            </template>
          </div>
          <!-- Silver -->
          <div class="token-list">
            <template v-for="silver in this.tokens.silver">
              <img v-if="silver.value == 5" :key="silver.id" class="token" src="@/assets/Silver_coin.png" alt="">
            </template>
          </div>
          <!-- Carpet -->
          <div class="token-list">
            <template v-for="cloth in this.tokens.cloth">
              <img v-if="cloth.value == 1" :key="cloth.id" class="token" src="@/assets/Carpet_coin-1.png" alt="">
              <img v-if="cloth.value == 2" :key="cloth.id" class="token" src="@/assets/Carpet_coin-2.png" alt="">
              <img v-if="cloth.value == 3" :key="cloth.id" class="token" src="@/assets/Carpet_coin-3.png" alt="">
              <img v-if="cloth.value == 5" :key="cloth.id" class="token" src="@/assets/Carpet_coin-5.png" alt="">
            </template>
          </div>
          <!-- Spice -->
          <div class="token-list">
            <template v-for="spice in this.tokens.spice">
              <img v-if="spice.value == 1" :key="spice.id" class="token" src="@/assets/Spice_coin-1.png" alt="">
              <img v-if="spice.value == 2" :key="spice.id" class="token" src="@/assets/Spice_coin-2.png" alt="">
              <img v-if="spice.value == 3" :key="spice.id" class="token" src="@/assets/Spice_coin-3.png" alt="">
              <img v-if="spice.value == 5" :key="spice.id" class="token" src="@/assets/Spice_coin-5.png" alt="">
            </template>
          </div>
          <!-- Leather -->
          <div class="token-list">
            <template v-for="leather in this.tokens.leather">
              <img v-if="leather.value == 1" :key="leather.id" class="token" src="@/assets/Leather_coin-1.png" alt="">
              <img v-if="leather.value == 2" :key="leather.id" class="token" src="@/assets/Leather_coin-2.png" alt="">
              <img v-if="leather.value == 3" :key="leather.id" class="token" src="@/assets/Leather_coin-3.png" alt="">
              <img v-if="leather.value == 4" :key="leather.id" class="token" src="@/assets/Leather_coin-4.png" alt="">
            </template>
          </div>
        </div>

        <!-- Market -->
        <div class="market">
          <div v-for="card in market" :key="card">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.type == 'camel'" class="card empty-cards card-selected" src="@/assets/Camel_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'leather'" class="card empty-cards card-selected" src="@/assets/Leather_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'spice'" class="card empty-cards card-selected" src="@/assets/Spices_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'cloth'" class="card empty-cards card-selected" src="@/assets/Carpet_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'silver'" class="card empty-cards card-selected" src="@/assets/Silver_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'gold'" class="card empty-cards card-selected" src="@/assets/Gold_card.png" alt="">
            <img @click="active" :id="card.id" :data-value="card.value" v-if="card.value == 'diamond'" class="card empty-cards card-selected" src="@/assets/Ruby_card.png" alt="">
          </div>

          <!-- Buttons -->
          <transition name="fade">
            <div class="buttons" v-if="buttons">
              <button id="trade" :class="{ 'disable': !tradeButton }" class="lien" @click="tradeButton ? trade() : ''">Échanger</button>
              <button id="take" :class="{ 'disable': !takeButton }" class="lien" @click="takeButton ? trade(): ''">Prendre</button>
              <button id="sell" :class="{ 'disable': !sellButton }" class="lien" @click="sellButton ? sell() : ''">Vendre</button>
            </div>
          </transition>
        </div>

        <!-- Interface -->
        <div class="interface">
          <!-- Name player 1 -->
          <div v-if="opponent.name" class="player player-one" :class="{ 'active': this.currentPlayer == this.opponentNo }">
            <div class="player-container">
              <p>{{ opponent.name }}</p>
              <div v-if="this.currentPlayer == this.opponentNo" class="player-current">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>
              </div>
            </div>
          </div>

          <!-- Game cards -->
          <div class="game-cards">
            <!-- Deck -->
            <div class="card empty-cards">
              <img v-if="deck == 'full'" src="@/assets/Deck_full.png" alt="">
              <img v-if="deck == 'half'" src="@/assets/Deck_half.png" alt="">
            </div>

            <!-- Graveyard -->
            <div class="graveyard card empty-cards">
              <img class="card card-hidden" src="@/assets/Back_card.png" alt="">
              <div v-for="card in graveyard" :key="card">
                <img :id="card.id" v-if="card.value == 'leather'" class="card card-graveyard" src="@/assets/Leather_card.png" alt="">
                <img :id="card.id" v-if="card.value == 'spice'" class="card card-graveyard" src="@/assets/Spices_card.png" alt="">
                <img :id="card.id" v-if="card.value == 'cloth'" class="card card-graveyard" src="@/assets/Carpet_card.png" alt="">
                <img :id="card.id" v-if="card.value == 'silver'" class="card card-graveyard" src="@/assets/Silver_card.png" alt="">
                <img :id="card.id" v-if="card.value == 'gold'" class="card card-graveyard" src="@/assets/Gold_card.png" alt="">
                <img :id="card.id" v-if="card.value == 'diamond'" class="card card-graveyard" src="@/assets/Ruby_card.png" alt="">
              </div>
            </div>
          </div>

          <!-- Name player 2 -->
          <div v-if="player.name" class="player player-two" :class="{ 'active': this.currentPlayer == this.playerNo }">
            <div class="player-container">
              <p>{{ player.name }}</p>
              <div v-if="this.currentPlayer == this.playerNo" class="player-current">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>
              </div>
            </div>
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
          name: "",
          hand: [],
          enclosure: [],
          tokens: [],
          totalPoints: 0,
          camelToken: false
      },
      opponent: {
          name: "",
          hand: [],
          enclosure: [],
          tokens: [],
          totalPoints: 0,
          camelToken: false
      },
      tokens: [],
      deck: [],
      graveyard: [],
      market: [],
      currentPlayer: 0,
      winner: "",

      // trade
      tradeGive: [],
      tradeWant: []
    }
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
  
        console.log(this.tradeGive);
        console.log(this.tradeWant);
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
        this.tradeWant.every(card => card.value != "")
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
      // console.log(this.tradeWant.some(card => this.tradeGive.includes(card)));
    },

    quit() {
      this.emitter.emit('setLobby', true);
      this.socket.emit('leave', {room: this.room});
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

        this.deck = data.deck.length == 0 ? "empty" : data.deck.length >= 27 ? "full" : "half"
        this.graveyard = data.graveyard

        this.currentPlayer = data.currentPlayer
        // console.log("Player");
        // console.log(this.player);
        // console.log("Opponent");
        // console.log(this.opponent);
        // console.log("Market");
        // console.log(this.market);
        // console.log("Graveyard");
        // console.log(this.graveyard);
    })

    this.socket.on('game-end', data => {
      this.winner = data.winner
      this.player.totalPoints = data.players[this.playerNo].totalPoints
      this.player.camelToken = data.players[this.playerNo].camelToken
      this.opponent.totalPoints = data.players[this.opponentNo].totalPoints
      this.opponent.camelToken = data.players[this.opponentNo].camelToken
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
  max-width: 20vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.player.active{
  background-color: rgb(var(--secondary-color));
}

.player-container {
  position: relative;
}

.player p{
  margin: 0;
}

.player-one {
  top: 0;
}

.player-current{
  position: absolute;
  top: -1.5rem;
  left: -2.5rem;
  width: 24px;
  height: 24px;
  color: var(--main-color);
  background-color: #fff;
  border-radius: 100%;
  padding: .2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;
  flex-direction: column;
  grid-template-rows: repeat(2, 1fr);
  gap: .5rem;
}

.graveyard {
  position: relative;
}

/* ----------------------- */
/* ------ Animation ------ */
/* ----------------------- */

/* Hand */
.player-cards-one:hover .little-card{
  width: 14vw;
  max-width: 8rem;
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
    max-width: 14rem;
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