<template>
  <div>
    <div v-if="this.cnt === 1">
      <h1></h1>
      <input type="text">
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'QuestionList',
  data: function(){
    return {
      cnt: 1,
      data: {
        'genre': '',
        'actor': '',
        'director': '',
        'movieType': '',
      }
    }
  },
  computed:{
    ...mapGetters(['questionList']),

  },
  methods: {
    ...mapActions(['SaveQuestionResult']),
    cntPlus: ()=>{
      this.cnt += 1
    }
  }
}
</script>

<style>

</style>