<template>
  <div>
    <ul id="nav">
      <li><label for="toggle-card-1">게시글</label></li>
      <li><label for="toggle-card-2">댓글</label></li>
    </ul>
    <input type="radio" name="cards" class="card-checkbox" id="toggle-card-1">
    <div class="card">
      <h2>{{ article.title }}</h2>
      <p>[ {{ article.user.nickname }} ] {{ article.user.username}}</p>
      <hr>
      <p>{{ article.content }}</p>
      
      <div v-if="isAuthor">
        <router-link :to="{ name: 'articleEdit', params: { articlePk } }">
          <button>Edit</button>
        </router-link>
        <button @click="deleteArticle(articlePk)">Delete</button>
      </div>

    <!-- Article Like UI -->
      <div>
        Like
        <button @click="likeArticle(articlePk)">{{ likeCount }}</button>
      </div>


    </div>
    <input type="radio" name="cards" class="card-checkbox" id="toggle-card-2">
    <div class="card card-black">
      <CommentList />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CommentList from '@/components/CommentList.vue'


  export default {
    name: 'ArticleDetail',
    components: { CommentList },
    data() {
      return {
        articlePk: this.$route.params.articlePk,
      }
    },
    computed: {
      ...mapGetters(['isAuthor', 'article']),
      likeCount() {
        return this.article.like_users?.length
      }
    },
    methods: {
      ...mapActions([
        'fetchArticle',
        'likeArticle',
        'deleteArticle',
      ]),
    },
    created() {
      this.fetchArticle(this.articlePk)
    },
  }
</script>


<style lang="scss" scoped>
  @import "@/assets/scss/articledetail.scss";
  .card-black {
    border: 1px solid rgb(0, 0, 0); 
  }
</style>