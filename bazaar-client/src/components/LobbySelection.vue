<template>
  <div v-if="lobby" class="lobby">
    <!-- Navigation -->
    <div class="grille">
      <div class="colonne1">
        <h1 class="titre">
          Magnus <br />
          Bazaar
        </h1>
        <div class="bouton jeu">
            <a class="lien">Jouer contre une IA</a>
        </div>
        <div class="bouton creer">
          <a @click="isShow_createRoom = !isShow_createRoom" class="lien">Créer un salon</a>
        </div>

        <div class="bouton rejoindre">
          <a class="lien" @click="isShow_joinRoom = !isShow_joinRoom">
            Rejoindre un salon
          </a>
        </div>
        <div class="bouton regles">
          <router-link class="lien" to="/regles">Règles du jeu</router-link>
        </div>
        <div class="bouton communication">
          <router-link class="lien" to="/communication"
            >Communication</router-link
          >
        </div>
        <div class="copyright">
          ©2022, QUEMERAS Arthur, FORSANS Paul, TRAVERS Nicolas
        </div>
      </div>
      <div class="colonne2">
        <img class="image_accueil" src="../assets/marchand.png" alt="" />
        <svg class="divide_home" width="8" height="100%" viewBox="0 0 8 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.499955 1024.5L0.499955 -0.5L7.5 -0.5L7.50002 1024.5L0.499955 1024.5Z" fill="#1F1A17" stroke="black"/>
        </svg>
      </div>
    </div>

    <!-- Popup salon -->
    <div class="pop_up" v-show="isShow_joinRoom">
      <div class="container">
        <h2>Rejoindre un salon</h2>
        <form id="joinRoom" action="">
          <input type="text" placeholder="Votre pseudo" />
          <input type="text" placeholder="Nom du salon" />
          <input type="submit" class="lien_popup" value="Rejoindre" />
        </form>
        <button class="cross" @click="isShow_joinRoom = false">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 20L4 4M20 4L4 20"
              stroke="#272626"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="pop_up" v-show="isShow_createRoom">
      <div class="container">
        <form id="createRoom" action="">
          <div>
            <input type="text" placeholder="Votre pseudo" />
            <input
              @click="isShow_createRoom = !isShow_createRoom"
              class="lien_popup"
              type="submit"
              value="Créer"
            />
          </div>
        </form>
        <button class="cross" @click="isShow_createRoom = false">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 20L4 4M20 4L4 20"
                  stroke="#272626"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "LobbySelection",
    data: function () {
      return {
        isShow_joinRoom: false,
        isShow_createRoom: false,
      };
    },
    props: ['socket', 'lobby'],
    mounted () {
        const roomCreation = document.querySelector('#createRoom')
        const roomJoin = document.querySelector('#joinRoom')
        if (roomCreation) {
            roomCreation.addEventListener('submit', e => {
                e.preventDefault()
                this.socket.emit("createroom", {name : e.target[0].value});
            })
        }
        roomJoin.addEventListener('submit', e => {
            e.preventDefault()
            this.socket.emit('joinroom', {name: e.target[0].value, room: e.target[1].value});
        })
        this.socket.on('roomjoined', data => {
            this.emitter.emit('addAlert', {
                type: "enter",
                message: data.player + " a rejoint la salle " + data.room,
            });
            this.emitter.emit('setRoom', data.room);
            this.emitter.emit('setLobby', false);
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
.colonne1 {
  text-align: center;
  width: 50%;
  display: grid;
}
.colonne2 {
  width: 50%;
  display: grid;
  position: relative;
}

.titre {
  margin-top: 5rem;
  color: white;
}
.image_accueil {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}
.divide_home {
  position: absolute;
  left: -2px;
  top: 0;
}
.lobby .lien:hover {
  border-color: rgb(var(--secondary-color));
}
.lien_popup {
  width: 10rem;
  display: inline-block;
  color: white;
  background-color: #272626;
  text-decoration: none;
  font-size: large;
  padding: 1rem;
  border-radius: 0.5rem;
  border: solid 2px #e2c372;
}
.lien_popup:hover {
  background-color: #e2c372;
  cursor: pointer;
}
.nom_salon {
  display: none;
}

.copyright {
  margin: auto;
  color: white;
}
.pop_up {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.container {
  background-color: var(--main-color);
  color: white;
  border-radius: 1rem;
  height: 9rem;
}
.cross {
  border-radius: 1rem;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: fixed;
  top: 41%;
}
</style>
