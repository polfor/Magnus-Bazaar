<template>
    <!-- Hand opponent -->
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
</template>

<script>
export default {
    name: "HandOpponant",
    props : ['opponent']
}
</script>

<style scoped>
</style>