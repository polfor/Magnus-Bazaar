<template>
<div>
    <router-view />
  
    <!-- <HomeComponent :socket="this.socket" :lobby="this.lobby" /> -->
  
</div>
</template>

<script>
// import HomeComponent from "./components/HomeComponent.vue";

export default {
  name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

/* Base */
:root {
  --main-color: #272626;
  --secondary-color: 226, 195, 114;
}

body {
  background: url(./assets/Background.png) repeat-y;
  background-size: 100% auto;
  margin: 0rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
