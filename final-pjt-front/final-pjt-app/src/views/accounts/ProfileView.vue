<template>
  <div>
    <ProfileNavBar :profile="profile" />
    <div class="d-flex col col-6">
      <span v-for="movie in profile.like_movies" :key="movie.pk">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk } }">
          <img :src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path" alt="영화 포스터">
        </router-link>
      </span>
    </div>
  </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileNavBar from '@/components/ProfileNavBar.vue'

export default {
  name: 'ProfileView',
  
  components:{
    ProfileNavBar,
  },
  
  computed: {
    ...mapGetters(['profile', 'movieList', 'currentUser', 'hadNickname']),
    
  },
  methods: {
    ...mapActions(['fetchProfile',]),
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>
<style scoped>
  img {
    width: 70%;
  }
</style>