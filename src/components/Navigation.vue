<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
        :default-active="router.currentRoute.value.fullPath" text-color="#fff" router style="width:100%; height:100%">
        <el-menu-item index="/home/session">
            <el-icon>
                <ChatDotRound />
            </el-icon>
            <span>新建会话</span>
        </el-menu-item>
        <el-menu-item index="/home/history">
            <el-icon>
                <FolderOpened />
            </el-icon>
            <span>历史会话</span>
        </el-menu-item>
        <el-menu-item index="/home/favorites">
            <el-icon>
                <Star />
            </el-icon>
            <span>收藏夹</span>
        </el-menu-item>
        <el-menu-item index="/home/setting">
            <el-icon>
                <Setting />
            </el-icon>
            <span>设置</span>
        </el-menu-item>
        <el-menu-item index="/home/userInfo">
            <el-icon>
                <User />
            </el-icon>
            <span>个人信息</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import router from '@/router/index';
</script>