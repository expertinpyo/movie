<template>
  <div class="d-flex">
    <div>
      <SearchBar />  
    </div>
    <div style="width: 100%;">
      <h3 class="mt-2">보고싶은 장르를 클릭해보세요</h3>
      <div class="d-flex justify-content-center">
        <div class="mx-1" v-for="genre in totalGenreList" :key="genre.pk">
          <button @click="genreSearch(genre)">{{ genre.genre_name }}</button>
        </div>
      </div>
      <GenreList v-for="genre in genreList" :key="genre.pk" :genre="genre" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import GenreList from '@/components/GenreList.vue'

export default {
  name: 'GenreView',
  components: { 
    SearchBar,
    GenreList,
  },
  data: function(){
    return {
      genreName: '',
    }
  },
  computed:{
    ...mapGetters(['genreList', 'totalGenreList']),
    
  },
  methods: {
    ...mapActions(['fetchGenreAll', 'fetchGenre', 'GenreList']),
    genreSearch: function(event){
      this.fetchGenre(event.genre_name)
    }
  },
  created(){
    this.fetchGenreAll()
    this.GenreList()
  },
}
</script>

<style>

</style>