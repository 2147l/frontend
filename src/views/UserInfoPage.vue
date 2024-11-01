<template>
  <div class="wrapper">
    <el-card style="width: 800px">
      <template #header>
        <div class="card-header">
          <span :style="{ fontSize: '20px' }">基本信息</span>
        </div>
      </template>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">个人资料照片</span>
        <el-avatar :src="userInfo.avatarUrl" :size="60" :style="{ right: '0' }"/>
      </div>
      <el-divider/>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">姓名</span>
        <el-text>{{ userInfo.name }}</el-text>
      </div>
      <el-divider/>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">生日</span>
        <el-text>{{ userInfo.birth }}</el-text>
      </div>
      <el-divider/>
    </el-card>
    <el-card style="width: 800px">
      <template #header>
        <div class="card-header">
          <span :style="{ fontSize: '20px' }">联系信息</span>
        </div>
      </template>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">电子邮件</span>
        <el-text>{{ userInfo.email }}</el-text>
      </div>
      <el-divider/>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">电话</span>
        <el-text>{{ userInfo.phone }}</el-text>
      </div>
    </el-card>
    <el-card style="width: 800px">
      <template #header>
        <div class="card-header">
          <span :style="{ fontSize: '20px' }">安全信息</span>
        </div>
      </template>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">旧密码</span>
        <el-input v-model="passwordInfo.oldPassword" placeholder="请输入旧密码" type="password"
                  :style="{ width: '240px' }"/>
      </div>
      <el-divider/>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">新密码</span>
        <el-input v-model="passwordInfo.newPassword" placeholder="请输入新密码" type="password"
                  :style="{ width: '240px' }"/>
      </div>
      <el-divider/>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">确认密码</span>
        <el-input v-model="passwordInfo.confirmPassword" placeholder="再次输入新密码" type="password"
                  :style="{ width: '240px' }"/>
      </div>
      <el-divider/>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </el-card>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {ElMessage} from 'element-plus'

const userInfo = reactive({
  avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  name: '张三',
  birth: '未设置',
  email: '123456789@szu.com',
  phone: '12388886666',
})
const passwordInfo = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
// 更改密码
// TODO：调用后端接口
const onSubmit = () => {
  if (passwordInfo.oldPassword !== '' && passwordInfo.newPassword !== '' && passwordInfo.confirmPassword !== '') {
    if (passwordInfo.newPassword === passwordInfo.confirmPassword) {
      ElMessage({
        message: '密码修改成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '两次输入的密码不一致',
        type: 'error'
      })
      passwordInfo.oldPassword = ''
      passwordInfo.newPassword = ''
      passwordInfo.confirmPassword = ''
    }
  } else {
    ElMessage({
      message: '请填写完整信息',
      type: 'danger'
    })
  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>