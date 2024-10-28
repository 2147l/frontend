<template>
    <div class="register-container">
        <el-form ref="ruleFormRef" style="max-width: 600px; min-width: 350px; height: fit-content" :model="ruleForm"
            :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>
            <div style="text-align: center; margin-bottom: 10px; color: #509dfd; font-size: large;">
                xxx系统注册
            </div>
            <el-form-item label="昵称:" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="confirmPassword">
                <el-input type="password" v-model="ruleForm.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-link type="primary" underline @click="router.push('/login')">
                已有账号去登录<el-icon class="el-icon--right">
                    <Right />
                </el-icon>
            </el-link>
            <span style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
                <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </span>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router/index"
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { onBeforeMount, reactive, ref } from "vue";
// 表单验证
interface RuleForm {
    username: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    code: string,
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    code: "",
})
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback()
    } else if (value.length < 6 || value.length > 18) {
        callback(new Error("密码应为6到18位"))
    } else if (!/^\w+$/.test(value)) {
        callback(new Error("只能包含数字、字母以及下划线"))
    } else {
        callback()
    }
}
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("再次输入密码"))
    } else if (value !== ruleForm.password) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 10, message: "昵称应为2到10位", trigger: ["change", "blur"] },
    ],
    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, message: "邮箱地址不合法", trigger: "blur" },
    ],
    phone: [
        { pattern: /^1\d{10}$/, message: "手机号码不合法", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator: validatePassword, trigger: ["change", "blur"] },

    ],
    confirmPassword: [
        { required: true, validator: validateConfirmPassword, trigger: "blur" },
    ],
})
// 提交表单前验证
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 表单合法则发起注册请求
            // register();
            ElMessage({ message: "注册成功", type: "success" });
            router.push("/login");
        }
    })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// 注册请求
const register = () => {
    fetch("http://127.0.0.1/8080/user/register", {
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
.register-container {
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
