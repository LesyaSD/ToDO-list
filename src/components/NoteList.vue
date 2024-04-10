<template>
  <div class="container">
    <h1>Список задач</h1>
    <div class="task-form">
      <input v-model="newTask.title" placeholder="Название задачи">
      <textarea v-model="newTask.description" placeholder="Описание задачи"></textarea>
      <input v-model="newTask.item1" placeholder="Пункт 1">
      <input v-model="newTask.item2" placeholder="Пункт 2">
      <input v-model="newTask.item3" placeholder="Пункт 3">
      <button @click="addTask">Добавить задачу</button>
    </div>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <div class="task">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
          <ul>
            <li v-for="(item, index) in task.items" :key="index">
              <input type="checkbox" v-model="item.completed" disabled>
              <span :class="{ 'completed': item.completed }">{{ item.text }}</span>
            </li>
          </ul>
          <div>
            <router-link :to="'/edit/' + task.id">
              <button>Редактировать</button>
            </router-link>
            <button @click="deleteTask(task.id)">Удалить</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        description: '',
        item1: '',
        item2: '',
        item3: ''
      }
    };
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    addTask() {
      if (!this.newTask.title || !this.newTask.item1 || !this.newTask.item2 || !this.newTask.item3) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      const newId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;
      this.tasks.push({
        id: newId,
        title: this.newTask.title,
        description: this.newTask.description,
        items: [
          { text: this.newTask.item1, completed: false },
          { text: this.newTask.item2, completed: false },
          { text: this.newTask.item3, completed: false }
        ]
      });
      this.saveTasks();
      this.clearNewTaskFields();
    },
    deleteTask(id) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.saveTasks();
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        this.tasks = storedTasks;
      }
    },
    clearNewTaskFields() {
      this.newTask.title = '';
      this.newTask.description = '';
      this.newTask.item1 = '';
      this.newTask.item2 = '';
      this.newTask.item3 = '';
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 80%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 20px; /* Добавляем отступ внизу для кнопки */
}

.add-task-btn {
  display: block;
  margin: 20px auto 0; /* Центрируем кнопку по горизонтали и добавляем отступ сверху */
}
.task-form {
  margin-bottom: 20px;
}

.task-form input,
.task-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.task-form button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.task-title {
  color: #000;
  margin-top: 0;
}

.task-description {
  color: #000;
  margin-bottom: 0;
}

.completed {
  text-decoration: line-through;
}
</style>
