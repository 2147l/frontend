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
const tableData = [
    {
        "time": "2024-12-11T10:15:30",
        "question": "What is the capital of France?",
        "answer": "The capital of France is Paris."
    },
    {
        "time": "2024-12-11T10:16:45",
        "question": "Explain polymorphism in Java.",
        "answer": "Polymorphism in Java allows objects to take on many forms, typically through method overriding or interfaces."
    },
    {
        "time": "2024-12-11T10:17:20",
        "question": "What is the square root of 144?",
        "answer": "The square root of 144 is 12."
    },
    {
        "time": "2024-12-11T10:18:05",
        "question": "What are the main principles of OOP?",
        "answer": "The main principles of OOP are encapsulation, inheritance, polymorphism, and abstraction."
    },
    {
        "time": "2024-12-11T10:19:50",
        "question": "Define a binary tree.",
        "answer": "A binary tree is a data structure in which each node has at most two children, referred to as the left child and the right child."
    }
]

const handleEdit = (row) => {
    console.log(row);
}
</script>

<style scoped>
    .table-container {
        margin: 0 50px 0 50px;
    }
</style>
