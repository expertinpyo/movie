<template>
  <nav>
    <div class="d-flex">
      <div class="search">
          <SearchBar />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="mx-1" v-if="isLoggedIn">
        <router-link :to="{ name: 'articles'}">
          전체 게시판
        </router-link>
      </div>
      <div v-if="isLoggedIn">
        <router-link class="mx-1" :to="{name: 'articleSecret' }">비밀 게시판</router-link>
      </div>
    </div>

  </nav>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { mapGetters } from 'vuex'

  export default {
    name: 'CommunityNavBar',
    components: {
      SearchBar,
    },
    computed: {
      ...mapGetters(['isLoggedIn', 'currentUser']),
      username() {
        return this.currentUser.username ? this.currentUser.username : 'guest'
      },
    },
  }
</script>

<style>
</style>