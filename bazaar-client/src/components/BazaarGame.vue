<template>
  <div v-if="lobby == false" class="bazaarGame">
    <!-- Hand player one -->
    <div @mouseenter="handOpen = true" @mouseleave="handOpen = false" v-bind:class="{ open: handOpen }" class="player-cards player-cards-one">
      <!-- Hand -->
      <div class="hand-container-one">
        <div class="hand">
          <img @click="active" v-for="index in 7" :key="index" class="little-card card-player" src="@/assets/Back_card.png" alt="">
        </div>
      </div>
      
      <!-- Enclosure -->
      <div class="enclosure enclosure-one">
        <img @click="active" v-for="enclosure in playerOne.enclosure" :key="enclosure.index" class="little-card camel-card camel-card-one" src="@/assets/Camel_card.png" alt="">
      </div>
    </div>

    <!------------------------>

    <!-- Hand player two -->
    <div class="player-cards player-cards-two">
      <!-- Enclosure -->
      <div>
        <img class="little-card" src="@/assets/Camel_card.png" alt="">
      </div>

      <!-- Hand -->
      <div class="hand-container-two">
        <div class="hand">
          <img v-for="index in 5" :key="index" class="little-card card-player" src="@/assets/Back_card.png" alt="">
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
          <img @click="active" v-for="index in 3" :key="index" class="card" src="@/assets/Camel_card.png" alt="">
          <div v-for="index in 2" :key="index" class="card empty-cards"></div>

          <!-- Buttons -->
          <div class="buttons">
            <button class="lien">Échanger</button>
            <button class="lien">Prendre</button>
            <button class="lien">Vendre</button>
          </div>
        </div>

        <!-- Interface -->
        <div class="interface">
          <!-- Name player 1 -->
          <div class="player player-one">
            <p>{{ playerOne.playerNo }}</p>
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
            <p>{{ playerTwo.playerNo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BazaarGame',
  props : ['socket', 'lobby'],
  data () {
    return {
      handOpen: false,

      playerOne: {
        playerNo: "",
        hand: [],
        enclosure: ['fzv', 'fqer', 'fedrz']
      },
      playerTwo: {
        playerNo: "",
        hand: [],
        enclosure:  ['fzv', 'fqer']
      },
      board: {
        market: [],
        deck: "full",
        graveyard: []
      },
      tradedCards: [],
      takenCards: []
    }
  },
  methods: {
    requeteTest() {
        this.socket.emit('trade', {
          // Carte dans la main
          tradedCards: [],

          // Carte dans le marché
          takenCards: []
        })
    },

    active(ev) {
      ev.target.classList.toggle("active");
    },

    sell:  () => {
      this.socket.emit('sell');
    },

    buy: () => {
      this.socket.emit('buy')
    },

  }, 
  mounted () {
    this.socket.on('game-start', data=> {
      this.playerNo = data.playerNo
    })

    this.socket.on('game-update', data => {
      if(this.playerOne.hand != data[this.playerOne.playerNo].hand) this.playerOne.hand = data[this.playerOne.playerNo].hand;
      if(this.board.market != data[this.playerOne.playerNo].market) this.market = data[this.playerOne.playerNo].market;
      if(this.playerTwo.hand != data[this.playerOne.playerNo].oppHand) this.playerTwo.hand = data[this.playerOne.playerNo].oppHand;
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

/* Buttons */
.buttons {
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

/* Cards */
.card, .little-card {
  width: 10vw;
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
  border-radius: 10px;
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
  padding-left: 1rem;
}

.token-list {
  display: flex;
  justify-content: flex-end;
  margin-right: 17%;
}

.token {
  width: 5vw;
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
  max-width: 100px;
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
  max-width: none;
}

.player-cards-one:hover .enclosure{
  margin-top: 18vw;
}

.player-cards-one:hover .camel-card{
  margin-top: -26vh;
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
    max-width: none;
  }
}
</style>
