import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

// import _ from 'lodash'

export default{
  state:{
    movieList: [],  // 영화 리스트
    movie: {}, // 하나의 영화
    actorList: [],  // 배우 리스트
    directorList: [], // 감독 리스트
    genreList : [], // 장르 리스트
    titleList : [], // 제목 리스트
    totalGenreList: [], // 총 장르 리스트,
    recommendation: [],
  },
  getters:{
    movieList: state => state.movieList,
    movie: state => state.movie,
    actorList: state => state.actorList,
    directorList: state => state.directorList,
    genreList: state => state.genreList,
    titleList: state => state.titleList,
    totalGenreList: state => state.totalGenreList,
    reviews: state => state.movie.reviews,
    recommendation: state => state.recommendation,
    // personalType: state => state.

  },
  mutations:{
    SET_MOVIELIST: (state, movies) => state.movieList = movies,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_ACTORLIST: (state, actors) => state.actorList = actors,
    SET_DIRECTORLIST: (state, director) => state.directorList = director,
    SET_GENRELIST: (state, genres) => state.genreList = genres,
    SET_TITLELIST: (state, title) => state.titleList = title,
    SET_TOTALGENRE: (state, genres) => state.totalGenreList = genres,
    SET_REVIEWS: (state, reviews) => state.movie.reviews = reviews,
    SET_RECOMMENDATION:  (state, recommendation) => state.recommendation = recommendation,
  },
  actions:{
    // 전체 영화 목록 가져오기
    fetchMovieList({commit, getters}){
      axios({
        url: drf.movies.movies(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIELIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },
    fetchTitleAll({commit, getters}, title_name){
      console.log(title_name)
      axios({
        url: drf.movies.titleAll(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_TITLELIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },
    fetchTitle({commit, getters}, title_name){
      axios({
        url: drf.movies.title(title_name),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_TITLELIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },
    fetchActorsAll({commit, getters}){
      axios({
        url: drf.movies.actorsAll(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ACTORLIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },


    fetchActors({commit, getters}, actor_name){
      axios({
        url: drf.movies.actors(actor_name),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ACTORLIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },


    fetchDirectorAll({commit, getters}){
      axios({
        url: drf.movies.directorAll(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_DIRECTORLIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },

    fetchDirector({commit, getters}, director_name){
      axios({
        url: drf.movies.director(director_name),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_DIRECTORLIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },

    fetchGenreAll({commit, getters}){
      axios({
        url: drf.movies.genreAll(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_GENRELIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },

    fetchGenre({commit, getters}, genre_name){
      axios({
        url: drf.movies.genre(genre_name),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_GENRELIST', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },
    GenreList({commit, getters}){
      axios({
        url: drf.movies.genreAll(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_TOTALGENRE', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },
    fetchMovie({commit, getters}, moviePk){
      axios({
        url: drf.movies.movie(moviePk),
        methods: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          } 
        })
    },

    createReview({commit, getters}, {moviePk, content, user_vote}){
      const data = { 'content': content, 'user_vote':user_vote}

      axios({
        url: drf.movies.reviews(moviePk),
        method: 'post',
        data: data,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEWS', res.data)
          router.go({
            name:'movie',
            params:{
              moviePk: getters.movie.id
            }
          })

        })
        .catch(err => console.error(err.response))
    },
    updateReview({ commit, getters }, { moviePk, reviewPk, content, user_vote }) {
      /* 댓글 수정
      PUT: comment URL(댓글 입력 정보, token)
        성공하면
          응답으로 state.article의 comments 갱신
        실패하면
          에러 메시지 표시
      */
      const data = { 'content': content, 'user_vote':user_vote}

      axios({
        url: drf.movies.review(moviePk, reviewPk),
        method: 'put',
        data: data,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEWS', res.data)
          router.go({
            name:'movie',
            params:{
              moviePk: getters.movie.id
            }
          })
        })
        .catch(err => console.error(err.response))
    },

    deleteReview({ commit, getters }, { moviePk, reviewPk }) {
      /* 댓글 삭제
      사용자가 확인을 받고
        DELETE: review URL (token)
          성공하면
            응답으로 state.movie의 reviews 갱신
          실패하면
            에러 메시지 표시
      */
        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.movies.review(moviePk, reviewPk),
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              commit('SET_REVIEWS', res.data)
              router.go({
                name:'movie',
                params:{
                  moviePk: getters.movie.id
                }
              })
            })
            .catch(err => console.error(err.response))
        }
      },
    likeMovie({ commit, getters }, moviePk) {
      /* 좋아요
      POST: likeArticle URL(token)
        성공하면
          state.article 갱신
        실패하면
          에러 메시지 표시
      */
      axios({
        url: drf.movies.likeMovie(moviePk),
        method: 'post',
        headers: getters.authHeader, // token 값
      })
        .then(res => {
          commit('SET_MOVIE', res.data)
        })
        .catch(err => console.error(err.response))
    },
    fetchRecommendation({commit, getters}, secretnum){
      axios({
        url: drf.movies.recommend(secretnum),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_RECOMMENDATION', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404){
            router.push({name:'NotFound404'})
          }
        })
    },
  },
}