<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="row">
                    <div>xxx系统</div>
                    <div style="flex:1"></div>
                    <div>xxx昵称</div>
                    <div style="height: 50px; width: 50px; border-radius: 50%; background-color: aqua"></div>
                </div>
            </el-header>
            <el-container>
                <el-aside>
                    <Navigation></Navigation>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<style scoped>
.el-container {
    height: 100vh;
}

.el-aside {
    width: 200px;
}

.el-header {
    height: 60px;
    background-color: #555c64;
    align-content: center;
}

.row {
    color: #ffffff;
    font-size: large;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>