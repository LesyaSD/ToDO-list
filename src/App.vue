<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Базовые стили */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
