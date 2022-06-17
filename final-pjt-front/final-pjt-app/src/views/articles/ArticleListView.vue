<template>
  <div>
    <!-- No. / 제목 / 작성자 / 댓글 / 좋아요 -->
    <CommunityNavBar />
    
    <div class="d-flex justify-content-center">
      <div style="width:700px;">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th class="col col-1">No.</th>
              <th class="col col-2">칭호</th>
              <th class="col col-2">작성자</th>
              <th class="col col-4">제목</th>
              <th class="col col-1">댓글</th>
              <th class="col col-2">좋아요</th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="article in paginatedData" :key="article.pk">
              <th><p>{{ article.pk}}</p></th>
              <th>{{ article.user.nickname }}</th>
              <th><router-link :to="{ name: 'profile', params: { username: article.user.username } }">
                {{ article.user.username }}
              </router-link></th>
              <th><!-- 글 이동 링크 (제목) -->
                <router-link :to="{ name: 'article', params: {articlePk: article.pk} }">
                  <p class="title">{{ article.title }}</p>
                </router-link>
              </th>
              <th>
                {{ article.comments_count }}
              </th>
              <th>
                {{ article.like_count }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span class="writebtn">
      <button class="btn btn-dark" @click="toArticleNew">게시글 작성</button>
    </span>
    <span class="pagebtn">
      <button class="btn btn-dark btn-sm" :disabled="pageNum === 0" @click="prevPage">prev</button>
      <span>{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button class="btn btn-dark btn-sm" :disabled="pageNum >= pageCount - 1" @click="nextPage">next</button>
    </span>
    
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import CommunityNavBar from '@/components/CommunityNavBar'  
  export default {
    name: 'ArticleList',
    components:{
      CommunityNavBar,
    },
    data: function(){
      return{
        pageNum: 0,
        pageSize: 5,
      }
    },
    methods: {
      ...mapActions(['fetchArticles', 'SetSecretNumber']),
      nextPage() {
        this.pageNum += 1
      },
      prevPage() {
        this.pageNum -= 1
      },
      toArticleNew(){
        this.$router.push({ name: 'articleNew' })
      }
    },
    computed: {
      ...mapGetters(['articles', 'sn', 'profile', 'currentUser']),
      pageCount(){
        let Length = this.articles.length
        let page = Math.floor((Length-1) / this.pageSize) + 1

        return page
      },
      paginatedData(){
        const start = this.pageNum * this.pageSize,
        end = start + this.pageSize
        return this.articles.slice(start, end)
      }
      
    },
    created() {
      this.SetSecretNumber(0)
      this.fetchArticles(this.sn)
    },
  }
</script>
  
<style scoped>
  .title{
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    width:200px;
    overflow:hidden;
  }
  .writebtn{
    position: relative;
    right: 210px;

  }

</style>