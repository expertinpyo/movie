<template>
  <v-container>
    <h3>{{ genre.genre_name }}</h3>
    <v-row class="g-4">
      <v-col
        v-for="movie in genre.genre_movie"
        :key="movie.pk"
        cols="12"
        sm="3"
      > 
        <v-card>
          <MovieListItem :key="movie.pk" :movie="movie" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'GenreList',
  components: {
    MovieListItem,
  },
  props: {
    genre: Object,
  },
}
</script>

<style scoped>
  .v-card {
    height: 400px;
  }
</style>