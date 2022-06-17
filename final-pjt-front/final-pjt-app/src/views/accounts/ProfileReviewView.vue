<template>
  <div>
    <ProfileNavBar :profile="profile" />
    <div class="d-flex justify-content-center">
      <div class="style=width:700px;">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>영화번호</th>
              <th>리뷰</th>
              <th>평점</th>
            </tr> 
          </thead>
          <tbody class="table-light">
            <tr v-for="review in paginatedData" :key="review.pk">
              <th>
                <router-link :to="{ name: 'movie', params: { moviePk : review.movie } }">
                  No.{{ review.movie }}
                </router-link>
              </th>
              <th><p class="content">{{ review.content }}</p></th>
              <th>{{ review.user_vote }}점</th>
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
  name: 'ProfileReviewView',
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
        let Length = this.profile.reviews.length
        let page = Math.floor((Length-1) / this.pageSize) + 1

        return page
      },
    paginatedData(){
      const start = this.pageNum * this.pageSize,
      end = start + this.pageSize
      return this.profile.reviews.slice(start, end)
    }
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  },
}
</script>
<style scoped>
  .content{
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