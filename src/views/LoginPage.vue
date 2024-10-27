<template>
    登录页面
    <el-button @click="goHome">
        前往主页
    </el-button>
</template>

<script setup>
    import router from "@/router/index"
    
    const goHome = () => {
        router.push("/home/session");
    }
</script>

<style scoped>

</style>
