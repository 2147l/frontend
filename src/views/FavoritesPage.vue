<template>
    <div class="table-container">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="time" label="时间" width="180" />
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

const tableData = [
    {
        "conversationId": "1",
        "time": "2024-12-22T10:00:00",
        "question": "什么是二叉树？",
        "answer": "二叉树是一种数据结构，其中每个节点最多有两个子节点，通常称为左子节点和右子节点。"
    },
    {
        "conversationId": "2",
        "time": "2024-12-22T10:05:00",
        "question": "什么是数据库？",
        "answer": "数据库是一个用于存储、管理和检索数据的系统，可以处理大量数据并提供高效的查询操作。"
    },
    {
        "conversationId": "3",
        "time": "2024-12-22T10:10:00",
        "question": "什么是面向对象编程？",
        "answer": "面向对象编程是一种编程范式，通过将程序分解为对象，每个对象包含数据和操作数据的方法来进行编程。"
    },
    {
        "conversationId": "4",
        "time": "2024-12-22T10:15:00",
        "question": "什么是算法复杂度？",
        "answer": "算法复杂度用于描述算法的性能，通常通过时间复杂度和空间复杂度来衡量，时间复杂度表示算法执行时间随输入规模的增长速度，空间复杂度表示算法所需的内存量。"
    },
    {
        "conversationId": "5",
        "time": "2024-12-22T10:20:00",
        "question": "什么是HTTP协议？",
        "answer": "HTTP（超文本传输协议）是一种用于客户端和服务器之间传输超文本的协议，它是Web应用的基础协议之一。"
    },
    {
        "conversationId": "6",
        "time": "2024-12-22T10:25:00",
        "question": "什么是编程语言中的变量？",
        "answer": "变量是用于存储数据的命名内存位置，可以在程序执行时改变其值。"
    },
    {
        "conversationId": "7",
        "time": "2024-12-22T10:30:00",
        "question": "什么是递归？",
        "answer": "递归是指一个函数在其定义中调用自身，用于解决可以分解为相似子问题的问题。"
    },
    {
        "conversationId": "8",
        "time": "2024-12-22T10:35:00",
        "question": "什么是多态？",
        "answer": "多态是面向对象编程中的一种特性，允许不同的对象以相同的接口调用不同的实现方式。"
    },
    {
        "conversationId": "9",
        "time": "2024-12-22T10:40:00",
        "question": "什么是CSS选择器？",
        "answer": "CSS选择器用于选择HTML元素，从而应用特定的样式规则。常见的选择器包括类选择器、ID选择器和标签选择器等。"
    },
    {
        "conversationId": "10",
        "time": "2024-12-22T10:45:00",
        "question": "什么是JSON格式？",
        "answer": "JSON（JavaScript对象表示法）是一种轻量级的数据交换格式，易于人阅读和编写，同时也易于机器解析和生成。"
    }
]


const handleEdit = (row) => {
    router.push({ path: "/home/session", query: { id: row.conversationId } })
}
</script>

<style scoped>
.table-container {
    margin: 0 50px 0 50px; }
</style>
