<template>
  <div class="home">
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
</style>
