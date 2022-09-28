<template>
  <div :style="styles.container">
    <form :style="styles.form">
      <input
        autoComplete="off"
        placeholder="Your name"
        :style="styles.input"
        type="text"
      />
      <button disabled="{submitting}" :style="styles.button" type="submit" @click="submit">
        Join
      </button>
    </form>
  </div>
</template>

<script>
import { loginStyle } from '@/constants/styles';
// import { login } from '@/data/actions';

export default {
  data() {
    return {
      styles: loginStyle,
    };
  },
  components: {},
  methods: {
    submit({username}) {
      // dispatch(login({ username }));
      console.log(username)
    }
  }
};
</script>

<style lang=""></style>
