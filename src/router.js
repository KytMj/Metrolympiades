import { createRouter, createWebHistory } from "vue-router";

import CreateGamePage from './pages/CreateGamePage.vue';                                        
import GameListPage from './pages/GameListPage.vue';
import LeaderBoardPage from './pages/LeaderBoardPage.vue'; //home page
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import TeamPage from './pages/TeamPage.vue';

const routes = [
    {
        path: "/",
        alias: "/leaderboard",
        name: "leaderboard",
        component: LeaderBoardPage
    },
    {
        path: "/game", //besoin de s'authentifier
        name: "game",
        component: CreateGamePage
    },
    {
        path: "/games",  //besoin de s'authentifier
        name: "gameList",
        component: GameListPage
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage
    },
    {
        path: "/team",  //besoin de s'authentifier
        name: "team",
        component: TeamPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;