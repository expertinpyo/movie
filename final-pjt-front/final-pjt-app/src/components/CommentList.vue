<template>
  <div class="comment-list">
    <CommentListForm />
    <CommentListItem v-for="comment in comments" :comment="comment" :key="comment.pk" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CommentListForm from './CommentListForm.vue'
import CommentListItem from './CommentListItem.vue'


export default {
  name: 'CommentList',
  components: { CommentListForm, CommentListItem },
  computed: {
    ...mapGetters(['comments',]),
  }
}
</script>

<style scoped>
  .comment-list {
    border: 1px solid rgb(0, 0, 0); 
  }
</style>