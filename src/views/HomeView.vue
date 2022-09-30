<template>
  <div class="home">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/chart">Chart</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png" />
    <EmployeeTable msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import EmployeeTable from '@/components/EmployeeTable.vue';

export default {
  name: 'HomeView',
  components: {
    EmployeeTable,
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
  margin-bottom: 2rem;
}

div {
  margin: 0 100px;
}
</style>
