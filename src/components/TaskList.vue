<template>
    <div>
      <div v-for="task in tasks" :key="task.id">
        <input v-model="task.title" placeholder="Task Title">
        <button @click="deleteTask(task.id)">Delete</button>
        <button @click="toggleTaskStatus(task.id)">Toggle Status</button>
      </div>
      <button @click="addTask">Add Task</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['tasks'],
    methods: {
      addTask() {
        this.$emit('addTask');
      },
      deleteTask(taskId) {
        this.$emit('deleteTask', taskId);
      },
      toggleTaskStatus(taskId) {
        this.$emit('toggleTaskStatus', taskId);
      }
    }
  }
  </script>