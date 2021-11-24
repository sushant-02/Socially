<template>
  <Register />
</template>

<script>
import Register from "../components/Auth/Register.vue";
import { mapGetters } from 'vuex';

export default {
  name: "RegisterPage",
  components: { Register },
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
