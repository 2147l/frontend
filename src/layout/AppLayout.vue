<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="row">
          <div>xxx系统</div>
          <div style="flex:1"></div>
          <div>xxx昵称</div>
          <!--头像以及下拉菜单-->
          <div>
            <el-dropdown>
              <el-avatar :src="avatarUrl" :size="30" :style="{ right: '0' }"/>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goSetting">设置</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container :style="{ paddingTop: '60px' }">
        <el-aside>
          <Navigation></Navigation>
        </el-aside>
        <el-main :style="{ paddingLeft: '200px' }">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import router from '@/router/index';

const avatarUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const goSetting = () => {
  router.push('/home/setting')
}
// 退出登录
// TODO：清除token
const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  width: 200px;
  height: 100%;
  position: fixed;
}

.el-header {
  height: 60px;
  width: 100%;
  background-color: #555c64;
  align-content: center;
  position: fixed;
  z-index: 100;
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