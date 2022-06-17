<template>
  <div>
    <p class="mt-3" style="font-size:2rem">Movies</p>
    <div class="d-flex">
      <div class="search">
        <SearchBar />
      </div>
      <div class="mainMovie">
        <v-container class="pa-3 text-center">
            <vue-glide v-if="movieList.length"
              class="glide__track"
              data-glide-el="track"
              ref="slider"
              type="carousel"
              :autoplay= 1000
              :hoverpause="true"
              :breakpoints="{3000: {perView: 5}, 1100: {perView: 3}, 600: {perView: 2},}"
            >
              <vue-glide-slide 
                v-for="movie in movieList" 
                :key="movie.pk">
                <MovieListItem
                  :movie="movie"
                />
              </vue-glide-slide>
            </vue-glide>
        </v-container>
      </div>
    </div>  
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import MovieListItem from '@/components/MovieListItem.vue'
import { Glide, GlideSlide } from 'vue-glide-js'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MovieListsView',
  components: { 
    SearchBar,
    MovieListItem,
    [Glide.name]: Glide,          
    [GlideSlide.name]: GlideSlide,
  },
  data() {
    return{
      hover: false,
    }
  },
  computed:{
    ...mapGetters(['movieList']),
    
  },
  methods: {
    ...mapActions(['fetchMovieList']),
  },
  created(){
    this.fetchMovieList()
  },


}
</script>

<style scoped>
  .mainMovie {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>