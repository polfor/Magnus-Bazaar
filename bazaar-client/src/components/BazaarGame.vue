<template>
  <div class="grille">
    <div class="colonne1">
      <h1 class="titre">Magnus Bazaar</h1>
      <div class="bouton jeu">
        <a href="/jeu">Jouer contre une IA</a>
      </div>
      <div class="bouton creer">
        <a href="">Créer un salon</a>
      </div>
      <div class="bouton rejoindre">
        <a href="">Rejoindre un salon</a>
      </div>
      <div class="bouton regles">
        <a href="/regles">Règles du jeu</a>
      </div>
      <div class="copyright">
        ©2022, QUEMERAS Arthur, FORSANS Paul, TRAVERS Nicolas
      </div>
    </div>
    <div class="colonne2">
      <img class="image_accueil" src="../assets/marchand.png" alt="" />
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
.grille {
  display: flex;
}
.bouton{

}
.colonne1 {
  text-align: center;
  width: 50%;
  display: grid;
}
.colonne2 {
  width: 50%;
  display: grid;
}

.titre {
  margin-top: 5rem;
  color: white;
  font-family: sans-serif;
}
.image_accueil {
  max-width: 100%;
  max-height: 100vh;
  margin: auto;
}
a {
  color: white;
  background-color: #272626;
  text-decoration: none;
  font-size: large;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: sans-serif;
  
}
a:hover {
  background-color: #e2c372;
}

.copyright {
  margin: auto;
  color: white;
}

</style>
