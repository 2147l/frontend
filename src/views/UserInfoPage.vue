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
        <el-avatar :src="userInfo.avatar" :size="60" :style="{ right: '0' }" />
      </div>
      <el-divider />
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">姓名</span>
        <el-input v-model="userInfo.name" placeholder="未设置" :style="{ width: '240px' }" />
      </div>
      <el-divider />
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">生日</span>
        <el-date-picker v-model="userInfo.birth" type="date" placeholder="未设置" :style="{ width: '240px' }"
          :editable="false" clearable />
      </div>
      <el-divider />
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">电子邮件</span>
        <el-input v-model="userInfo.email" placeholder="未设置" :style="{ width: '240px' }" />
      </div>
      <el-divider />
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">电话</span>
        <el-input v-model="userInfo.phone" placeholder="未设置" :style="{ width: '240px' }" />
      </div>
      <el-divider />
      <el-button type="primary" @click="onSubmitUserInfo">确认修改</el-button>
    </el-card>
    <el-card style="width: 800px">
      <template #header>
        <div class="card-header">
          <span :style="{ fontSize: '20px' }">安全信息</span>
        </div>
      </template>
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">旧密码</span>
        <el-input v-model="passwordInfo.oldPassword" placeholder="请输入旧密码" type="password" :style="{ width: '240px' }" />
      </div>
      <el-divider />
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">新密码</span>
        <el-input v-model="passwordInfo.newPassword" placeholder="请输入新密码" type="password" :style="{ width: '240px' }" />
      </div>
      <el-divider />
      <div class="list-item">
        <span :style="{ display: 'block', width: '120px' }">确认密码</span>
        <el-input v-model="passwordInfo.confirmPassword" placeholder="再次输入新密码" type="password"
          :style="{ width: '240px' }" />
      </div>
      <el-divider />
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </el-card>
    <el-card style="width: 800px">
      <template #header>
        <div class="card-header">
          <span :style="{ fontSize: '20px' }">注销账号</span>
        </div>
      </template>
      <el-button type="danger" @click="dialogVisible = true">确认注销</el-button>
    </el-card>
  </div>
  <!-- 注销窗口 -->
  <el-dialog v-model="dialogVisible" @closed="resetUnsubForm(unsubFormRef)" title="警告！你正在注销账号" width="500" align-center>
    <span style="color: #f16d6d;">输入账号和密码以确认</span>
    <template #footer>
      <div class="dialog-footer">
        <el-form :model="unsubForm" ref="unsubFormRef" label-width="auto" style="padding: 10px" hide-required-asterisk>
          <el-form-item label="账号" prop="account" :rules="{ required: true, message: '请输入账号', trigger: 'blur' }">
            <el-input v-model="unsubForm.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
            <el-input v-model="unsubForm.password" type="password" />
          </el-form-item>
        </el-form>
        <el-button @click="submitUnsubForm(unsubFormRef)">确认</el-button>
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import md5 from "@/utils/md5.js"
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { ElMessage } from 'element-plus';
import router from "@/router";
const { proxy } = getCurrentInstance();

const dialogVisible = ref(false);
const userInfo = reactive({
  avatar: "",
  name: "",
  birth: "",
  email: "",
  phone: "",
  // avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  // name: '张三',
  // birth: '未设置',
  // email: '123456789@szu.com',
  // phone: localStorage.getItem("userName") || '12388886666',
})
// 更改个人信息
const onSubmitUserInfo = () => {
  let params = {
    id: localStorage.getItem("userId"),
  };
  if (userInfo.name !== "") {
    params.username = userInfo.name;
  } else {
    ElMessage.warning("姓名不能为空");
    return;
  }
  if (userInfo.birth !== "")
    params.birth = userInfo.birth;
  if (userInfo.email !== "")
    params.email = userInfo.email;
  if (userInfo.phone !== "")
    params.phone = userInfo.phone;

  fetch(proxy.$baseUrl + "/users/updateUserInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(data => {
      if (data.code && data.code == 200) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    })
}

onMounted(() => {
  fetch(proxy.$baseUrl + "/users/userInfo/" + localStorage.getItem("userId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.code && data.code == 200) {
        userInfo.avatar = data.data.avatar || "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
        userInfo.name = data.data.username || "";
        userInfo.birth = data.data.birth || "";
        userInfo.email = data.data.email || "";
        userInfo.phone = data.data.phone || "";
      }
    })
})

const passwordInfo = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
// 更改密码
const onSubmit = () => {
  if (passwordInfo.oldPassword !== '' && passwordInfo.newPassword !== '' && passwordInfo.confirmPassword !== '') {
    if (passwordInfo.newPassword === passwordInfo.confirmPassword) {
      fetch(proxy.$baseUrl + "/users/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          oldPassword: md5(passwordInfo.oldPassword),
          confirmNewPassword: md5(passwordInfo.newPassword)
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.code && data.code == 200) {
            ElMessage.success("密码修改成功");
          } else {
            ElMessage.error("修改失败");
          }
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

// 注销账号
const unsubFormRef = ref();
const unsubForm = reactive({
  account: "",
  password: "",
});
// 提交表单前校验
const submitUnsubForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 表单合法则发起注销请求
      fetch(proxy.$baseUrl + "/users/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: "account=" + unsubForm.account + "&password=" + md5(unsubForm.password)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code && data.code == 200) {
            ElMessage.success("注销成功");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            router.push("/login");
          } else {
            ElMessage.error("注销失败");
          }
        })
    }
  })
}
// 重置表单
const resetUnsubForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
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