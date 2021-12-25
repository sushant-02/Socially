<template>
  <div class="profileinfoCt custom-center">
    <template v-if="user">
      <div class="profileImgContainer">
        <img class="profileImg" :src="user.profilePhoto" alt="USER PROFILE" />
      </div>
      <div class="details">
        <h1
          class="title is-size-4-desktop is-size-5-touch text-truncate"
          @click="toggleTruncate"
        >
          {{ user.name }}
        </h1>
        <p
          class="subtitle has-text-grey is-size-6-desktop is-size-7-touch text-truncate"
          @click="toggleTruncate"
        >
          {{ user.bio ? user.bio : "No bio provided" }}
        </p>
        <p class="text-truncate" @click="toggleTruncate">
          <span class="has-text-weight-bold">{{ user.followers.length }}</span>
          &nbsp;
          <span class="has-text-weight-semibold has-text-grey">Followers</span>
        </p>
        <p class="text-truncate" @click="toggleTruncate">
          <span class="has-text-weight-bold">{{ user.following.length }}</span>
          &nbsp;
          <span class="has-text-weight-semibold has-text-grey">Following</span>
        </p>
        <button class="button follow-button mt-4">Follow</button>
      </div>
    </template>
    <template v-else>
      <div class="profileImgContainer">
        <img class="profileImg" :src="pli" alt="USER PROFILE" />
      </div>
      <div class="details">
        <h1
          class="title is-size-4-desktop is-size-5-touch text-truncate"
          @click="toggleTruncate"
        >
          Username ashjdf a gsd fyuagr ya bvag sgfh
        </h1>
        <p
          class="subtitle has-text-grey is-size-6-desktop is-size-7-touch text-truncate"
          @click="toggleTruncate"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          sagittis in enim et venenatis ligula.
        </p>
        <p class="text-truncate" @click="toggleTruncate">
          <span class="has-text-weight-bold">2</span>
          &nbsp;
          <span class="has-text-weight-semibold has-text-grey">Followers</span>
        </p>
        <p class="text-truncate" @click="toggleTruncate">
          <span class="has-text-weight-bold">3</span>
          &nbsp;
          <span class="has-text-weight-semibold has-text-grey">Following</span>
        </p>
        <button class="button follow-button mt-4">Follow</button>
      </div>
    </template>
  </div>
</template>

<script>
import pli from "../../assets/onlineConnection.svg";

export default {
  data() {
    return {
      pli: pli,
      user: null,
    };
  },
  methods: {
    toggleTruncate(e) {
      e.target.classList.toggle("text-truncate");
    },
  },
  created() {
    this.$store.dispatch("fetchUserById", this.$route.params.id)
    .then(() => {
      this.user = this.$store.getters.getOtherUser;
      console.log(this.user);
    })
  },
};
</script>

<style lang="scss" scoped>
.profileinfoCt {
  width: 70%;
  justify-content: space-evenly;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.profileImgContainer {
  width: 200px;
  height: 200px;
}
.profileImg {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 50%;
}
.details {
  width: 250px;
  text-align: center;

  & p {
    font-size: 1rem;
  }

  & .text-truncate {
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.follow-button {
  width: 100%;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1.2rem;
  background-color: #41d1af !important;
  color: white !important;
}

@media only screen and (max-width: 800px) {
  .profileinfoCt {
    width: 100%;
  }
  .profileImgContainer {
    width: 150px;
    height: 150px;
  }
  .follow-button {
    padding: 0.5rem;
  }
}

@media only screen and (max-width: 500px) {
  .profileinfoCt {
    flex-direction: column;
  }
  .details {
    margin-top: 1.5rem;
  }
}
</style>
