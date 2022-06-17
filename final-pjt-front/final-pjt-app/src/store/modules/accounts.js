import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

export default {
  // namespaced: true,

  // state는 직접 접근하지 않겠다!
  state: {
    token: localStorage.getItem('token') || '' , // login 했을 때의 token 값
    currentUser: {},  // token값 기반 사용자 정보
    profile: {},
    authError: null,
    whichError: null,
    userGenre : [],
  },
  // 모든 state는 getters 를 통해서 접근하겠다.
  getters: {
    isLoggedIn: state => !!state.token, // 사용자의 로그인 여부는 state의 token으로만 판별 가능!!
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    authError: state => state.authError,
    // 객체이기 때문에 ()로 묶어줌
    authHeader: state => ({ Authorization: `Token ${state.token}`}),
    whichError: state => state.whichError,
    userGenre : state => state.userGenre,
    // hadNickname: state => !!state.currentUser.get_nickname
  },

  mutations: {
    SET_START: (state, isStart) => state.isStart = isStart,
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    SET_WHICH_ERROR: (state, whichError) => state.whichError = whichError,
    SET_USER_GENRE: (state, genres) => state.userGenre = genres
  },

  actions: {
    saveToken({ commit }, token) {
      
      //state.token 추가 
      commit('SET_TOKEN', token)
      
      //localStorage에 token 추가
      localStorage.setItem('token', token)
    },

    removeToken({ commit }) {
      
      // state.token 삭제
      commit('SET_TOKEN', '')
      
      // localStorage에 token 추가
      localStorage.setItem('token', '')
    },

    login({ commit, dispatch }, credentials) {
      /* 
      POST: 사용자 입력정보를 login URL로 보내기
        성공하면
          응답 토큰 저장
          현재 사용자 정보 받기
          메인 페이지(ArticleListView)로 이동
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.accounts.login(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          router.push({ name: 'movies' })
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    // credentials 는 component에서 넘어옴
    signup({ commit, dispatch }, credentials) {
      /* 
      POST: 사용자 입력정보를 signup URL로 보내기
        성공하면
          응답 토큰 저장
          현재 사용자 정보 받기
          메인 페이지(PreferenceView)로 이동
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.accounts.signup(),
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          router.push({ name: 'question' })
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    logout({ getters, dispatch }) {
      /* 
      POST: token을 logout URL로 보내기
        성공하면
          토큰 삭제
          사용자 알람
          LoginView로 이동
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        // data: {}, 써도되고 안써도됨(post는 무조건적으로 data를 같이줌)
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('removeToken')
          alert('성공적으로 logout!')
          router.push({ name: 'login' })
        })
        .catch(err => {
          console.error(err.response)
        })
    },

    // 내가 누군지 정보 받아오는 것
    fetchCurrentUser({ commit, getters, dispatch }) {
      /*
      GET: 사용자가 로그인 했다면(토큰이 있다면)
        currentUserInfo URL로 요청보내기
          성공하면
            state.cuurentUser에 저장
          실패하면(토큰이 잘못되었다면)
            기존 토큰 삭제
            LoginView로 이동
      */
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => {
            // console.log(res.data)
            commit('SET_CURRENT_USER', res.data)
            })
          // token 만료시
          .catch(err => {
            if (err.response.status === 401) {
              dispatch('removeToken')
              router.push({ name: 'login' })
            }
          })
      }
    },

    fetchProfile({ commit, getters }, { username }) {
      /*
      GET: profile URL로 요청보내기
        성공하면
          state.profile에 저장
      */
      axios({
        // 사용자가 보는 url은 localhost:8000/profile/:username
        // Django에 127.0.0.1/api/v1/accounts/profile/<username>으로 보내는것
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data)
          // console.log(res.data)
        })
    },
    SetNickname({commit, getters, dispatch}, {userPk, username, result}){
      let nn = ''
      let ex = ''
      let ge = ''
      let sn = 0
      if (result > 16) {
        nn = '창의적인 자'
        ex = '당신은 매우 창의적인 사람입니다. 평소에 남들과 다른 아이디어를 많이 가지고 있습니다. 당신은 뛰어난 예술, 공간 감각을 가지고 있습니다.'
        ge = ['SF', '애니메이션', '음악', '판타지']
        sn = 1
      } else if(result > 11){
        nn = '낙천적인 자'
        ex = '당신은 매우 긍정적입니다. 어떠한 환경에 주어져도 쉽게 해쳐나가며 감정표현, 의사전달 등을 조리있게 이야기합니다. 당신은 모임에서 항상 인기가 있습니다.'
        ge = ['가족', '드라마', '로맨스', '모험', '코미디']
        sn = 2
      } else {
        nn = '이성적인 자'
        ex = '당신은 매우 직관적인 사람입니다. 냉철하고 빠른 판단을 내리며 이성적이고, 추진력이 강한 사람입니다. 또한 통찰력 역시 우수합니다.'
        ge = ['다큐멘터리', '범죄', '스릴러', '전쟁', '미스터리']
        sn = 3
      }
      const data = { 
        'pk': userPk,
        'username': username,
        'nickname': nn,
        'description': ex,
        'secretnumber': sn,
        'get_nickname': true,
      }

      axios({
        url: drf.accounts.nickname(username),
        method: 'put',
        data: data,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data)
          dispatch('fetchCurrentUser')
          commit('SET_USER_GENRE', ge)
        })
        .catch(err => console.error(err.response))
    },
  },
}