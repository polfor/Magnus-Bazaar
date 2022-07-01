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

/* Buttons */
.bouton_maison {
  background-color: var(--main-color);
  padding: 0.4rem;
  border-radius: 100%;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  color: #fff;
  transition: all .3s ease-in-out;
}

.bouton_maison:hover {
  background-color: rgb(var(--secondary-color));
  color: var(--main-color);
  cursor: pointer;
}

/* links */
.lien {
  width: 10rem;
  display: inline-block;
  color: white;
  background-color: #272626;
  text-decoration: none;
  font-size: large;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  transition: all .3s ease-in-out;
}
.lien:hover {
  background-color: #e2c372;
  cursor: pointer;
}
</style>
