<template>
  <div class="nav-container custom-center">
    <router-link to="/" class="nav-brand">
      <h1 class="title is-size-3-desktop is-size-4-touch">
        <span class="socially-ly">Social</span>ly.
      </h1>
    </router-link>

    <div class="nav-center control has-icons-left">
      <input class="input" type="text" placeholder="Search here" />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon="search" />
      </span>
    </div>

    <div class="nav-menu">
      <div class="nav-items header-desktop">
        <router-link to="/" class="icon is-medium nav-item">
          <FontAwesomeIcon icon="home" class="fas fa-lg" />
        </router-link>
        <router-link to="/add-post" class="icon is-medium nav-item">
          <FontAwesomeIcon icon="plus-square" class="fas fa-lg" />
        </router-link>
        <router-link to="/profile" class="icon is-medium nav-item">
          <FontAwesomeIcon icon="user-circle" class="fas fa-lg" />
        </router-link>
      </div>

      <div class="nav-items header-dropdown">
        <a
          role="button"
          @click="toggleDropdown"
          class="navbar-burger"
          :class="{ 'is-active': isDropwownActive }"
          aria-label="menu"
          :aria-expanded="isDropwownActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <template v-if="isDropwownActive">
          <div class="header-dd-menu">
            <router-link @click="toggleDropdown" to="/" class="nav-item-dd">
              <span class="icon is-medium mr-4">
                <FontAwesomeIcon icon="home" class="fas fa-lg" />
              </span>
              <p class="is-size-6">Home</p>
            </router-link>
            <router-link
              @click="toggleDropdown"
              to="/add-post"
              class="nav-item-dd"
            >
              <span class="icon is-medium mr-4">
                <FontAwesomeIcon icon="plus-square" class="fas fa-lg" />
              </span>
              <p class="is-size-6">Add Post</p>
            </router-link>
            <router-link
              @click="toggleDropdown"
              to="/profile"
              class="nav-item-dd"
            >
              <span class="icon is-medium mr-4">
                <FontAwesomeIcon icon="user-circle" class="fas fa-lg" />
              </span>
              <p class="is-size-6">Profile</p>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropwownActive: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropwownActive = !this.isDropwownActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid rgba(128, 128, 128, 0.555);
  position: relative;

  & .nav-brand {
    flex: 1;
  }

  & .nav-center {
    flex: 1;
  }

  & .nav-menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  & .nav-item {
    color: black;
    margin-right: 1rem;
  }

  & .nav-item:hover {
    color: #41d1af;
  }
}

.header-desktop {
  display: flex;
}

.header-dropdown {
  display: none;
  z-index: 10;
}

.header-dd-menu {
  position: absolute;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #EDEDED;
}

.nav-item-dd {
  width: 50%;
  color: black;
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
}

@media only screen and (max-width: 750px) {
  .nav-container {
    & .nav-brand {
      flex: 2;
    }

    & .nav-center {
      flex: 3;
    }

    & .nav-menu {
      flex: 1;
    }
  }

  .header-desktop {
    display: none;
  }

  .header-dropdown {
    display: block;
  }
}
</style>
