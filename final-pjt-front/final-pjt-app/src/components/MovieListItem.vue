<template>
  <div class="contatiner">
    <v-hover style="margin-bottom:10px">
      <template v-slot:default="{ hover }">
        <v-card>
          <v-img class="cardImg" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"></v-img>
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
            >
              <v-btn class="detailBtn" icon color="indigo" @click="movieDetail()"><v-icon>fas fa-search</v-icon></v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <div class="container">
      <b-modal
        hide-footer
        v-model="show"
        id="movie-modal"
        size="lg"
        :title="movie.title"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant"

        :footer-text-variant="footerTextVariant"
      >
        <iframe width="765" height="400" :src="'https://www.youtube.com/embed/'+movie.video_key+'?autoplay=1'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <hr>

        <h5>영화 제목: {{ movie.title }}</h5>
        <h5>평점 : {{ movie.vote_average }}점</h5>
        <h5>개봉 일자 : {{ movie.release_date }}</h5>

        <hr>
        <span v-if="movie.overview">{{ movie.overview }}</span>
        <span v-else>해당 영화의 overview는 비어있습니다.</span>
        <hr>
        <div class="d-flex justify-content-between">
          <router-link :to="{name: 'movie', params:{ moviePk: movie.id } }">
            <button class="btn btn-secondary btn-xl" id="sendMessageButton" type="submit">Detail</button>
          </router-link>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MovieListItem',
  data() {
    return{
      show: false,
      variants: ["light", "black"],
      headerBgVariant: "black",
      headerTextVariant: "white",
      bodyBgVariant: "black",
      bodyTextVariant: "white",
      footerTextVariant: "black",
    }
  },
  props:{
    movie: {
      type: Object,
    },
  },
  methods: {
    movieDetail() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
}
</script>

<style scoped>
  .v-card {
    height: 400px;
  }
  .cardImg {
    height: 100%;
  }
  .cardTitle {
    font-size: 1vw;
  }
  .overlay {
    position: absolute;
  }
  .detailBtn {
    top: -175px;
  }
  .fa-solid {
    color: white;
  }
</style>