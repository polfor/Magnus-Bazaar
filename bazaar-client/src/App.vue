<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

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
