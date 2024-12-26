<template>
    <div class="table-container">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="id" label="标题" width="180" />
            <el-table-column prop="question" label="问题" min-width="180" show-overflow-tooltip />
            <el-table-column prop="answer" label="回答" min-width="180" show-overflow-tooltip />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import router from "@/router/index"
import { getCurrentInstance, onMounted, reactive } from "vue";
const { proxy } = getCurrentInstance();

const tableData = reactive([])

const handleEdit = (row) => {
    router.push({ path: "/home/session", query: { id: row.id } })
}

onMounted(() => {
    fetch(proxy.$baseUrl + "/getConversationIDList" + "?userId=" + localStorage.getItem("userId"), {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            if (data.code == 200 && data.conversations) {
                for (let i of data.conversations){
                    tableData.unshift({
                        id: i.conversationId,
                        question: i.lastUserMessage,
                        answer: i.lastAssistantMessage,
                    })
                }
            }
        })
})
</script>

<style scoped>
.table-container {
    margin: 0 50px 0 50px;
}
</style>
