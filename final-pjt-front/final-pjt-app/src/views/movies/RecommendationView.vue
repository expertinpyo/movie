<template>
  <div class="d-flex">
    <div>
      <SearchBar />
    </div>
    <div>
      <h3 class="mt-2">나를 위한 추천 영화</h3>
      <h3>{{ this.myGenre[currentUser.secretnumber]}}</h3>
      <RecommendationList v-for="(recommends, idx) in recommendation" :key="idx" :recommends="recommends" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import RecommendationList from '@/components/RecommendationList.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'RecommendationView',
  components: {
    RecommendationList,
    SearchBar,
  },
  data: function(){
    return {
      myGenre:{
        1: ['SF', '애니메이션', '음악', '판타지'],
        2: ['가족', '드라마', '로맨스', '모험', '코미디'],
        3: ['다큐멘터리', '범죄', '스릴러', '전쟁', '미스터리'],
      }
    }
  },
  computed:{
    ...mapGetters(['currentUser', 'recommendation',]),
    
  },
  methods: {
    ...mapActions(['fetchRecommendation']),
  },
  created(){
    this.fetchRecommendation(this.currentUser.secretnumber)
  },
}
</script>

<style>

</style>