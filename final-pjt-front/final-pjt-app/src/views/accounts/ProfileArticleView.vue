<template>
  <div>
    <ProfileNavBar :profile="profile" />
    <div class="d-flex justify-content-center">
      <div class="style=width:700px;">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>No.</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="article in paginatedData" :key="article.pk">
              <th>{{ article.pk }}</th>
              <th>
                <router-link :to="{ name: 'article', params: { articlePk : article.pk } }">
                  <p class="title">{{ article.title }}</p>
                </router-link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagebtn">
      <button class="btn btn-dark btn-sm" :disabled="pageNum === 0" @click="prevPage">prev</button>
      <span>{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button class="btn btn-dark btn-sm" :disabled="pageNum >= pageCount - 1" @click="nextPage">next</button>
    </div>
  </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileNavBar from '@/components/ProfileNavBar.vue'

export default {
  name: 'ProfileArticleView',
  components:{
    ProfileNavBar,
  },
  data: function(){
      return{
        pageNum: 0,
        pageSize: 5,
      }
    },
  methods: {
    ...mapActions(['fetchProfile',]),
    nextPage() {
        this.pageNum += 1
      },
    prevPage() {
      this.pageNum -= 1
    },
  },
  computed: {
    ...mapGetters(['profile',]),
    pageCount(){
        let Length = this.profile.articles.length
        let page = Math.floor((Length-1) / this.pageSize) + 1

        return page
      },
    paginatedData(){
      const start = this.pageNum * this.pageSize,
      end = start + this.pageSize
      return this.profile.articles.slice(start, end)
    }
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
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
  .pagebtn{
    position: relative;
    left: center;
    bottom: 0px;
  }
</style>