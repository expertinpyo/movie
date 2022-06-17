<template>
  <nav>
    <div class="d-flex justify-content-center">
      <div>
        <h1>Community 게시판</h1>
      </div>
      <div class="text-align-end">
        <b-btn variant="success">
          <router-link :to="{ name: 'articleNew' }">게시글 작성</router-link> 
        </b-btn>
      </div>
    </div>
      <ArticleListView />
  </nav>
</template>

<script>
import ArticleListView from '../articles/ArticleListView.vue'

  export default {
    name: 'CommunityView',
    components: { ArticleListView }
  }
</script>

<style>

</style>