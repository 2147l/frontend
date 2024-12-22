<template>
  <div class="wrapper">
    会话页面
    <div class="messages">
      <div v-for="(item, index) in state.list" :key="index" class="content">
        <div v-if="item.role === '用户'" class="sent">
          <div class="sent-bubble">
            <div class="message-content">{{ item.content }}</div>
          </div>
          <el-avatar :src="avatarUrl" :size="30" :style="{ right: '0' }" />
        </div>
        <div v-if="item.role === '系统'" class="received">
          <el-avatar :size="30" :style="{ right: '0' }">系统</el-avatar>
          <div class="received-bubble">
            <div class="message-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <el-input v-model="state.input" style="width: 600px" placeholder="给系统发送消息" @keyup.enter="sendMessage">
        <template #append>
          <el-button @click="sendMessage">发送</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { getCurrentInstance, reactive } from 'vue';
const { proxy } = getCurrentInstance();
const state = reactive({
  input: '',
  list: []
});

const avatarUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const sendMessage = async () => {
  if (state.input.trim() === '') return; // 如果输入为空则不发送

  const message = {
    content: state.input,
    time: new Date().toLocaleTimeString(),
    role: '用户'
  };

  // 向后端发送消息
  let result = "";
  await fetch(proxy.$baseUrl + "/chat", {
    method: "POST",
    body: JSON.stringify({
      userId: "",
      conversationId: "",
      content: state.input,
      defaultSystem: ""
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.code && data.code == 200) {
        result = data.message;
      } else {
        ElMessage.error("发送失败");
      }
    })

  // 系统回复
  if (result.length > 0) {
    state.list.push(message);
    state.list.push({
      content: result,
      time: new Date().toLocaleTimeString(),
      role: '系统'
    });
    state.input = ''; // 清空输入框
  }

};

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

.messages {
  width: 600px;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
}

.content {
  display: flex;
  width: 100%;
  margin: 5px 0;
}

.sent {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.sent-bubble {
  background-color: #e1f5fe;
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
  align-self: flex-end;
  /* 右对齐 */
  margin-left: auto;
  /* 将其推到右侧 */
  word-break: break-word;
  /* 确保长单词换行 */
}

.received {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.received-bubble {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
  align-self: flex-start;
  /* 左对齐 */
  word-break: break-word;
  /* 确保长单词换行 */
}

.message-content {
  overflow-wrap: break-word;
  /* 自动换行 */
  white-space: pre-wrap;
  /* 保留空格 */
}

.input-area {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  z-index: 50;
}
</style>
