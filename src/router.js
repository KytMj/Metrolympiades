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
        path: "/game",
        name: "game",
        meta: {
          requiresAuth: true
        },
        component: CreateGamePage
    },
    {
        path: "/games",
        name: "gameList",
        meta: {
          requiresAuth: true
        },
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
        path: "/team",
        name: "team",
        meta: {
          requiresAuth: true
        },
        component: TeamPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    return next();
  }

  if (to.meta.requiresAuth) {
    return next({ name: 'login' });
  }
  next();
});

export default router;
