import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'
import SignupView from '@/views/accounts/SignupView'
import ProfileView from '@/views/accounts/ProfileView'
import ProfileArticleView from '@/views/accounts/ProfileArticleView'
import ProfileLikeView from '@/views/accounts/ProfileLikeView'
import ProfileReviewView from '@/views/accounts/ProfileReviewView'
import ProfileCommentView from '@/views/accounts/ProfileCommentView'
import NotFound404 from '@/views/accounts/NotFound404'

import ArticleListView from '@/views/articles/ArticleListView'
import ArticleSecretListView from '@/views/articles/ArticleSecretListView'
import ArticleDetailView from '@/views/articles/ArticleDetailView'
import ArticleNewView from '@/views/articles/ArticleNewView'
import ArticleEditView from '@/views/articles/ArticleEditView'

import MovieListsView from '@/views/movies/MovieListsView'
import ActorsView from '@/views/movies/ActorsView'
import DirectorView from '@/views/movies/DirectorView'
import TitleView from '@/views/movies/TitleView'
import GenreView from '@/views/movies/GenreView'
import RecommendationView from '@/views/movies/RecommendationView'

import MovieDetailView from '@/views/movies/MovieDetailView'

import QuestionView from '@/views/accounts/QuestionView'

import IntroView from '@/views/accounts/IntroView'

Vue.use(VueRouter)

const routes = [
  //intro
  {
    path: '',
    name: 'intro',
    component: IntroView,
  },

  //question
  {
    path: '/question',
    name: 'question',
    component: QuestionView,
  },
  
  // accounts
  {
    path: '/accounts/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
  {
    path: '/accounts/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/profile/:username/',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/profile/:username/review/',
    name: 'preview',
    component: ProfileReviewView,
  },
  {
    path: '/profile/:username/article/',
    name: 'particle',
    component: ProfileArticleView,
  },
  {
    path: '/profile/:username/like/',
    name: 'plike',
    component: ProfileLikeView,
  },
  {
    path: '/profile/:username/comment/',
    name: 'pcomment',
    component: ProfileCommentView,
  },


  // movies
  
  {
    path: '/movies',
    name: 'movies',
    component: MovieListsView,
  },
  {
    path: '/movies/:moviePk',
    name: 'movie',
    component: MovieDetailView,
  },
  {
    path: '/movies/genre',
    name: 'genre',
    component: GenreView,
  },
  {
    path: '/movies/title',
    name: 'title',
    component: TitleView,
  },
  {
    path: '/movies/actors',
    name: 'actors',
    component: ActorsView,
  },
  {
    path: '/movies/director',
    name: 'director',
    component: DirectorView,
  },
  {
    path: '/movies/recommendation',
    name: 'recommendation',
    component: RecommendationView,
  },

  // articles
  {
    path: '/articles',
    name: 'articles',
    component: ArticleListView,
  },
  {
    path: '/articles/secret',
    name: 'articleSecret',
    component: ArticleSecretListView,
  },
  {
    path: '/articles/new/',
    name: 'articleNew',
    component: ArticleNewView,
  },
  {
    path: '/articles/:articlePk',
    name: 'article',
    component: ArticleDetailView,
  },
  {
    path: '/articles/:articlePk/edit',
    name: 'articleEdit',
    component: ArticleEditView,
  },

  // url error
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next)=> {
//   const { hadNickname } = store.getters

//   const authPages = ['question',]
//   const isAuthRequired = authPages.includes(to.name)

//   if (isAuthRequired && hadNickname){
//     next({ name: 'movies'})
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   // 이전 페이지에서 발생한 에러메시지 삭제
//   store.commit('SET_AUTH_ERROR', null)

//   const { isLoggedIn } = store.getters

//   const noAuthPages = ['login', 'signup']

//   const isAuthRequired = !noAuthPages.includes(to.name)

//   if (isAuthRequired && !isLoggedIn) {
//     // alert('Require Login. Redirecting..')
//     next({ name: 'login' })
//   } else {
//     next()
//   }

//   if (!isAuthRequired && isLoggedIn) {
//     next({ name: ['articles', 'movies'] })
    
//   }
// })

export default router