<template>
  <div></div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    methods: {
      ...mapActions(['logout'])
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    },
    created() {
      if (this.isLoggedIn) {
        this.logout()
      } else {
        // 로그인 유저가 url로 로그아웃 시도하려는 것을 방지
        alert('잘못된 접근')
        this.$router.back()
      }
    },
  }
</script>

<style>

</style>