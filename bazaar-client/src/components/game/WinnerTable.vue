<template>
    <!-- Winner -->
    <div class="winner" v-if="winnerOverlay">
      <div class="winner-container">
          <table>
            <tr class="winner-table-title">
                <td></td>
                <td>Points des jetons</td>
                <td></td>
                <td>Points des jetons bonus</td>
                <td></td>
                <td>Points totaux</td>
            </tr>
            <tr class="winner-table-value">
                <td class="winner-table-name">{{ player.name }}:</td>
                <td>{{ player.merchandisesPoints }}</td>
                <td>+</td>
                <td>{{ player.bonusPoints }}</td>
                <td>=</td>
                <td><strong>{{ player.totalPoints }}</strong></td>
            </tr>
        </table>
            <table>
            <tr class="winner-table-title">
                <td></td>
                <td>Points des jetons</td>
                <td></td>
                <td>Points des jetons bonus</td>
                <td></td>
                <td>Points totaux</td>
            </tr>
            <tr class="winner-table-value">
                <td class="winner-table-name">{{ opponent.name }}:</td>
                <td>{{ opponent.merchandisesPoints }}</td>
                <td>+</td>
                <td>{{ opponent.bonusPoints }}</td>
                <td>=</td>
                <td><strong>{{ opponent.totalPoints }}</strong></td>
            </tr>
        </table>
        <p><strong>{{ winner }}</strong> a su avoir le sens des négociations et devient un marchant reconnu au sein du Magnus Bazaar</p>
        <button class="lien" @click="this.socket.emit('restart');">Rejouer</button>
      </div>
    </div>
</template>

<script>
export default {
    name: "WinnerTable",
    props : ['socket', 'winnerOverlay', 'player', 'opponent', 'winner']
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

.winner-table-title td {
  font-style: italic;
  opacity: .5;
}

.winner-table-name {
  width: 30%;
}
</style>