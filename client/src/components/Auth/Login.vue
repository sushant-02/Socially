<template>
  <div class="auth-container">
    <div class="wrapper custom-center">
      <div class="register-container columns">
        <SociallyDetails />
        <div class="column container-right custom-center">
          <section class="right-wrapper">
            <section class="right-header">
              <h1 class="title is-size-3-desktop is-size-4-touch">
                Sign In to <span class="socially-ly">Social</span>ly.
              </h1>
              <p class="content has-text-grey">
                Don't have an account?
                <router-link to="/register" class="login-link">Create an account</router-link>
              </p>
            </section>
            <section class="register-form mb-5">
              <LoginForm />
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SociallyDetails from "../SociallyDetails/SociallyDetails.vue";
import LoginForm from "./LoginForm.vue";

export default {
  name: "Login",
  components: {
    SociallyDetails,
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>
.auth-container {
  width: 95%;
  height: 95%;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  overflow: auto;
}

.wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
}

.register-container {
  width: 100%;
  height: 100%;
}

.container-left {
  padding-top: 2rem;
  padding-left: 3rem;

  & .image-container {
    width: 70%;
    height: 70%;
    margin-left: 5rem;

    & img {
      width: 100%;
    }
  }
}

.header-text {
  width: 50%; 
}

.container-right {
  background-color: #c2e9fb3b;

  & .right-wrapper {
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}

@media only screen and (max-width: 770px) {
  .image-container {
    display: none;
  }

  .container-left .header-text {
    width: 100%; 
  }

  .container-right {
    margin-top: 1rem;
  }

  .right-wrapper {
    padding-top: 2rem;
  }

  .right-header {
    margin-bottom: 2rem;
  }
}

@media only screen and (min-width: 770px) {
  .auth-container {
    height: 95%;
  }
}
</style>
