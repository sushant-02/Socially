<template>
  <form @submit="onFormSubmit" class="form">
    <div class="field">
      <label for="" class="label has-text-grey">Name</label>
      <div class="control has-icons-left">
        <input
          class="input"
          v-model="formData.name"
          type="text"
          placeholder="Enter your name"
          oninvalid="this.setCustomValidity('Please enter a name')"
          oninput="this.setCustomValidity('')"
          required
        />
        <span class="icon is-small is-left">
          <FontAwesomeIcon icon="user" />
        </span>
      </div>
    </div>
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
    <div class="field">
      <label class="label has-text-grey">Confirm Password</label>
      <div class="control has-icons-left">
        <input
          class="input"
          v-model="confirmPassword"
          type="password"
          placeholder="Enter password"
          oninvalid="this.setCustomValidity('Please confirm password')"
          oninput="this.setCustomValidity('')"
          required
        />
        <span class="icon is-small is-left">
          <FontAwesomeIcon icon="key" />
        </span>
      </div>
      <p class="help is-danger" style="height: 15px">{{ helpText }}</p>
    </div>
    <div class="field mt-5">
      <p class="control">
        <button
          type="submit"
          :class="{ 'is-loading': loadingUser }"
          class="button is-large is-fullwidth register-button"
        >
          <p class="is-size-5">Create an account</p>
        </button>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      helpText: "",
      loadingUser: false,
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    async onFormSubmit(e) {
      e.preventDefault();

      if (this.formData.password !== this.confirmPassword) {
        this.helpText = "Passwords doesn't match";
        this.formData.password = "";
        this.confirmPassword = "";
        return;
      }

      this.loadingUser = true;
      await this.registerUser(this.formData);

      this.loadingUser = false;

      this.formData.name = "";
      this.formData.email = "";
      this.formData.password = "";
      this.confirmPassword = "";
      this.helpText = "";
    },
  },
};
</script>

<style scoped>
.register-button {
  background-color: #41d1af !important;
  color: white !important;
}
</style>
