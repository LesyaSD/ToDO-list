// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import NoteList from '../components/NoteList.vue';
import TaskEditor from '../components/TaskEditor.vue';

const routes = [
  { path: '/', component: NoteList },
  { path: '/edit/:id', component: TaskEditor, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
