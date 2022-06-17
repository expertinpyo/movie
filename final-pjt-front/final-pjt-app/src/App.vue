<template>
  <div id="app">
    <div class="sticky-top" v-if="isStart">
      <NavBar />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'App',
    components: { NavBar },
    methods: {
      ...mapActions(['fetchCurrentUser'])
    },
    computed:{
      ...mapGetters(['isStart'])
    },
    created(){
      this.fetchCurrentUser()
    }
    
  }
</script>

<style>
html, body {
  width: 100%;
  height: 100vh;
  overflow: auto;
  background:url('http://cdn.wallpapersafari.com/13/6/Mpsg2b.jpg');
  margin:0;
  font-family: 'Ubuntu', sans-serif;
	background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

a:hover {
  color: rgb(0, 0, 0) !important
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #e5e285;
}
</style>
