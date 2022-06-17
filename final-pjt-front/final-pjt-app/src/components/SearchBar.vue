<template>
  <div class="sticky-top">
    <div>
      <b-button class="sideBtn mx-3" v-b-toggle.sidebar-backdrop>
        <div class="holder">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-7 9 90 32" xml:space="preserve">
            <g>
              <path class="st0" d="M72.9,9h-8l4,8h-6l-4-8h-4l4,8h-6l-4-8h-4l4,8h-6l-4-8h-2l0,0h-5.6l0,0H25l4,8h-6l-4-8h-4l4,8h-6L9,9H5l4,8H3
                l-4-8h-2h-0.1H-7v9.4l0,0v13.2l0,0V35v2l0,0v4h3.9H-3h32l0,0h10.3l0,0h29.6c0.1,0,0.1,0,0.2,0h3.8v-3.9c0,0,0,0,0-0.1V9z"/>
            </g>
          </svg>
          <svg>
            <defs>
              <clipPath id="movie_mask">
                    <path id="maskpath" d="M25,9h-6h-4H9H5h-6h-2c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V9H25z"/>
              </clipPath>
            </defs>
          </svg>
        </div>
    </b-button>
      <b-sidebar id="sidebar-backdrop" 
        backdrop
        bg-variant="black" 
        width="200px">
        <div class="px-3 py-2">
          <ul>
            <li><router-link :to="{ name: 'movies', }"><span>home</span></router-link></li>
            <li><router-link :to="{ name: 'recommendation', }" class="ms-1"><span>my list</span></router-link></li>
            <li><router-link :to="{ name: 'title', params: {title: '' } }"><span>title</span></router-link></li>
            <li><router-link :to="{ name: 'actors', params: {actors: '' } }"><span>actor</span></router-link></li>
            <li><router-link :to="{ name: 'director', params: {director: '' } }" class="ms-3"><span>director</span></router-link></li>
            <li><router-link :to="{ name: 'genre', params: {genre: '' } }"><span>genre</span></router-link></li>
          </ul>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
// import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SearchBar',
  // computed: {
  //   ...mapGetters([''])
  // },

  // methods: {
  //   ...mapActions(['fetchTitle', 'fetchActors', 'fetchDirector', 'fetchGenre'])
  // }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/searchbar.scss";
  // a {
  //   text-decoration: none;
  // }
  .sideBtn {
    left: 0;
    position: fixed;
    position: relative;
    top: 150px;
    height: 50px;
    width: 50px;
    border: none;
    background: none; 
    outline: none;
  }
  .btn-secondary{
    background: none;
    border: none;
  }
  button.btn.sideBtn.btn-secondary.collapsed {
    background: none;
    border: none;
    outline: none;
  }
  .sideBtn:active,
  .sideBtn:hover,
  .sideBtn:focus {
    box-shadow: none;
  }
  #app > div:nth-child(2) > div > div.search > div > div > button > div > svg:nth-child(2) {
    width: 50px;
    height: 50px;
  }
  .sideBtn:hover{
    background: #edbe2a;
    opacity: 0;
    border: none;
  }
</style>