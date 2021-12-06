<template>
  <section class="column container-left">
    <div class="header">
      <h1 class="title is-size-2-desktop is-size-3-touch is-unselectable">
        <span class="title-text-ly">Social</span>ly.
      </h1>
      <p class="content has-text-grey is-size-6">
        Connect with your Friends and <br />Create memories
      </p>
    </div>
    <section class="image-container custom-center">
      <img src="../../assets/onlineConnection.svg" alt="" />
    </section>
  </section>
</template>

<script>
export default {
  name: "SociallyDetails"
};
</script>

<style lang="scss" scoped>
.title-text-ly {
  color: #41d1af;
}

.image-container {
  width: 70%;
  height: 70%;
  margin-left: 10%;

  & img {
    width: 100%;
  }
}

@media only screen and (max-width: 770px) {
  .image-container {
    display: none;
  }
}
</style>
