<template>
  <Register />
</template>

<script>
import Register from "../components/Auth/Register.vue";

export default {
  name: "RegisterPage",
  components: { Register },
  created() {
    if (window.localStorage.getItem("JWT")) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped></style>
