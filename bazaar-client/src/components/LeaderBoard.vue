<template>
    <!-- Podium -->
    <div>
      <svg class="bouton_maison" @click="rankOverlay = !rankOverlay" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="36" height="36" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="currentColor" d="M406.1 61.65c9.3 1.44 13.3 12.94 6.5 19.76l-38 36.69l9 52c.5 9.4-8.3 16.6-16.9 12.3l-46.5-24.5l-46.9 24.8c-8.6 4.3-18.3-2.9-16.9-12.2l9-52.1l-38-36.99c-6.8-6.82-2.8-18.32 6.5-19.76l52.3-7.54l23.6-47.778c4.3-8.621 16.5-8.262 20.4 0l23.6 47.778l52.3 7.54zM384 256c17.7 0 32 14.3 32 32v192c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32V288c0-17.7 14.3-32 32-32h128zm-224 64c17.7 0 32 14.3 32 32v128c0 17.7-14.3 32-32 32H32c-17.67 0-32-14.3-32-32V352c0-17.7 14.33-32 32-32h128zm288 96c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32v-64z"/></svg>
      <div class="rank" v-if="rankOverlay">
        <div class="rank-container">
            <div class="rank-leader">
                <div v-for="(winner, index) in this.rank.slice(0, 3)" :key="winner.id" class="rank-leader-podium">
                    <span class="rank-leader-name" :class="'rank-leader-name-' + index">{{winner.name}}</span>
                    <svg v-if="index == 1" width="24" height="24" viewBox="0 0 194 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M183.1 61.6501C192.4 63.0901 196.4 74.5901 189.6 81.4101L151.6 118.1L160.6 170.1C161.1 179.5 152.3 186.7 143.7 182.4L97.2001 157.9L50.3001 182.7C41.7001 187 32.0001 179.8 33.4001 170.5L42.4001 118.4L4.40012 81.4101C-2.39988 74.5901 1.60012 63.0901 10.9001 61.6501L63.2001 54.1101L86.8001 6.33208C91.1001 -2.28892 103.3 -1.92992 107.2 6.33208L130.8 54.1101L183.1 61.6501Z" fill="currentColor"/>
                    </svg>
                    <div class="rank-position" :class="'rank-position-' + index">
                        <span>{{winner.score}}</span>
                    </div>
                </div>
            </div>
            <div class="divide"></div>
            <table>
                <tr class="rank-table" v-for="winner in this.rank.slice(3, 10)" :key="winner.id">
                <td class="rank-table-item rank-player"><strong>{{winner.name}}</strong></td>
                <td>:</td>
                <td class="rank-table-item rank-score">{{winner.score}}</td>
                </tr>
            </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "LeaderBoard",
    data() {
        return {
            rankOverlay: false,
            rank: [
                {
                    name: "test",
                    score: 0
                },
                {
                    name: "test2",
                    score: 0
                },
                {
                    name: "the best",
                    score: 0
                },
                {
                    name: "I am to strong for you",
                    score: 0
                },
                {
                    name: "pomme",
                    score: 0
                },
            ]
        }
    }
}
</script>

<style scoped>
/* Rank */
.rank {
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

.rank-container {
  border-radius: 20px;
  background: var(--main-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-width: 340px;
}

/* Leader */
.rank-leader {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1rem;
    padding-top: 2rem;
}

.rank-leader span {
    text-align: center;
}

.rank-leader-podium {
    position: relative;
}

.rank-leader-name {
    position: absolute;
    white-space: nowrap;
    bottom: 100%;
    color: #fff;
    min-width: 48px;
}

.rank-leader-name-0 {
    right: 0;
}

.rank-leader-name-2 {
    left: 0;
}

.rank-leader-podium {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    flex-direction: column;
}

.rank-position {
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    width: 48px;
    margin: auto;
}

.rank-position span {
    transform: rotate(-90deg);
}

.rank-position-0 {
    min-height: 75px;
    margin-right: 0;
}
.rank-position-1 {
    min-height: 100px;
}
.rank-position-2 {
    min-height: 50px;
    margin-left: 0;
}

/* LeaderBoard */
.rank-table-item {
    width: 13rem;
}

.rank-player {
    text-align: right;
}

.rank-score {
    text-align: left;
}

.rank strong{
  color: rgb(var(--secondary-color));
}

.divide {
    height: 1px;
    background-color: #fff;
    width: 80%;
}
</style>