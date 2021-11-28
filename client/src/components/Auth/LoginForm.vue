<template>
  <form @submit="onFormSubmit" class="form mb-6">
    <div class="field">
      <label class="label has-text-grey">Email</label>
      <div class="control has-icons-left">
        <input
          class="input"
          v-model="formData.email"
          type="email"
          placeholder="Enter email"
          oninvalid="this.setCustomValidity('Please enter a valid email')"
          oninput="this.setCustomValidity('')"
          required
        />
        <span class="icon is-small is-left">
          <FontAwesomeIcon icon="at" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label has-text-grey">Password</label>
      <div class="control has-icons-left">
        <input
          class="input"
          v-model="formData.password"
          type="password"
          placeholder="Enter password"
          oninvalid="this.setCustomValidity('Please enter a password')"
          oninput="this.setCustomValidity('')"
          required
        />
        <span class="icon is-small is-left">
          <FontAwesomeIcon icon="lock" />
        </span>
      </div>
    </div>
    <div class="field mt-5">
      <p class="control">
        <button
          type="submit"
          :class="{ 'is-loading': loadingUser }"
          class="button is-large is-fullwidth login-button"
        >
          <p class="is-size-5">Sign In</p>
        </button>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "LoginForm",
  data() {
    return {
      formData: { email: "", password: "" },
      loadingUser: false,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async onFormSubmit(e) {
      e.preventDefault();

      this.loadingUser = true;
      await this.loginUser(this.formData);

      this.loadingUser = false;
      this.showToast();

      this.formData.email = "";
      this.formData.password = "";
    },
    showToast() {
      const toast = useToast();
      toast.error(this.getErrMsg);
    }
  },
  computed: mapGetters(["getErrMsg"]),
};
</script>

<style>
.login-button {
  background-color: #41d1af !important;
  color: white !important;
}
</style>
