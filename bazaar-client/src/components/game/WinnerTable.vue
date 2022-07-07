<template>
    <!-- Winner -->
    <div class="winner" v-if="winnerOverlay">
      <div class="winner-container">
        <table>
            <tr class="winner-table-title">
                <td></td>
                <td><img class="token" src="@/assets/Ruby_coin-7.png" alt=""></td>
                <td></td>
                <td><img class="token" src="@/assets/5_cards_coin.png" alt=""></td>
                <td></td>
                <td><img class="token" src="@/assets/Camel_coin.png" alt=""></td>
                <td></td>
                <td class="total">Points totaux</td>
            </tr>
            <tr class="winner-table-value">
                <td class="winner-table-name">{{ player.name }}:</td>
                <td>{{ player.merchandisesPoints }}</td>
                <td>+</td>
                <td>{{ player.bonusPoints }}</td>
                <td>+</td>
                <td><span v-if="player.camelToken">5</span><span v-else>0</span></td>
                <td>=</td>
                <td><strong>{{ player.totalPoints }}</strong></td>
            </tr>
        </table>
        <table>
            <tr class="winner-table-title">
                <td></td>
                <td><img class="token" src="@/assets/Ruby_coin-7.png" alt=""></td>
                <td></td>
                <td><img class="token" src="@/assets/5_cards_coin.png" alt=""></td>
                <td></td>
                <td><img class="token" src="@/assets/Camel_coin.png" alt=""></td>
                <td></td>
                <td class="total">Points totaux</td>
            </tr>
            <tr class="winner-table-value">
                <td class="winner-table-name">{{ opponent.name }}:</td>
                <td>{{ opponent.merchandisesPoints }}</td>
                <td>+</td>
                <td>{{ opponent.bonusPoints }}</td>
                <td>+</td>
                <td><span v-if="opponent.camelToken">5</span><span v-else>0</span></td>
                <td>=</td>
                <td><strong>{{ opponent.totalPoints }}</strong></td>
            </tr>
        </table>
        <p><strong>{{ winner }}</strong> <span v-if="ia == false || winner === 'Le Marchand'">a</span> <span v-else>avez</span> su avoir le sens des négociations et <span v-if="ia == false || winner === 'Le Marchand'">devient</span><span v-else>êtes devenu.e</span> un marchand reconnu au sein du Magnus Bazaar</p>
        <div class="winner-restart">
            <div>
                <div class="winner-restart-wait" v-if="restart">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
                    <p>En attente de l'adversaire ...</p>
                </div>
            </div>
            <button class="lien" @click="restartGame" :class="{'disable': restart}">Rejouer</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "WinnerTable",
    props : ['socket', 'winnerOverlay', 'player', 'opponent', 'winner', 'ia'],
    data(){
        return {
            restart: false
        }
    },
    methods: {
        restartGame() {
          if(this.ia){
            this.socket.emit('ia-create')
          }
          else {
            this.socket.emit('restart')
            this.restart = true
          }
        }
    }
}
</script>

<style scoped>
/* Winner */
.winner {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 30;
  padding: 1rem;
}

.winner .token {
  margin-right: 0;
}

.winner p{
  margin: 0;
}

.winner strong{
  color: rgb(var(--secondary-color));
}

.winner h2{
  margin-top: 0;
}

.winner .lien {
    background-color: var(--main-color-light);
}

.winner .lien:hover {
    background-color: rgb(var(--secondary-color));
}

.winner .lien.disable {
  background: #ddd !important;
  border-color: #ddd !important;
  color: black !important;
  opacity: 0.75 !important;
}

.winner .lien.disable:hover {
  cursor: not-allowed;
}

.winner-container {
  border-radius: 20px;
  background: var(--main-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
  width: 540px;
}

.winner-table-title {
  font-size: .875rem;
}

.winner-table-title .total {
  font-style: italic;
  opacity: .5;
}

.winner-table-name {
  width: 30%;
}

.winner-restart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.winner-restart-wait {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.winner-restart-wait p {
    font-size: .875rem;
}
</style>