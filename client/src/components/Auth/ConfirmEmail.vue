<template>
  <div class="ce-container">
    <div class="wrapper">
      <h1 class="title is-size-3-desktop is-size-4-touch">
        Welcome to <span class="socially-ly">Social</span>ly.
      </h1>
      Please check your email and follow the link to confirm your email.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Confirm Email",
  computed: mapGetters(["getAuthflow"]),
  created() {
    if (this.getAuthflow === false) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.ce-container {
  width: 600px;
  height: 400px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>
