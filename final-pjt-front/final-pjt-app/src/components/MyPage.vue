<template>
  <div>
    <h2>ID: {{ payload.username }}</h2>
    <h4>닉네임: {{ payload.nickname }}</h4>
    <div>
      <span>프로필 이미지:</span>
      <span v-if="!isEditing"> {{ payload.profile_image}}</span>
      <span v-if="isEditing">
        <input type="text" v-model="payload.profile_image">
        <button @click="onUpdate">Update</button> |
        <button @click="switchIsEditing">Cancle</button>
      </span>
      <span v-if="!isEditing">
        <button @click="switchIsEditing">Edit</button> |
      </span>
    </div>
    <button @click="deleteProfile">계정 삭제</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyPage',
  props: { profile: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        username: this.profile.username,
        nickname: this.profile.nickname,
        profile_image: this.profile.profile_image,
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateProfile', 'deleteProfile']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateProfile(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style>
.comment-list-item {
  border: 1px solid green;

}
</style>