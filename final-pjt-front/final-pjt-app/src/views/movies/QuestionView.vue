<template>
  <div>
    <QuestionList />
    <button @click="skip">질문 생략하기</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import QuestionList from '@/components/QuestionList'

export default {
  name: 'QuestionView',
  components: {
    QuestionList,
  },
  computed: {
    ...mapGetters(['questionList'])
  },
  methods: {
    ...mapActions(['SaveQuestionResult']),
    skip: function(){
      this.SaveQuestionResult(this.questionList)
      this.$router.push({name:'movies'})
    }
  }
}
</script>

<style>

</style>