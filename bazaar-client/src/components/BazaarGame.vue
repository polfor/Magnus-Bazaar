<template>
  <div>
    <!-- Hand player one -->
    <div class="player-cards player-cards-one">
      <!-- Hand -->
      <div class="hand">
        <img v-for="index in 5" :key="index" class="little-card card-player" src="@/assets/Back_card.png" alt="">
      </div>
      
      <!-- Enclosure -->
      <div class="enclosure">
        <img v-for="enclosure in playerOne.enclosure" :key="enclosure.index" class="card card-rotate" src="@/assets/Camel_card.png" alt="">
      </div>
    </div>

    <!------------------------>

    <!-- Hand player two -->
    <div class="player-cards player-cards-two">
      <!-- Hand -->
      <div class="hand">
        <img v-for="index in 5" :key="index" class="little-card card-player" src="@/assets/Back_card.png" alt="">
      </div>
      
      <!-- Enclosure -->
      <div class="enclosure">
        <img v-for="enclosure in playerTwo.enclosure" :key="enclosure.index" class="card card-rotate" src="@/assets/Camel_card.png" alt="">
      </div>
    </div>

    <!------------------------>

    <div class="game">
      <!-- Board -->
      <div class="board">
        <!-- Tokens -->
        <div class="tokens">

        </div>

        <!-- Market -->
        <div class="market">
          <img v-for="index in 3" :key="index" class="card" src="@/assets/Camel_card.png" alt="">
          <div v-for="index in 2" :key="index" class="card empty-cards"></div>
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
  props : ['socket'],
  data () {
    return {
      playerOne: {
        hand: [],
        playerNo: "efz",
        enclosure: true
      },
      playerTwo: {
        hand: [],
        playerNo: "afergeg",
        enclosure: false
      },
      board: {
        market: [],
        deck: "full",
        graveyard: []
      }
    }
  },
  methods: {
    sell:  () => {
      this.socket.emit('sell');
    },

    buy: () => {
      this.socket.emit('buy')
    },

  }, mounted () {

      this.socket.on('game-start', data=> {
        this.playerNo = data.playerNo
      })

      this.socket.on('game-update', data => {
        if(this.hand != data[this.playerNo].hand) this.hand = data[this.playerNo].hand;
        if(this.market != data[this.playerNo].market) this.market = data[this.playerNo].market;
        if(this.oppHand != data[this.playerNo].oppHand) this.oppHand = data[this.playerNo].oppHand;
      })
    }

}
</script>

<style scoped>
/* Cards */
.card, .little-card {
  width: 10vw;
  height: auto;
}

.little-card {
  width: 10vw;
  max-width: 100px;
  height: auto;
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

.hand {
  display: flex;
}

.card-player {
  margin-right: -12%;
}

.player-cards-one {
  right: 0;
  bottom: -2rem;
}

.player-cards-two {
  left: 10vw;
  top: -2rem;
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
  grid-column: 1 / span 5;
  display: flex;
  gap: 1rem;
}

/* -- Game cards */
.interface {
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
</style>
