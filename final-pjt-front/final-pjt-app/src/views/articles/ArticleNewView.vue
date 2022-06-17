<template>
  <div>
    <ArticleForm :article="article" action="create" />
  </div>
</template>

<script>
  import ArticleForm from '@/components/ArticleForm.vue'
  export default {
    name: 'AritcleNewView',
    components: { ArticleForm },
    data() {
      return {
        article: {
          pk: null,
          title: '',
          content: '',
          secretnumber: '',
        }
      }
    },
  }
</script>

<style>

</style>