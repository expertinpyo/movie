<template>
  <div class="d-flex">
    <v-container>
      <h3>{{ recommends.genre_name }}</h3>
      <v-row class="g-4">
        <v-col 
          v-for="movie in recommends.genre_movie"
          :key="movie.pk"
          cols="12"
          sm="3">
            <v-card>
              <MovieListItem :movie="movie" :key="movie.pk" />
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'


export default {
  name: 'RecommendationList',
  components: {
    MovieListItem,

  },
  props: {
    recommends: Object,
  },
}
</script>

<style scoped>
  .v-card {
    height: 400px;
  }
</style>