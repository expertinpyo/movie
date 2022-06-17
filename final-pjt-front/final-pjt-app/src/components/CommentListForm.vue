<template>
  <form @submit.prevent="onSubmit" class="comment-list-form">
    <label for="comment">댓글 : </label>
    <input type="text" id="comment" v-model="content" required>
    <button class="btn btn-dark">댓글 입력</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListForm',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['article']),
  },
  methods: {
    ...mapActions(['createComment']),
    onSubmit() {
      this.createComment({ articlePk: this.article.id, content: this.content, })
      this.content = ''
    }
  }
}
</script>

<style scoped>
.comment-list-form {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
}
</style>