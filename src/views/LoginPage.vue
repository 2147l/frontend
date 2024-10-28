<template>
    <div class="login-container">
        <el-form ref="ruleFormRef" style="max-width: 600px; min-width: 300px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" hide-required-asterisk>
            <div style="text-align: center; margin-bottom: 10px; color: #509dfd; font-size: large;">
                xxx系统登录
            </div>
            <el-form-item label="账号:" prop="account">
                <el-input v-model="ruleForm.account" placeholder="输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-link type="primary" underline @click="router.push('/findPassword')">
                忘记密码<el-icon class="el-icon--right"><Right /></el-icon>
            </el-link>
            <span style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="router.push('/register')">注册</el-button>
            </span>
        </el-form>
    </div>
    <el-button type="success" @click="router.push('/home/session')">
        跳过登录前往主页
    </el-button>
</template>

<script lang="ts" setup>
import router from "@/router/index"
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
// 表单验证
interface RuleForm {
    account: string,
    password: string,
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    account: "",
    password: "",
})
const rules = reactive<FormRules<RuleForm>>({
    account: [
        { required: true, message: "请输入账号", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" }
    ],
})
// 提交表单前验证
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 表单合法则发起登录请求
            // login();
            ElMessage({ message: "登录成功", type: "success" });
            router.push("/home/session");
        }
    })
}
// 登录请求
const login = () => {
    fetch("http://127.0.0.1/8080/user/login", {
        method: "POST",
        body: JSON.stringify(ruleForm),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

</script>

<style scoped>

.login-container {
    margin: 100px 0 0 0;
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
