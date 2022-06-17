<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <SearchBar />
      </div>
      <div class="d-flex" id="main">
        <div class="mx-3 mt-3">
          <img :src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path" alt="영화 포스터">
        </div>
        <div class="mt-3">
          <h2 class="text-start">{{ movie.title }} </h2>
          <div class="overview" style="width:30vw;">
            {{ movie.overview}}
          </div>
          <p>TMDB 평점 : {{movie.vote_average}}</p>
          <p>유저 평점 : {{movie.user_vote_average}} | 총 {{ howMany }}명 평가</p>
          <p>개봉일 : {{ movie.release_date }}</p>
          <div class="d-flex">
            <div>
              <button v-if="(movie.like_users.length === 0) || !movie.like_users.includes(currentUser.pk)" class="btn btn-link" @click="likeMovie(moviePk)"><i class="fa-regular fa-heart" style="color: crimson;"></i></button>
              <!-- <button v-else-if="currentUser.pk in movie.like_users " class="btn btn-link" @click="likeMovie(moviePk)"><i class="fa-solid fa-heart" style="color: crimson;"></i></button> -->
              <button v-else class="btn btn-link" @click="likeMovie(moviePk)"><i class="fa-solid fa-heart" style="color: crimson;"></i></button>
            </div>
            <div class="mt-2">
              <p>좋아요 수 : {{movie.like_count}}</p>
            </div>
          </div>
          <div class="d-flex">
            <p>장르: </p>
            <div class="d-flex">
              <div class="mx-1" v-for="genre in movie.genres" :key="genre.pk">{{ genre.genre_name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <h4> 감독 </h4>
        <div>
          <div v-for="director in movie.director" :key="director.pk">
            <img :src="imageCheck(director)" alt="감독 사진">
            <p>{{ director.director_name }}</p>
          </div>
        </div>
      </div>
      <div>
        <h4> 배우 </h4>
        <div class="d-flex justify-content-center">
          <div v-for="actor in movie.actors" :key="actor.pk" class="mx-1">
            <img class="actorImg" :src="'https://image.tmdb.org/t/p/w500/'+actor.actor_image_path" alt="배우 사진">
            <p>{{ actor.actor_name }}</p>
          </div>
        </div>
      </div>
      <div>
        <ReviewList />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ReviewList from '@/components/ReviewList'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name:'MovieDetailView',
  components:{
    ReviewList,
    SearchBar,
  },
  data(){
    return {
      moviePk: this.$route.params.moviePk,
    }
  },
  computed: {
    ...mapGetters(['movie', 'currentUser']),
    howMany: function(){
      return this.movie.reviews?.length
    }
  },
  methods: {
    ...mapActions(['fetchMovie','likeMovie',]),
    imageCheck: function(director){
      if (director.director_image_path != null){
        return 'https://image.tmdb.org/t/p/w500/'+director.director_image_path
      } else{
        return 'https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png'
      }
    },
  },
  created() {
    this.fetchMovie(this.moviePk)
}
}
</script>

<style scoped>
  img {
    height: 40vh;
  }
  #main {
    width: 70vw;
    
  }
  .overview {
    box-sizing: border-box;
    border: solid black 2px;
  }
  ul {
    list-style:none;
  }
  .actorList {
    float: left;
  }
  .actorImg {
    width: 200px;
  }

</style>