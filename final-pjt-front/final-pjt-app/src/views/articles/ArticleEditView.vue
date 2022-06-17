<template>
  <div>
    <!-- action : props -->
    <!-- 넘기는 이름 = 넘길 값 -->
    <ArticleForm v-if="isArticle" :article="article" action="update" />
  </div>

</template>

<script>
import ArticleForm from '@/components/ArticleForm.vue'

import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'AritcleEditView',
    components: { ArticleForm },
    computed: {
      ...mapGetters(['article', 'isArticle',])
    },
    methods: {
      ...mapActions(['fetchArticle'])
    },
    created() {
      this.fetchArticle(this.$route.params.articlePk)
    },
  }
</script>

<style></style>
