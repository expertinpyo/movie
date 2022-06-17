<template>
  <div class="d-flex">
    <div>
      <SearchBar />
    </div>
    <v-container>
    <div class="justify-content-center" style="width=100%">
      <h3>영화의 제목을 검색해보세요</h3>
      <input class="mx-1" type="text" @keyup.enter="titleSearch" v-model="titleName">
      <button @click="titleSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
        <v-row class="g-4">
          <v-col
            v-for="movie in titleList" 
            :key="movie.pk"
            cols="12"
            sm="3"
          >
            <v-card>
              <MovieListItem :movie="movie" :key="movie.pk" />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import MovieListItem from '@/components/MovieListItem.vue'

export default {
  name: 'TitleView',
  components: { 
    SearchBar,
    MovieListItem
  },
  data: function(){
    return {
      titleName: '',
    }
  },
  computed:{
    ...mapGetters(['titleList', ]),
    
  },
  methods: {
    ...mapActions(['fetchTitle', 'fetchTitleAll']),
    titleSearch: function(){
      this.fetchTitle(this.titleName)
    }
  },
  created(){
    this.fetchTitleAll()
  },
}
</script>

<style lang="scss" scoped>
  .v-card {
    height: 400px;
  }
  input {
    border-style: solid;
    border-width: 2px;
  }
</style>