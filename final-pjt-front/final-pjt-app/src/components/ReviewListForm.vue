<template>
  <form @submit.prevent="onSubmit" >
    <label for="comment">comment: </label>
    <input type="text" id="comment" v-model="content" required>
  
    <label for="rate">rate: </label>
    <input type="range" id="rate" min="1" max="10" step="1" v-model="user_vote" required>
    <p>{{ user_vote }}</p>    
    <button>Review</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ReviewListForm',
  data(){
    return {
      content: '',
      user_vote: 1,
    }
  },
  computed: {
    ...mapGetters(['movie', 'currentUser']),
  },
  methods:{
    ...mapActions(['createReview']),
    onSubmit(){
      if (!this.movie.user_review.includes(this.currentUser.pk)){
        this.createReview({moviePk:this.movie.id, content:this.content, user_vote:this.user_vote,})
      } else{
        alert('중복 리뷰는 불가능합니다.')
        this.content = ''
        this.user_vote = ''
      }
      
  }
  }
}
</script>

<style>
  input {
    border-style: solid;
    border-width: 2px;
  }
</style>