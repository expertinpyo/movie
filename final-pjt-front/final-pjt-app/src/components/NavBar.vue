<template>
  <nav class="d-flex justify-content-between align-items-center">
    <div class="d-flex">
      <div>
        <img src="@/assets/logo/logo2.png" alt="logo-img">
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <div class="mx-1" v-if="!isLoggedIn">
        <router-link :to="{ name: 'login' }"><i class="fa-solid fa-person-running"></i> Login</router-link> 
      </div>
      <div class="mx-1" v-if="!isLoggedIn">
        <router-link :to="{ name: 'signup' }"><i class="fa-solid fa-user-plus"></i> Signup</router-link> 
      </div>
      <div class="mx-1" v-if="isLoggedIn">
        <router-link :to="{ name: 'movies'}"><i class="fa-solid fa-house-chimney-user"></i> Home</router-link>
      </div>
      <div v-if="isLoggedIn">
        <router-link class="mx-1" :to="{name: 'articles' }"><i class="fa-solid fa-people-roof"></i> Community</router-link>
      </div>
      <div class="mx-1" v-if="isLoggedIn">
        <router-link :to="{ name: 'profile', params: { username } }"><i class="fa-solid fa-person"></i> MyProfile
        </router-link>
      </div>
      <div class="mx-1" v-if="isLoggedIn">
        <router-link :to="{ name: 'logout' }"><i class="fa-solid fa-person-running"></i> Logout</router-link>
      </div>
      <div v-if="isAdmin && isLoggedIn">
        <a href="http://127.0.0.1:8000/admin/">관리자 페이지</a>
      </div>
      <div>
        <button class="btn ms-1" @click="toBack"><i class="fa-solid fa-arrow-left"></i> Back</button> 
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(['isLoggedIn', 'currentUser',]),
      username() {
        return this.currentUser.username ? this.currentUser.username : 'guest'
      },
      isAdmin(){
        if (this.currentUser.is_superuser){
          return true
        } else{
          return false
        }
      }
    },
    methods:{
      toBack(){
        return this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  nav {
    background: black;
    height: 80px;
  }

  img {
    width: 90px;
  }

  a {
    text-decoration: none;
    color: orange
  }

  button {
    color: orange
  }
</style>