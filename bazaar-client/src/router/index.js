import { createRouter, createWebHistory} from 'vue-router';
import ReglesDuJeu from '@/views/ReglesDuJeu.vue';
import LobbySelection from '@/components/LobbySelection.vue';
import Communication from '@/views/Communication.vue';

const routes = [
    {
        name:'Home',
        path:'/',
        component: LobbySelection,
    },
    {
        name:'Communication',
        path:'/communication',
        component: Communication,
    },
    {
        name:'ReglesDuJeu',
        path:'/regles',
        component: ReglesDuJeu,
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    }
)

export default router