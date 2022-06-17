<template>
  <div>
    <MyPage :profile="profile" />
    <!-- <MyPageForm /> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MyPage from '@/components/MyPage'
// import MyPageForm from '@/components/MyPageForm'

export default {
  name: 'MyPageView',
  components:{
    MyPage, 
    // MyPageForm,
  },
  computed: {
    ...mapGetters(['profile', ]),
  },
}
</script>

<style>

</style>