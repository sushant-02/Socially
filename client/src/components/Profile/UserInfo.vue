<template>
  <div class="profileinfo custom-center">
    <template v-if="user && !edit">
      <span class="icon is-medium mr-4 edit-icon is-clickable" @click="edit = true">
        <FontAwesomeIcon icon="edit" class="fas fa-lg" />
      </span>
      <figure class="profileImgContainer">
        <img class="profileImg" src="../../assets/profileImage.png" />
      </figure>
      <div class="details mt-2">
        <h1
          class="title is-size-4-desktop is-size-5-touch text-truncate"
          @click="toggleTruncate"
        >
          {{ user.name }}
        </h1>
        <p class="subtitle has-text-grey">
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
        <!-- <time datetime="2016-1-1" class="is-size-7">{{format_date(user.createdAt)}}</time> -->
      </div>
    </template>

    <template v-if="!user && !edit">
      Skeleton Loader
    </template>

    <template v-if="edit">
      <h1 class="is-size-4 mb-3">Update Profile</h1>
      <span class="icon is-medium mr-4 edit-icon is-clickable" @click="edit = false">
        <FontAwesomeIcon icon="times" class="fas fa-lg" />
      </span>
      <form @submit="onFormSubmit" class="form mt-3">
        <div class="field">
          <label class="label has-text-grey is-size-6-touch">Name</label>
          <div class="control">
            <input
              v-model="name"
              class="input"
              type="text"
              placeholder="Enter name here"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label has-text-grey is-size-6-touch">Bio</label>
          <div class="control">
            <textarea
              v-model="bio"
              class="textarea has-fixed-size"
              placeholder="Tell something about you"
            ></textarea>
          </div>
        </div>
        <div class="field mt-5">
          <p class="control">
            <button
              type="submit"
              :class="{ 'is-loading': isLoading }"
              class="button is-medium is-fullwidth update-button"
            >
              <p class="is-size-5 is-size-6-touch">Update Profile</p>
            </button>
          </p>
        </div>
      </form>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { timeString } from "../../utils/timeAgo";

export default {
  name: "User Info",
  data() {
    return {
      user: this.getUser,
      edit: false,
      name: "",
      bio: "",
      isLoading: false,
    };
  },
  methods: {
    toggleTruncate(e) {
      e.target.classList.toggle("text-truncate");
    },
    format_date(value) {
      return timeString(value);
    },
    async onFormSubmit(e) {
      e.preventDefault();
      this.isLoading = true;

      this.$store.dispatch("updateUserInfo", {name: this.name, bio: this.bio})
      .then(() => {
        this.user = this.$store.getters.getUser;
        this.isLoading = false;
        this.edit = false;
      })
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created() {
    this.$store.dispatch("fetchUser").then(() => {
      this.user = this.getUser;
      this.name = this.user.name;
      this.bio = this.user.bio;
    });
  },
};
</script>

<style lang="scss" scoped>
.profileinfo {
  width: 100%;
  flex-direction: column;
  position: relative;
}
.edit-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.profileImgContainer {
  width: 50%;
}
.profileImg {
  border: 1px solid black;
  border-radius: 50%;
}
.details {
  width: 100%;
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
.update-button {
  background-color: #41d1af !important;
  color: white !important;
}

@media only screen and (max-width: 800px) {
  .profileImgContainer {
    max-width: 150px;
  }
}
</style>
