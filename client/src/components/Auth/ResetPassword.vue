<template>
  <div>
    <div v-if="$route.params.token" class="rp-container">
      <h2 class="title is-size-3-desktop is-size-4-touch">
        Enter your new password
      </h2>
      <form @submit="onPasswordFormSubmit" class="form">
        <div class="field">
          <label class="label has-text-grey">New password</label>
          <div class="control has-icons-left">
            <input
              class="input"
              v-model="password"
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
          <label class="label has-text-grey">Confirm new password</label>
          <div class="control has-icons-left">
            <input
              class="input"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm password"
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
              class="button is-large is-fullwidth rp-button"
            >
              <p class="is-size-5">Reset Password</p>
            </button>
          </p>
        </div>
      </form>
    </div>

    <div v-else class="rp-container">
      <h2 class="title is-size-3-desktop is-size-4-touch">
        Enter your registered email below
      </h2>
      <form @submit="onEmailFormSubmit" class="form">
        <div class="field">
          <label class="label has-text-grey">Enter registered email</label>
          <div class="control has-icons-left">
            <input
              class="input"
              v-model="email"
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
        <div class="field mt-5">
          <p class="control">
            <button
              type="submit"
              :class="{ 'is-loading': loadingUser }"
              class="button is-large is-fullwidth rp-button"
            >
              <p class="is-size-5">Confirm</p>
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import socially from "../../api/socially";
import { useToast } from 'vue-toastification'

export default {
  name: "Reset Password",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      helpText: "",
      loadingUser: false,
    };
  },
  methods: {
    async onEmailFormSubmit(e) {
      e.preventDefault();

      this.loadingUser = true;
      const toast = useToast();

      try {
        const res = await socially.post("/user/reset-password", { email: this.email });
        toast.success(res.data.msg)
      } catch (error) {
        toast.error(error.response.data.errors.msg)
      }

      this.loadingUser = false;
    },

    async onPasswordFormSubmit(e) {
      e.preventDefault();

      if (this.password !== this.confirmPassword) {
        this.helpText = "Passwords doesn't match";
        this.password = "";
        this.confirmPassword = "";
        return;
      }

      this.loadingUser = true;
      const toast = useToast();

      try{
        await socially.patch("/user/reset-password", { token: this.$route.params.token, newPassword: this.password })
        this.$router.push("/login")
      } catch(error) {
        this.password = ""
        this.confirmPassword = ""
        toast.error(error.response.data.errors.msg);
      }
      this.loadingUser = false;
    },
  },
};
</script>

<style scoped>
.rp-container {
  max-width: 500px;
  padding: 4rem 3rem;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}
.rp-button {
  background-color: #41d1af !important;
  color: white !important;
}
</style>
