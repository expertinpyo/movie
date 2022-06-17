<template>
    <div class="d-flex mt-3 mx-5">
      <div class="actorImg mx-3 mt-3">
        <img :src="imageCheck" style="height: 400px;" alt="배우 이미지">
        <p style="font-weight:bold; font-size:1rem;">{{ actor.actor_name }}</p>
      </div>

        <v-row class="g-2 mb-3">
          <v-col 
            v-for="movie in actor.actors_movie"
            :key="movie.pk"
            cols="12"
            sm="3"
            >
              <v-card>
                <MovieListItem :key="movie.pk" :movie="movie" />
              </v-card>
          </v-col>
        </v-row>
    </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'ActorMovieList',
  components: {
    MovieListItem,
  },
  props: {
    actor: Object,
  },
  computed: {
    imageCheck : function(){
      if (this.actor.actor_image_path !== null) {
        return 'https://image.tmdb.org/t/p/w500/' + this.actor.actor_image_path
      } else {
        return require('@/assets/no_actor_img.png')
      }
    }
  }
}
</script>

<style scoped>
  .actorImg {
    height: 400px;
  }
  img {
    width: 266px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .v-card {
    height: 400px;
    width: 300px;
  }
</style>