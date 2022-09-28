<template>
  <div class="about">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <h1>This is an about page</h1>
    <BarChart2 />
  </div>
</template>

<script>
import BarChart2 from '@/components/BarChart2.vue';

export default {
  name: 'HomeView',
  components: {
    BarChart2,
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
