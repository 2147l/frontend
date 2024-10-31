<template>
    <div class="register-container">
        <el-form ref="ruleFormRef" style="max-width: 600px; min-width: 400px; height: fit-content;" :model="ruleForm"
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
                <el-input v-model="ruleForm.code">
                    <template #append>
                        <el-button :loading="codeButton.loading" :disabled="codeButton.disabled" @click="sendCode"
                            style="width: 100px;">
                            {{ codeButton.text }}
                        </el-button>
                    </template>
                </el-input>
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

<script setup>
import router from "@/router/index"
import { ElMessage } from "element-plus";
import { getCurrentInstance, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();

// 表单验证模块
const ruleFormRef = ref()
const ruleForm = reactive({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    code: "",
})
// 具体校验规则
const rules = {
    username: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 1, max: 10, message: "昵称至多为10位", trigger: ["change", "blur"] },
    ],
    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, message: "请输入正确的邮箱", trigger: ["change","blur"] },
    ],
    phone: [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { pattern: /^1\d{10}$/, message: "请输入正确的手机号码", trigger: ["change", "blur"] },
    ],
    password: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback("请输入密码");
                } else if (value.length < 6 || value.length > 18) {
                    callback("密码应为6到18位");
                } else if (!/^\w+$/.test(value)) {
                    callback("只能包含数字、字母以及下划线");
                } else {
                    callback();
                }
            }, trigger: ["change", "blur"], required: true,
        },
    ],
    confirmPassword: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback("再次输入密码");
                } else if (value !== ruleForm.password) {
                    callback("两次输入不一致");
                } else {
                    callback();
                }
            }, trigger: "blur", required: true,
        },
    ],
    code: [
        { required: true, message: "请输入验证码", trigger: "blur" },
    ]
}

// 验证码模块
const codeButton = reactive({
    text: "发送验证码",
    loading: false,
    disabled: false,
    duration: 60,
    timer: null,
})
// 发送验证码
const sendCode = async () => {
    // 倒计时结束前不能继续请求
    if (codeButton.disabled)
        return;
    // 如果发送成功，则开始倒计时
    const response = await fetch(proxy.$baseUrl + "/users/code");
    const data = await response.json();
    if (data.code && data.code == 200) {
        codeButton.disabled = true;
        codeButton.text = codeButton.duration + "秒后重试";
        // 开启计时器
        codeButton.timer = setInterval(() => {
            codeButton.duration--;
            codeButton.text = codeButton.duration + "秒后重试";
            // 倒计时结束清除计时器
            if (codeButton.duration == 0) {
                clearInterval(codeButton.timer);
                codeButton.duration = 60;
                codeButton.text = "重新发送";
                codeButton.disabled = false;
            }
        }, 1000);
    } else {
        ElMessage.error("发送失败");
    }
}
// 提交表单前校验
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 表单合法则发起注册请求
            register();
        }
    })
}
// 重置表单
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
// 注册请求
const register = () => {
    fetch(proxy.$baseUrl + "users/register", {
        method: "POST",
        body: JSON.stringify(ruleForm),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.code && data.code == 200) {
                ElMessage.success("注册成功");
                router.push("/login");
            } else {
                ElMessage.error("注册失败");
            }
        })
}
</script>

<style scoped>
.register-container {
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
