<template>
  <div>
    <div class="login">
      <div class="login-header">
        <h1>Login</h1>
      </div>
      <v-form class="login-form" @submit.prevent="login(credentials)">
        <h3>Username:</h3>
        <label class="username-css" for="username"></label>
        <input type="text" placeholder="Username" v-model="credentials.username" required />
        <h3>Password:</h3>
        <label class="password-css" for="password"></label>
        <input type="password" placeholder="Password" v-model="credentials.password" required />
        <br>
        <button><input type="button" value="Login" class="login-button"/></button>
        <br>
      </v-form>
    </div>
    <div v-if="authError" class="error-page animate__animated animate__shakeX">
      <AccountErrorList />
    </div>
  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import store from '../../store'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'LoginView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        }
      }
    },
    computed: {
      ...mapGetters(['authError'])
    },
    methods: {
      ...mapActions(['login', 'fetchCurrentUser'])
    },
    created() {
      this.fetchCurrentUser()
      store.commit('SET_AUTH_ERROR', null)
      store.commit('SET_WHICH_ERROR', null)
    }
  }
</script>

<style scoped>
h1, h2, h3, h4, h5, h6, a {
  margin:0; padding:0;
}
.login {
  margin:0 auto;
  max-width:500px;
}
.login-header {
  color:#fff;
  text-align:center;
  font-size:300%;
}
/* .login-header h1 {
   text-shadow: 0px 5px 15px #000; */

.login-form {
  border:.5px solid #fff;
  /* background:#4facff; */
  border-radius:10px;
  box-shadow:0px 0px 10px #000;
}
.login-form h3 {
  text-align:left;
  margin-left:40px;
  color:#fff;
}
.login-form {
  box-sizing:border-box;
  padding-top:15px;
	padding-bottom:10%;
  margin:5% auto;
  text-align:center;
}
.login input[type="text"],
.login input[type="password"] {
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
.login-form input[type="button"] {
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
/* Media Querie
@media only screen and (min-width : 150px) and (max-width : 530px){
  .login-form h3 {
    text-align:center;
    margin:0;
  }
  .sign-up, .no-access {
    margin:10px 0;
  }
  .login-button {
    margin-bottom:10px;
  }
} */
</style>