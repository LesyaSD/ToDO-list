<template>
  <div class="task-editor">
    <h2>Редактирование задачи с ID: {{ taskId }}</h2>
    <div class="form-group">
      <label for="title">Название задачи:</label>
      <input type="text" id="title" v-model="editedTask.title">
    </div>
    <div class="form-group">
      <label for="description">Описание задачи:</label>
      <textarea id="description" v-model="editedTask.description"></textarea>
    </div>
    <h3>Пункты задачи:</h3>
    <div  v-for="(item, index) in editedTask.items" :key="index" class="task-item">
      <input type="checkbox" v-model="item.completed">
      <label>
        <input type="text" v-model="item.text">
      </label>
    </div>
    <button @click="saveChanges">Сохранить изменения</button>
    <router-link :to="'/'">
      <button>Вернуться к списку задач</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      taskId: null,
      editedTask: {
        title: '',
        description: '',
        items: []
      }
    };
  },
  created() {
    this.taskId = this.$route.params.id;
    this.loadTask();
  },
  methods: {
    loadTask() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        const foundTask = storedTasks.find(task => task.id === parseInt(this.taskId));
        if (foundTask) {
          this.editedTask = { ...foundTask };
        }
      }
    },
    saveChanges() {
      if (!this.editedTask.title || !this.editedTask.description) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      // Сохраняем изменения, включая статус выполнения пунктов задач
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        const index = storedTasks.findIndex(task => task.id === parseInt(this.taskId));
        if (index !== -1) {
          storedTasks[index] = { ...this.editedTask };
          localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
      }
      
      // Переходим обратно к списку задач
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped>
.task-editor {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.task-checkbox {
  margin-right: 10px; /* Добавляем отступ справа для чекбокса */
}

.task-item {
  display: flex; /* Размещаем чекбокс и текст на одной строке */
  align-items: center; /* Выравниваем элементы по вертикали */
}

.task-checkbox:checked + label {
  text-decoration: line-through; /* Зачеркиваем текст, если чекбокс отмечен */
  color: #aaa;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  height: 100px;
}

.task-item {
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:last-child {
  margin-left: 10px;
}
.task-item {
  display: flex; /* Размещаем чекбокс и текст на одной строке */
  align-items: center; 
}

.task-checkbox {
  margin-right: 10px; /* Добавляем отступ справа для чекбокса */
}
</style>
