<template>
    <div class="login-container">
        <el-form ref="ruleFormRef" style="max-width: 600px; min-width: 300px" :model="ruleForm" :rules="rules"
            label-width="auto" class="demo-ruleForm" hide-required-asterisk>
            <div style="text-align: center; margin-bottom: 10px; color: #509dfd; font-size: large;">
                xxx系统登录
            </div>
            <el-form-item label="账号:" prop="account">
                <el-input v-model="ruleForm.account" placeholder="输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-link type="primary" underline @click="router.push('/findPassword')">
                忘记密码<el-icon class="el-icon--right">
                    <Right />
                </el-icon>
            </el-link>
            <span style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="router.push('/register')">注册</el-button>
            </span>
        </el-form>
    </div>
    <el-button type="success" @click="fakeLogin">
        测试专用跳过登录
    </el-button>
</template>

<script setup>
import router from "@/router/index"
import { ElMessage } from "element-plus";
import { getCurrentInstance, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();

// 表单验证
const ruleFormRef = ref()
const ruleForm = reactive({
    account: "",
    password: "",
})
const rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" }
    ],
}
// 提交表单前验证
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 表单合法则发起登录请求
            login();
        }
    })
}
// 登录请求
const login = async () => {
    await fetch(proxy.$baseUrl + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            account: ruleForm.account,
            password: md5(ruleForm.password)
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.code && data.code == 200) {
                localStorage.setItem("token", data.data);
            } else {
                ElMessage.error("登录失败");
            }
        })
    // 测试token是否有效
    if (localStorage.getItem("token")) {
        await fetch(proxy.$baseUrl + "/users/welcome", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code && data.code == 200) {
                    localStorage.setItem("userId", data.data.userId);
                    localStorage.setItem("userName", data.data.username);
                    ElMessage.success("登录成功");
                    router.push("home/session");
                } else {
                    ElMessage.error("登录失败");
                }
            })
    }
}
// 测试专用跳过登录
const fakeLogin = () => {
    localStorage.setItem("token", "123");
    router.push('/home/session');
}

</script>

<style scoped>
.login-container {
    padding: 100px 0 0 0;
    display: flex;
    justify-content: center;
}

.el-form {
    padding: 20px;
    border: 2px solid var(--el-border-color);
    border-radius: 10px;
    box-shadow: var(--el-box-shadow-dark);
}
</style>
