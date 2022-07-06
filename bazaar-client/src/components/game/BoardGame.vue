<template>
    <div class="game">
      <!-- Board -->
      <div class="board">
        <!-- Tokens -->
        <div class="tokens" :class="{ 'active': tokensOverlay, 'zoom': tokensZoom }">
          <div class="tokens-hover" @click="tokensOverlay = false"></div>
          <div class="tokens-zoom" v-if="tokensZoom">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <circle cx="7.5" cy="7.5" r="4.75"/>
                <path d="M9.25 7.5h-3.5M7.5 5.75v3.5m3.75 2l3 3"/>
              </g>
            </svg>
          </div>
          <div class="tokens-container" @click="tokensOverlay = true" @mouseenter="tokensZoom = true" @mouseleave="tokensZoom = false">
            <!-- Ruby -->
            <div class="token-list">
              <img v-if="this.tokens.diamond && this.tokens.diamond.length == 0" class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
              <template v-for="diamond in this.tokens.diamond">
                <img v-if="diamond.value == 5" :key="diamond.id" class="token" src="@/assets/Ruby_coin-5.png" alt="">
                <img v-if="diamond.value == 7" :key="diamond.id" class="token" src="@/assets/Ruby_coin-7.png" alt="">
              </template>
            </div>
            <!-- Gold -->
            <div class="token-list">
              <img v-if="this.tokens.gold && this.tokens.gold.length == 0" class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
              <template v-for="gold in this.tokens.gold">
                <img v-if="gold.value == 5" :key="gold.id" class="token" src="@/assets/Gold_coin-5.png" alt="">
                <img v-if="gold.value == 6" :key="gold.id" class="token" src="@/assets/Gold_coin-6.png" alt="">
              </template>
            </div>
            <!-- Silver -->
            <div class="token-list">
              <img v-if="this.tokens.silver && this.tokens.silver.length == 0" class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
              <template v-for="silver in this.tokens.silver">
                <img v-if="silver.value == 5" :key="silver.id" class="token" src="@/assets/Silver_coin.png" alt="">
              </template>
            </div>
            <!-- Carpet -->
            <div class="token-list">
              <img v-if="this.tokens.cloth && this.tokens.cloth.length == 0" class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
              <template v-for="cloth in this.tokens.cloth">
                <img v-if="cloth.value == 1" :key="cloth.id" class="token" src="@/assets/Carpet_coin-1.png" alt="">
                <img v-if="cloth.value == 2" :key="cloth.id" class="token" src="@/assets/Carpet_coin-2.png" alt="">
                <img v-if="cloth.value == 3" :key="cloth.id" class="token" src="@/assets/Carpet_coin-3.png" alt="">
                <img v-if="cloth.value == 5" :key="cloth.id" class="token" src="@/assets/Carpet_coin-5.png" alt="">
              </template>
            </div>
            <!-- Spice -->
            <div class="token-list">
              <img v-if="this.tokens.spice && this.tokens.spice.length == 0" class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
              <template v-for="spice in this.tokens.spice">
                <img v-if="spice.value == 1" :key="spice.id" class="token" src="@/assets/Spice_coin-1.png" alt="">
                <img v-if="spice.value == 2" :key="spice.id" class="token" src="@/assets/Spice_coin-2.png" alt="">
                <img v-if="spice.value == 3" :key="spice.id" class="token" src="@/assets/Spice_coin-3.png" alt="">
                <img v-if="spice.value == 5" :key="spice.id" class="token" src="@/assets/Spice_coin-5.png" alt="">
              </template>
            </div>
            <!-- Leather -->
            <div class="token-list">
              <img v-if="this.tokens.leather && this.tokens.leather.length == 0" class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
              <template v-for="leather in this.tokens.leather">
                <img v-if="leather.value == 1" :key="leather.id" class="token" src="@/assets/Leather_coin-1.png" alt="">
                <img v-if="leather.value == 2" :key="leather.id" class="token" src="@/assets/Leather_coin-2.png" alt="">
                <img v-if="leather.value == 3" :key="leather.id" class="token" src="@/assets/Leather_coin-3.png" alt="">
                <img v-if="leather.value == 4" :key="leather.id" class="token" src="@/assets/Leather_coin-4.png" alt="">
              </template>
            </div>
          </div>
        </div>

        <!-- Market -->
        <div class="market">
          <div v-for="card in market" :key="card">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.type == 'camel'" class="card empty-cards card-selected" src="@/assets/Camel_card.png" alt="">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.value == 'leather'" class="card empty-cards card-selected" src="@/assets/Leather_card.png" alt="">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.value == 'spice'" class="card empty-cards card-selected" src="@/assets/Spices_card.png" alt="">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.value == 'cloth'" class="card empty-cards card-selected" src="@/assets/Carpet_card.png" alt="">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.value == 'silver'" class="card empty-cards card-selected" src="@/assets/Silver_card.png" alt="">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.value == 'gold'" class="card empty-cards card-selected" src="@/assets/Gold_card.png" alt="">
            <img @click="activeMarket" :id="card.id" :data-value="card.value" v-if="card.value == 'diamond'" class="card empty-cards card-selected" src="@/assets/Ruby_card.png" alt="">
          </div>

          <!-- Buttons -->
          <transition name="fade">
            <div class="buttons" v-if="buttons">
              <button id="trade" :class="{ 'disable': !tradeButton }" class="lien" @click="tradeButton && currentPlayer == playerNo ? this.emitter.emit('trade') : ''">Échanger</button>
              <button id="take" :class="{ 'disable': !takeButton }" class="lien" @click="takeButton && currentPlayer == playerNo ? this.emitter.emit('trade') : ''">Prendre</button>
              <button id="sell" :class="{ 'disable': !sellButton }" class="lien" @click="sellButton && currentPlayer == playerNo ? this.emitter.emit('sell') : ''">Vendre</button>
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
            <div class="deck card empty-cards">
              <span v-if="wait == false" class="deck-number">{{ deck }}</span>
              <img v-if="deck >= 27" src="@/assets/Deck_full.png" alt="">
              <img v-if="deck <= 26 && deck != 0" src="@/assets/Deck_half.png" alt="">
              <img v-if="deck == 0 && wait == false" class="card card-hidden" src="@/assets/Back_card.png" alt="">
            </div>

            <!-- Graveyard -->
            <div class="graveyard card empty-cards">
              <img v-if="wait == false" class="card card-hidden" src="@/assets/Back_card.png" alt="">
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
</template>

<script>
export default {
    name: "BoardGame",
    props : ['socket', 'playerNo', 'opponentNo', 'buttons', 'tradeButton', 'takeButton', 'sellButton', 'wait', 'player', 'opponent', 'currentPlayer', 'tokens', 'market', 'deck', 'graveyard'],
    data() {
        return{
            tokensOverlay: false,
            tokensZoom: false,
        }
    },
    methods: {
        activeMarket(ev){
            this.emitter.emit('activeCards', ev)
        }
    }
}
</script>

<style scoped>
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


/* Tokens */
.tokens-hover {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
  opacity: 0;
  padding: 1rem;
  transition: all .3s ease-in-out;
}

.tokens-zoom {
  position: absolute;
  top: 0;
  z-index: -1;
  left: 1rem;
  border: 1px var(--main-color) solid;
  width: 24px;
  height: 24px;
  color: var(--main-color);
  background-color: #fff;
  border-radius: 100%;
  padding: .2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.tokens-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all .3s ease-in-out;
}

.tokens-container:hover {
  cursor: pointer;
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

.player-container, .deck {
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
</style>