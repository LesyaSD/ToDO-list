<script>
export default {
  data() {
    return {
      newTask: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    createTask() {
      // Проверяем, что оба поля title и description заполнены
      if (!this.newTask.title || !this.newTask.description) {
        alert('Please fill in both title and description');
        return;
      }

      // Создаем новую задачу
      const newTask = {
        id: Date.now(),
        title: this.newTask.title,
        description: this.newTask.description
      };

      // Отправляем событие, чтобы главный компонент (App.vue) мог добавить новую задачу в список
      this.$emit('createNewTask', newTask);

      // Очищаем поля после создания задачи
      this.newTask.title = '';
      this.newTask.description = '';
    }
  }
}
</script>
