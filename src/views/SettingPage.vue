<template>
  设置页面
  <div class="wrapper">
    <el-card style="width: 800px">
      <template #header>
        <div class="card-header">
          <span :style="{ fontSize: '20px' }">聊天记录设置</span>
        </div>
      </template>
      <el-radio-group v-model="radio1">
        <el-radio value="1" size="large">保存聊天记录</el-radio>
        <el-radio value="2" size="large">不保存聊天记录</el-radio>
      </el-radio-group>
      <div v-if="radio1 === '1'">
        <el-radio-group v-model="radio2">
          <el-radio value="1" size="large">保存一周内</el-radio>
          <el-radio value="2" size="large">保存一月内</el-radio>
          <el-radio value="3" size="large">不限时间</el-radio>
        </el-radio-group>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue"

const radio1 = ref('1')
const radio2 = ref('3')
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>
