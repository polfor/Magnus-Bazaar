<template>
    <!-- Hand player one -->
    <div @mouseenter="handOpen = true" @mouseleave="handOpen = false" v-bind:class="{ open: handOpen }" class="player-cards player-cards-one">
      <!-- Hand -->
      <div class="hand-container-one">
        <div class="hand">
          <img v-if="player.hand.length == 0" class="little-card card-player card-hidden" src="@/assets/Back_card.png" alt="">
          <div v-for="card in player.hand" :key="card.id">
            <img @click="activeHand" :id="card.id" :data-value="card.value" v-if="card.value == 'leather'" class="little-card card-player card-selected" src="@/assets/Leather_card.png" alt="">
            <img @click="activeHand" :id="card.id" :data-value="card.value" v-if="card.value == 'spice'" class="little-card card-player card-selected" src="@/assets/Spices_card.png" alt="">
            <img @click="activeHand" :id="card.id" :data-value="card.value" v-if="card.value == 'cloth'" class="little-card card-player card-selected" src="@/assets/Carpet_card.png" alt="">
            <img @click="activeHand" :id="card.id" :data-value="card.value" v-if="card.value == 'silver'" class="little-card card-player card-selected" src="@/assets/Silver_card.png" alt="">
            <img @click="activeHand" :id="card.id" :data-value="card.value" v-if="card.value == 'gold'" class="little-card card-player card-selected" src="@/assets/Gold_card.png" alt="">
            <img @click="activeHand" :id="card.id" :data-value="card.value" v-if="card.value == 'diamond'" class="little-card card-player card-selected" src="@/assets/Ruby_card.png" alt="">
          </div>
        </div>
      </div>
      
      <!-- Enclosure -->
      <div class="enclosure enclosure-one">
        <span v-if="player.enclosure.length != 0" class="enclosure-number">{{ player.enclosure.length }}</span>
        <img @click="activeHand" :id="enclosure.id" :data-value="enclosure.value" v-for="enclosure in player.enclosure" :key="enclosure.index" class="little-card camel-card camel-card-one card-selected" src="@/assets/Camel_card.png" alt="">
      </div>

      <!-- Hand tokens -->
      <div class="hand-tokens" v-if="wait == false" :class="{ 'active': tokensOpen && this.player.tokens != 0 }" @mouseenter="tokensOpen = true" @mouseleave="tokensOpen = false">
        <div class="hand-tokens-list token-list">
          <img class="token token-hidden" src="@/assets/Merchant-coin.png" alt="">
          <template v-for="token in this.player.tokens">
            <!-- Ruby -->
            <img v-if="token.type == 'diamond' && token.value == 5" :key="token.id" class="token" src="@/assets/Ruby_coin-5.png" alt="">
            <img v-if="token.type == 'diamond' && token.value == 7" :key="token.id" class="token" src="@/assets/Ruby_coin-7.png" alt="">
            <!-- Gold -->
            <img v-if="token.type == 'gold' && token.value == 5" :key="token.id" class="token" src="@/assets/Gold_coin-5.png" alt="">
            <img v-if="token.type == 'gold' && token.value == 6" :key="token.id" class="token" src="@/assets/Gold_coin-6.png" alt="">
            <!-- Silver -->
            <img v-if="token.type == 'silver' && token.value == 5" :key="token.id" class="token" src="@/assets/Silver_coin.png" alt="">
            <!-- Cloth -->
            <img v-if="token.type == 'cloth' && token.value == 1" :key="token.id" class="token" src="@/assets/Carpet_coin-1.png" alt="">
            <img v-if="token.type == 'cloth' && token.value == 2" :key="token.id" class="token" src="@/assets/Carpet_coin-2.png" alt="">
            <img v-if="token.type == 'cloth' && token.value == 3" :key="token.id" class="token" src="@/assets/Carpet_coin-3.png" alt="">
            <img v-if="token.type == 'cloth' && token.value == 5" :key="token.id" class="token" src="@/assets/Carpet_coin-5.png" alt="">
            <!-- Spice -->
            <img v-if="token.type == 'spice' && token.value == 1" :key="token.id" class="token" src="@/assets/Spice_coin-1.png" alt="">
            <img v-if="token.type == 'spice' && token.value == 2" :key="token.id" class="token" src="@/assets/Spice_coin-2.png" alt="">
            <img v-if="token.type == 'spice' && token.value == 3" :key="token.id" class="token" src="@/assets/Spice_coin-3.png" alt="">
            <img v-if="token.type == 'spice' && token.value == 5" :key="token.id" class="token" src="@/assets/Spice_coin-5.png" alt="">
            <!-- Leather -->
            <img v-if="token.type == 'leather' && token.value == 1" :key="token.id" class="token" src="@/assets/Leather_coin-1.png" alt="">
            <img v-if="token.type == 'leather' && token.value == 2" :key="token.id" class="token" src="@/assets/Leather_coin-2.png" alt="">
            <img v-if="token.type == 'leather' && token.value == 3" :key="token.id" class="token" src="@/assets/Leather_coin-3.png" alt="">
            <img v-if="token.type == 'leather' && token.value == 4" :key="token.id" class="token" src="@/assets/Leather_coin-4.png" alt="">
            <!-- Bonus -->
            <img v-if="token.type == 'bonus_3'" :key="token.id" class="token" src="@/assets/3_cards_coin.png" alt="">
            <img v-if="token.type == 'bonus_4'" :key="token.id" class="token" src="@/assets/4_cards_coin.png" alt="">
            <img v-if="token.type == 'bonus_5'" :key="token.id" class="token" src="@/assets/5_cards_coin.png" alt="">
          </template>

          <span class="hand-tokens-points">{{ player.totalPoints }}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "HandPlayer",
    props : ['wait', 'player'],
    data() {
      return {
        handOpen: false,
        tokensOpen: false
      }
    },
    methods: {
        activeHand(ev){
            this.emitter.emit('activeCards', ev)
        }
    }
}
</script>

<style scoped>
/* Tokens */
.hand-tokens {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem;
}

.hand-tokens-list {
  position: relative;
  /* background: rgba(0, 0, 0, 0.2); */
  /* z-index: -1;
  opacity: 0; */
  transition: all .3s ease-in-out;
}

.hand-tokens-points {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background: rgba(255,255,255, .5);
  color: var(--main-color);
  border-radius: 100%;
}

.hand-tokens-list.token-list {
  justify-content: flex-start;
  margin-right: 0;
  /* margin-right: 3%; */
}

.hand-tokens-list .token {
  margin-right: 0;
}

.hand-tokens-list .token:not(.token-hidden) {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.hand-tokens-list .token-hidden {
  position: relative;
}

.hand-tokens.active{
  background: rgba(0,0,0,0.5);
  overflow-x: auto;
  width: 100%;
  z-index: 40;
  transition: all .3s ease-in-out;
}

.hand-tokens.active .hand-tokens-list {
  margin-right: 2rem;
}

.hand-tokens.active .token:not(.token-hidden){
  position: relative;
  z-index: 20;
  margin-right: -2rem;
  left: max(-5vw, -3.5rem);
}

.hand-tokens.active .hand-tokens-points{
  opacity: 0;
}

@media (min-width: 1536px){
  .hand-tokens.active .token:not(.token-hidden){
    left: max(-5vw, -4.25rem);
  }
}
</style>