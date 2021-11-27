<template>
  <Login />
</template>

<script>
import Login from "../components/Auth/Login.vue";

export default {
  name: "LoginPage",
  components: {
    Login,
  },
  created() {
    if (window.localStorage.getItem("JWT")) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped></style>
