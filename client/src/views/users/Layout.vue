<script>
  import useUserStore from '../../store/useUserStore';
  import { RouterLink } from 'vue-router';
  import dp from "@/assets/person.jpg";

  export default {
    data() {
      return {
        loggedInUser: null,
        defaultImage: dp
      }
    },

    methods: {
      logout: async () => await useUserStore.getState().logout()
    },

    async mounted() {
      this.loggedInUser = await useUserStore.getState().loggedInUser;
      if (this.loggedInUser?.picture && this.loggedInUser?.picture !== "http://placehold.it/32x32") this.defaultImage = this.loggedInUser.picture;
    }
  }
</script>

<template>
  <div class="layout">
    <div class="container">
      <div class="profile-pic">
        <img alt="profile pic" class="profile pic" :src="defaultImage" />
      </div>
      <div class="nav">
        <RouterLink to="/balance">BALANCE</RouterLink>
        <RouterLink to="/edit-user">EDIT</RouterLink>
      </div>
      <slot></slot>
    </div>
  </div>
  <div class="footer">
    <button class="btn -logout" @click="logout">logout</button>
  </div>
</template>

<style>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
    width: 100%;
    height: 100%;
    min-height: 90vh;
    display: grid;
    grid-template-rows: 35% 35px auto;
    gap: 1em;
}

.container > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
}

.container .nav {
  gap: 1em;
}

.nav a {
  width: 40%;
  height: 35px;
  max-width: 130px;
  font-weight: 700;
  background-color: #cacccc;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;  
  border-radius: 3px;
}

.nav a.router-link-active {
  color: #898f8f;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  max-width: 260px;
  max-height: 260px;
  border-radius: 50%;
}

.overview {
  border-top: 1px solid #cacccc;
  padding: 1em 0;
}

.overview label {
  color: #686f6f;
}

.overview .-value {
  font-size: 1.5em;
  font-weight: 600;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer .btn {
    width: 100%;
}

</style>