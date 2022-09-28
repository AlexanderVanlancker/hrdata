<template>
  <div class="about">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <h1>This is an about page</h1>
    <BarChart />
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'HomeView',
  components: {
    BarChart,
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
