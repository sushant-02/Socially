<template>
  <Login />
</template>

<script>
import Login from '../components/Auth/Login.vue';
import { mapGetters } from 'vuex';

export default {
  name: "LoginPage",
  components: {
    Login
  },
  computed: mapGetters(['getUser']),
  created() {
    if(this.getUser !== null) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
