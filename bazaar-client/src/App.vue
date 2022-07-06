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
:root {
  --main-color: #272626;
  --main-color-light: #585454;
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
  width: 12rem;
  display: inline-block;
  color: white;
  background-color: #272626;
  text-decoration: none;
  font-size: .875rem;
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  transition: all .3s ease-in-out;
}
.lien:hover {
  background-color: #e2c372;
  cursor: pointer;
}

@media (min-width: 640px) { 
  .lien {
    font-size: 1rem;
  }
}
</style>