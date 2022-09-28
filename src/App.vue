<template>
  <div>
    <NavBar />
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <EmployeeTable msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import EmployeeTable from './components/EmployeeTable.vue'
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    EmployeeTable,
    NavBar
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 100px;
  margin-top: 60px;
}
</style>

<style scoped>
  img {
    max-width: 100px;
    margin-bottom: 2rem;
  }
</style>