<template>
  <div>
      <router-link :to="{ name: 'profile', params: { username: comment.user.username } }">
        [ {{ comment.user.nickname }} ] {{ comment.user.username }}
      </router-link>: 
      
      <span v-if="!isEditing">{{ payload.content }}</span>

      <span v-if="isEditing">
        <input type="text" v-model="payload.content">
        <button @click="onUpdate">수정</button> |
        <button @click="switchIsEditing">취소</button>
      </span>

      <span v-if="currentUser.username === comment.user.username && !isEditing">
        <button class="btn btn-dark btn-sm" @click="switchIsEditing">수정</button> |
        <button class="btn btn-dark btn-sm" @click="deleteComment(payload)">삭제</button>
      </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListItem',
  props: { comment: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        articlePk: this.comment.article,
        commentPk: this.comment.pk,
        content: this.comment.content
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateComment', 'deleteComment']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateComment(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style scoped>
.comment-list-item {
  border: 1px solid rgb(0, 0, 0);

}
</style>