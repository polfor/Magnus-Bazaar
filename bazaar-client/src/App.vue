<template>
<div>
   <LobbySelection :socket=this.socket />
   <BazaarGame />
</div>
</template>

<script>
import io from "socket.io-client";
import BazaarGame from './components/BazaarGame.vue'
import LobbySelection from './components/LobbySelection.vue'

export default {
  name: 'App',
  data() {
    return {
       socket: {}
    }
  },
  components: {
    BazaarGame,
    LobbySelection
  },
  created() {
    this.socket = io("http://localhost:3000")
  }
}
</script>

<style>
</style>
