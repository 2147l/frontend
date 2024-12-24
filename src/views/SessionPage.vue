<template>
  <div class="wrapper">
    会话页面
    <div class="messages">
      <div v-for="(item, index) in state.list" :key="index" class="content">
        <div v-if="item.role === 'user'" class="sent">
          <div class="sent-bubble">
            <div class="message-content">
              <span v-if="item.type === 'text'">{{ item.content }}</span>
              <div v-if="item.type === 'audio'" @click="playAudio(item.other)">
                <span class="audio-message">语音消息 (点击播放)</span>
              </div>
            </div>
          </div>
          <el-avatar :src="avatarUrl" :size="30" :style="{ right: '0' }" />
        </div>
        <div v-if="item.role === 'assistant'" class="received">
          <el-avatar :size="30" :style="{ right: '0' }">系统</el-avatar>
          <div class="received-bubble">
            <div class="message-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <el-button @click="toggleRecording" icon="Microphone" circle :type="isRecording ? 'primary' : 'default'" />
      <el-input v-model="state.input" style="width: 600px" placeholder="给系统发送消息" @keyup.enter="sendMessage">
        <template #append>
          <el-button @click="sendMessage">发送</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { Microphone } from '@element-plus/icons-vue'
import router from "@/router/index"
const { proxy } = getCurrentInstance();
const state = reactive({
  input: '',
  list: []
});
const conversationId = ref("");

const avatarUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

const sendMessage = async () => {
  if (state.input.trim() === '') return; // 如果输入为空则不发送

  const params = {
    userId: localStorage.getItem("userId"),
    content: state.input,
    defaultSystem: "",
  }
  // 如果没有会话标题就使用第一个问题作为会话标题
  if (conversationId.value) {
    params.conversationId = conversationId.value;
  } else {
    conversationId.value = state.input;
    params.conversationId = state.input;
  }

  // 向后端发送消息
  let result = "";
  await fetch(proxy.$baseUrl + "/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.code && data.code == 200) {
        result = data.message;
      } else {
        ElMessage.error("发送失败");
      }
    });

  // 系统回复
  if (result.length > 0) {
    state.list.push({
      content: state.input,
      time: new Date().toLocaleTimeString(),
      role: 'user',
      type: 'text',
      other: '',
    });
    state.list.push({
      content: result,
      time: new Date().toLocaleTimeString(),
      role: 'assistant',
      type: 'text',
      other: '',
    });
    state.input = ''; // 清空输入框
  }
};

let mediaRecorder = null;
let audioChunks = [];
const audioUrl = ref(null);
const isRecording = ref(false);

const toggleRecording = async () => {
  if (isRecording.value) {
    // 停止录音
    mediaRecorder.stop();
    isRecording.value = false;
  } else {
    // 开始录音
    audioChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrlValue = URL.createObjectURL(audioBlob);

      // 保存音频 URL
      audioUrl.value = audioUrlValue;

      // 添加到消息列表
      const message = {
        other: audioUrl.value, // 音频 URL
        content: '语音消息',
        time: new Date().toLocaleTimeString(),
        role: 'user',
        type: 'audio'
      };
      state.list.push(message);
    };

    mediaRecorder.start();
    isRecording.value = true;
  }
};

// 播放语音消息
const playAudio = (audioUrl) => {
  const audio = new Audio(audioUrl);  // 创建一个新的Audio对象

  // 播放音频
  audio.play().catch(err => {
    console.error("播放失败：", err);
    ElMessage.error("音频播放失败");
  });
};

onMounted(() => {
  if (router.currentRoute.value.query.id) {
    conversationId.value = router.currentRoute.value.query.id;
    fetch(proxy.$baseUrl + "/chat" + "?userId=" + localStorage.getItem("userId") + "&conversationId=" + conversationId.value, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        if (data.code && data.code == 200 && data.chatMessages) {
          for (let i of data.chatMessages) {
            state.list.unshift({
              content: i.content,
              role: i.messageType,
              type: 'text'
            });
          }
        }
      })
  }
})

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
  margin-left: auto;
  word-break: break-word;
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
  word-break: break-word;
}

.message-content {
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.input-area {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  z-index: 50;
}

/* 语音消息的样式 */
.audio-message {
  text-decoration: underline;
  cursor: pointer;
  color: #007bff;
}

.audio-message:hover {
  color: #0056b3;
}
</style>
