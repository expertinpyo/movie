<template>
  <div class="d-flex">
    <div>
      <SearchBar />
    </div>
    <div class="justify-content-center flex-column mt-1" style="width: 100%;">
      <div>
        <h3>좋아하는 배우를 검색해보세요</h3>
        <input class="mx-1" type="text" @keyup.enter="actorSearch" v-model="actorName">
        <button @click="actorSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div>
        <ActorMovieList v-for="actor in actorList" :key="actor.pk" :actor="actor" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import ActorMovieList from '@/components/ActorMovieList.vue'

export default {
  name: 'ActorsView',
  components: { 
    SearchBar,
    ActorMovieList,
  },
  data: function(){
    return {
      actorName: '',
    }
  },
  computed:{
    ...mapGetters(['actorList']),
    
  },
  methods: {
    ...mapActions(['fetchActorsAll', 'fetchActors']),
    actorSearch: function(){
      this.fetchActors(this.actorName)
    }
  },
  created(){
    this.fetchActorsAll()
  },
}
</script>

<style scoped>
  input {
    border-style: solid;
    border-width: 2px;
  }
</style>