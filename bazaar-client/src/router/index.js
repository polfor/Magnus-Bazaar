import { createRouter, createWebHistory} from 'vue-router';
import Home from '@/components/HomeComponent.vue'
import ReglesDuJeu from '@/views/ReglesDuJeu.vue';
import Communication from '@/views/Communication.vue';

const routes = [
    {
        name:'Home',
        path:'/',
        component: Home,
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