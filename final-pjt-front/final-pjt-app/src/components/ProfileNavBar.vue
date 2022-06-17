<template>
  <nav>
    <h1>[ {{profile.nickname}} ] {{ profile.username}}님의 프로필</h1>
    <hr>
    <div v-if="isLoggedIn">
      <router-link :to="{ name: 'profile', params:{ username:profile.username} }">
        영화 좋아요
      </router-link> |
      <router-link :to="{ name: 'preview', params:{ username:profile.username} }">
        영화 리뷰
      </router-link> |
      <router-link :to="{ name: 'particle', params:{ username:profile.username} }">
        작성한 게시글
      </router-link> |
      <router-link :to="{ name: 'plike', params:{ username:profile.username} }">
        게시글 좋아요
      </router-link> |
      <router-link :to="{ name: 'pcomment', params:{ username:profile.username} }">
        작성한 댓글
      </router-link>
    </div>
  </nav>
</template>

<script>
  import { mapGetters} from 'vuex'
  export default {
    name: 'ProfileNavBar',
    computed: {
      ...mapGetters(['isLoggedIn']),
    },
    props: {
      profile:Object,
    }
  }
</script>

<style>

</style>