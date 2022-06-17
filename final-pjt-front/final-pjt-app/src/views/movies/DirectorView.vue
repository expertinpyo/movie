<template>
  <div class="d-flex">
    <div>
      <SearchBar />
    </div>
    <div id="temp" class="flex-column mt-1" style="width=100%; position=fixed;">
      <div>
        <h3>좋아하는 감독의 작품들을 만나보세요</h3>
        <input class="mx-1" type="text" @keyup.enter="directorSearch" v-model="directorName">
        <button @click="directorSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div>
        <DirectorMovieList v-for="director in directorList" :key="director.pk" :director="director" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import DirectorMovieList from '@/components/DirectorMovieList.vue'

export default {
  name: 'DirectorView',
  components: { SearchBar, DirectorMovieList
  },
  data: function(){
    return {
      directorName: '',
    }
  },
  computed:{
    ...mapGetters(['directorList']),
    
  },
  methods: {
    ...mapActions(['fetchDirectorAll', 'fetchDirector']),
    directorSearch: function(){
      this.fetchDirector(this.directorName)
    }
  },
  created(){
    this.fetchDirectorAll()
  },
}
</script>

<style scoped>
  input {
    border-style: solid;
    border-width: 2px;
  }

</style>