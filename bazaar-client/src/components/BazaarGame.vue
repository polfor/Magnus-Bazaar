<template>
  <div>
    <h1>Magnus Bazaar</h1>
    <div>
      <button v-on:click="sell">Vendre</button>
      <button @click="buy">Acheter au Marché</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BazaarGame',
  props : ['socket'],
  methods: {
    sell: () => {
      console.log("vendu");
    },

    buy: () => {
      console.log("acheté")
    },

    createGame: (gameState) => {
      console.log(gameState)
    }

  }, mounted () {
      this.socket.on('gamecreated', gameData => {
        this.createGame(gameData);
      });
    }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
