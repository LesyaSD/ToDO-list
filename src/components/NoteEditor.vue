<script>
export default {
  props: ['task'],
  data() {
    return {
      editedTask: {
        title: this.task ? this.task.title : '',
        description: this.task ? this.task.description : ''
      }
    };
  },
  methods: {
    saveChanges() {
      // Проверяем, что оба поля title и description заполнены
      if (!this.editedTask.title || !this.editedTask.description) {
        alert('Please fill in both title and description');
        return;
      }

      // Создаем объект для сохранения изменений
      const editedTask = {
        id: this.task.id,
        title: this.editedTask.title,
        description: this.editedTask.description
      };

      // Отправляем событие, чтобы главный компонент (App.vue) мог сохранить изменения задачи
      this.$emit('saveChanges', editedTask);
    },
    cancelEditing() {
      // Отправляем событие, чтобы главный компонент (App.vue) мог отменить редактирование
      this.$emit('cancelEditing');
    }
  }
}
</script>
