<template>
    <div style="display: none;">
        <!-- Navigation -->
        <div class="grille">
            <div class="colonne1">
            <h1 class="titre">Magnus Bazaar</h1>
            <div class="bouton jeu">
                <a class="lien" href="/jeu">Jouer contre une IA</a>
            </div>
            <form id="createRoom" action="">
                <div class="bouton creer">
                    <input type="text" placeholder="Votre pseudo">
                    <input class="lien" type="submit" value="Créer">
                </div>
            </form>
            <div class="bouton rejoindre">
                <a class="lien" href="">Rejoindre un salon</a>
            </div>
            <div class="bouton regles">
                <a class="lien" href="/regles">Règles du jeu</a>
            </div>
            <div class="copyright">
                ©2022, QUEMERAS Arthur, FORSANS Paul, TRAVERS Nicolas
            </div>
            </div>
            <div class="colonne2">
                <img class="image_accueil" src="../assets/marchand.png" alt="" />
            </div>
        </div>

        <!-- Popup salon -->
        <h2>Rejoindre un salon</h2>
        <form id="joinRoom" action="">
            <input type="text" placeholder="Votre pseudo">
            <input type="text" placeholder="Nom du salon">
            <input type="submit" value="Rejoindre">
        </form>
    </div>
</template>

<script>
export default {
    name: "LobbySeletion",
    props: ['socket'],
    mounted () {
        console.log(this.socket)
        const roomCreation = document.querySelector('#createRoom')
        const roomJoin = document.querySelector('#joinRoom')
        roomCreation.addEventListener('submit', e => {
            e.preventDefault()
            this.socket.emit("createroom", {name : e.target[0].value});
        })
        roomJoin.addEventListener('submit', e => {
            e.preventDefault()
            this.socket.emit('joinroom', {name: e.target[0].value, room: e.target[1].value})
        })
        this.socket.on('roomjoined', data => {
            console.log("rejoint la salle "+ data.room)
        })
        this.socket.on('noroom', data => {
            console.log('La room '+ data.room + ' n\'existe pas');
        })
    },
}
</script>

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
}
.image_accueil {
  max-width: 100%;
  max-height: 100vh;
  margin: auto;
}
.lien {
  color: white;
  background-color: #272626;
  text-decoration: none;
  font-size: large;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
}
.lien:hover {
  background-color: #e2c372;
  cursor: pointer;
}

.copyright {
  margin: auto;
  color: white;
}

</style>