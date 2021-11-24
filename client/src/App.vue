<template>
  <div class="app-container custom-center">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: hsl(0, 0%, 96%);
}

.app-container {
  max-width: 1500px;
  height: 100vh;
  margin: 0 auto;
}
</style>
