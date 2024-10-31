import { createRouter, createWebHistory, RouterView } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/login" },
        { name: "Login", path: "/login", component: () => import("@/views/LoginPage.vue") },
        { name: "Find", path: "/findPassword", component: () => import("@/views/FindPasswordPage.vue") },
        { name: "Register", path: "/register", component: () => import("@/views/RegisterPage.vue") },
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
    ]
})

// 全局路由守卫：本地没有存token，只允许跳转登录，注册以及找回密码页面
router.beforeEach((to, from) => {
    if (!localStorage.getItem("token") && to.name != "Login" && to.name != "Find" && to.name != "Register") {
        alert("请先登录");
        return false;
    }
})

export default router