const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'accounts/'
const MOVIES = 'movies/'
const ARTICLES = 'articles/'
const COMMENTS = 'comments/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profile: username => HOST + ACCOUNTS + 'profile/' + `${username}/`,
    nickname: username => HOST + ACCOUNTS + 'profile/' + `${username}/` + 'nickname/',
    mypage: username => HOST + ACCOUNTS + 'profile/' + `${username}/` + 'mypage/',
  },
  articles: {
    articles: secretPk => HOST + ARTICLES + 'secret/' + `${secretPk}/`,
    article: articlePk => HOST + ARTICLES + `${articlePk}/`,
    likeArticle: articlePk => HOST + ARTICLES + `${articlePk}/` + 'like/',
    comments: articlePk => HOST + ARTICLES + `${articlePk}/` + COMMENTS,
    comment: (articlePk, commentPk) =>
      HOST + ARTICLES + `${articlePk}/` + COMMENTS + `${commentPk}/`,
  },
  movies: {
    movies: () => HOST + MOVIES,
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
    
    titleAll: () => HOST + MOVIES + 'title/',
    title: titleName => HOST + MOVIES + 'title/' + `${titleName}/`,
    
    actorsAll: () => HOST + MOVIES + 'actors/',
    actors: actorName => HOST + MOVIES + 'actors/' + `${actorName}/`,
    
    directorAll: () => HOST + MOVIES + 'director/',
    director: directorName => HOST + MOVIES + 'director/' + `${directorName}/`,
    
    genreAll: () => HOST + MOVIES + 'genre/',
    genre: genreName => HOST + MOVIES + 'genre/' + `${genreName}/`,
    
    recommend: secretNum => HOST + MOVIES + 'recommend/' + `${secretNum}/`,
  
    reviews: moviePk => HOST + MOVIES + `${moviePk}/` + 'review/',
    review: (moviePk, reviewPk) =>
      HOST + MOVIES + `${moviePk}/` + 'review/' + `${reviewPk}/`,
  }
}