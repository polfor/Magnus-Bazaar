<template>
    <div>
        <LobbySelection :socket=this.socket :lobby=this.lobby />
        <BazaarGame :socket=this.socket :lobby=this.lobby :room=this.room />

        <!-- Notifications -->
        <transition-group name="fade" id="alert" class="alert" tag="ul">
            <li class="alert-item" v-for="alert in alerts" :key="alert.id">
                <svg v-if="alert.type == 'error'" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM12 6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5C10.7348 5 10.4804 5.10536 10.2929 5.29289C10.1054 5.48043 10 5.73478 10 6V12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13C11.2652 13 11.5196 12.8946 11.7071 12.7071C11.8946 12.5196 12 12.2652 12 12V6ZM12 15.5C12 15.2348 11.8946 14.9804 11.7071 14.7929C11.5196 14.6054 11.2652 14.5 11 14.5C10.7348 14.5 10.4804 14.6054 10.2929 14.7929C10.1054 14.9804 10 15.2348 10 15.5V16C10 16.2652 10.1054 16.5196 10.2929 16.7071C10.4804 16.8946 10.7348 17 11 17C11.2652 17 11.5196 16.8946 11.7071 16.7071C11.8946 16.5196 12 16.2652 12 16V15.5Z" fill="#FF0000"/>
                </svg>
                <svg v-if="alert.type == 'leave'" width="22" height="22" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M176 176V136C176 125.391 180.214 115.217 187.716 107.716C195.217 100.214 205.391 96 216 96H424C434.609 96 444.783 100.214 452.284 107.716C459.786 115.217 464 125.391 464 136V376C464 386.609 459.786 396.783 452.284 404.284C444.783 411.786 434.609 416 424 416H216C205.391 416 195.217 411.786 187.716 404.284C180.214 396.783 176 386.609 176 376V336" stroke="black" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M128 176L48 256L128 336M352 256L64 256" stroke="black" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-if="alert.type == 'enter'" width="22" height="22" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M176 176V136C176 125.391 180.214 115.217 187.716 107.716C195.217 100.214 205.391 96 216 96H424C434.609 96 444.783 100.214 452.284 107.716C459.786 115.217 464 125.391 464 136V376C464 386.609 459.786 396.783 452.284 404.284C444.783 411.786 434.609 416 424 416H216C205.391 416 195.217 411.786 187.716 404.284C180.214 396.783 176 386.609 176 376V336" stroke="black" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M272 336L352 256L272 176M48 256H336" stroke="black" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-if="alert.type == 'check'" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27006 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z" fill="#00FF57"/>
                </svg>
                <p>{{alert.message}}</p>
            </li>
        </transition-group>
    </div>
</template>

<script>
import io from "socket.io-client";
import LobbySelection from "./LobbySelection.vue";
import BazaarGame from "./BazaarGame.vue";

export default {
    name: "HomeComponent",
    data() {
        return {
        lobby: true,
        room: "",
        socket: {},
        alerts: []
        };
    },
    components: {
        BazaarGame,
        LobbySelection
    },
    methods: {
        createAlert(data) {
            this.alerts.push({
                type: data.type,
                message: data.message,
            });

            setTimeout(() => {
                this.alerts.splice(0, 1);
            }, 3000);
        },
    },
    created() {
        this.socket = io(process.env.VUE_APP_SERVER_IP);
        this.emitter.on('addAlert', (data) => this.createAlert(data))
        this.emitter.on('setLobby', (data) => this.lobby = data)
        this.emitter.on('setRoom', (data) => this.room = data)
    },
    mounted(){
        this.socket.on("alert", data => {
            this.createAlert(data);
        });
    }
}
</script>

<style scoped>
/* Notification */
.alert {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  list-style: none;
  color: #000;
  z-index: 100;
}

.alert-item {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  gap: .5rem;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.alert-item>p {
  margin: 0;
}
</style>