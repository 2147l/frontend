import { createRouter, createWebHistory, RouterView } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: ()=>import("@/views/LoginPage.vue")},
        {
            path: "/home",
            component: () => import("@/layout/AppLayout.vue"),
            children: [
                {
                    path: "session",
                    component: () => import("@/views/SessionPage.vue")
                },
                {
                    path: "history",
                    component: () => import("@/views/HistoryPage.vue")
                },
                {
                    path: "favorites",
                    component: () => import("@/views/FavoritesPage.vue")
                },
                {
                    path: "setting",
                    component: () => import("@/views/SettingPage.vue")
                },
                {
                    path: "userInfo",
                    component: () => import("@/views/UserInfoPage.vue")
                },
            ]
        },
        { path: "/login", component: () => import("@/views/LoginPage.vue") },
        { path: "/register", component: () => import("@/views/RegisterPage.vue") }
    ]
})

export default router