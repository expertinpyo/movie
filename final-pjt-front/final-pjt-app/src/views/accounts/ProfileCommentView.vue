<template>
  <div>
    <ProfileNavBar :profile="profile" />
    <div class="d-flex justify-content-center">
      <div class="style=width:700px;">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>No.</th>
              <th>게시글 번호</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="comment in paginatedData" :key="comment.pk">
              <th>{{ comment.id }}</th>
              <th>
                <router-link :to="{ name: 'article', params: { articlePk : comment.article } }">
                  {{ comment.article }}
                </router-link>
              </th>
              <th>{{ comment.content }}</th>
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
  name: 'ProfileLikeView',
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
        let Length = this.profile.comments.length
        let page = Math.floor((Length-1) / this.pageSize) + 1

        return page
      },
    paginatedData(){
      const start = this.pageNum * this.pageSize,
      end = start + this.pageSize
      return this.profile.comments.slice(start, end)
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