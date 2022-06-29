<template>
  <div>
    <h1>Magnus Bazaar</h1>
    <div>
      <button v-on:click="sell">Vendre</button>
      <button @click="buy">Acheter au Marché</button>
    </div>
    <div>
      <h2>Ta main</h2>
      
      <ul v-if="hand.length">
        <li :v-for="card in hand">{{card.id}} - {{ card.type }} - {{card.value}}</li>
      </ul>
      <h2>La main de ton adversaire</h2>
      
      <ul v-if="oppHand.length">
        <li :v-for="card in oppHand">{{card.id}} - {{ card.type }} - {{card.value}}</li>
      </ul>
      <h2>Le marché</h2>
      
      <ul v-if="market.length">
        <li :v-for="card in market">{{card.id}} - {{ card.type }} - {{card.value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BazaarGame',
  props : ['socket'],
  data () {
    return {
      hand: [],
      playerNo: "",
      market: [],
      oppHand: []
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
