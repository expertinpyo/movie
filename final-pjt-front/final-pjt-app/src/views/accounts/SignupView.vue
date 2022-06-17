<template>
  <div>
    <!-- credentials를 accounts.js에 넘겨주기 -->
    <div class="signup">
      <div class="signup-header">
        <h1>Signup</h1>
      </div>
      <v-form class="signup-form" @submit.prevent="signup(credentials)"> 
        <h3>Username:</h3>
        <label class="username-css" for="username"></label>
        <input type="text" id="username" v-model="credentials.username" required/>
        <h3>Password:</h3>
        <label class="password-css" for="password1"></label>
        <input type="password" id="password1" v-model="credentials.password1" required />
        <br>
        <h3>Password Confirmation:</h3>
        <label class="password-css" for="password2"></label>
        <input type="password" id="password2" v-model="credentials.password2" required />
        <br>
        <button><input type="button" value="Signup" class="signup-button"/></button>
      </v-form>
    </div>
    <div  v-if="authError" class="error-page animate__animated animate__shakeX">
      <AccountErrorList />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import store from '../../store'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'SignupView',
    components: {
        AccountErrorList,
      },
      data() {
        return {
          credentials: {
            username: '',
            password1: '',
            password2: '',
          }
        }
      },
      computed: {
        ...mapGetters(['authError'])
      },
      methods: {
        // accounts.js의 signup 소환!
        ...mapActions(['signup'])
      },
      created() {
        store.commit('SET_AUTH_ERROR', null)
        store.commit('SET_WHICH_ERROR', true)
      },
  }
</script>

<style scoped>
  h1, h2, h3, h4, h5, h6, a {
  margin:0; padding:0;
}
.signup {
  margin:0 auto;
  max-width:500px;
}
.signup-header {
  color:#fff;
  text-align:center;
  font-size:300%;
}

.signup-form {
  border:.5px solid #fff;
  /* background:#4facff; */
  border-radius:10px;
  box-shadow:0px 0px 10px #000;
}
.signup-form h3 {
  text-align:left;
  margin-left:40px;
  color:#fff;
}
.signup-form {
  box-sizing:border-box;
  padding-top:15px;
	padding-bottom:10%;
  margin:5% auto;
  text-align:center;
}
.signup input[type="text"],
.signup input[type="password"] {
  max-width:400px;
	width: 80%;
  line-height:3em;
  font-family: 'Ubuntu', sans-serif;
  margin:1em 2em;
  border-radius:5px;
  border:2px solid #f2f2f2;
  outline:none;
  padding-left:10px;
}
.signup-form input[type="button"] {
  height:30px;
  width:100px;
  background:#fff;
  border:1px solid #f2f2f2;
  border-radius:20px;
  color: slategrey;
  text-transform:uppercase;
  font-family: 'Ubuntu', sans-serif;
  cursor:pointer;
}

</style>