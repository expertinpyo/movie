<template>
  <li>
    <router-link :to="{ name: 'profile', params: { username: review.user.username } }">
      [{{review.user.nickname}}] {{ review.user.username }}
    </router-link>: 
    <span v-if="!isEditing">내용 : {{ payload.content }}</span>
    <span v-if="!isEditing">평점 : {{ payload.user_vote }}</span>

    <span v-if="isEditing">
      <input type="text" v-model="payload.content">
      <input type="text" v-model="payload.user_vote">
      <button @click="onUpdate">Update</button> |
      <button @click="switchIsEditing">Cancle</button>
    </span>

    <span v-if="currentUser.username === review.user.username && !isEditing">
      <button @click="switchIsEditing">Edit</button> |
      <button @click="deleteReview(payload)">Delete</button>
    </span>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewListItem',
  props: { review: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        moviePk: this.review.movie,
        reviewPk: this.review.pk,
        content: this.review.content,
        user_vote: this.review.user_vote,
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser',]),
  },
  methods: {
    ...mapActions(['updateReview', 'deleteReview']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateReview(this.payload)
      this.isEditing = false
    }
  }
}
</script>

<style>

</style>