<template>
  <div class="account-error-list">
    <!-- Signup 단계에서 사용자가 오류 발생시켰을 때 만져야하는 부분 -->
    <div v-if="whichError">
      <p v-for="(errors, field) in authError" :key="field">
        <ul> 
          <li v-for="(error, idx) in errors" :key="idx">
            {{ error }}
          </li>
        </ul>
      </p>
    </div>
    <div v-if="!whichError">
      <p>Your username and/or password do not match</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  // authError 를 보여주는 아이, authError는 객체

  export default {
    name: 'AccountErrorList',
    computed: {
      ...mapGetters(['authError', 'whichError',])
    },

  }
</script>

<style scoped>
  .account-error-list {
    color: red;
  }
  ul {
    list-style-type: none;
  }
</style>