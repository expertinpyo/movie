<template>
  <div>
    <div v-if="page < 7">
      <h2 class="mb-3" style="font-weight:bold">제일 처음 어떤 그림이 보이시나요?</h2>
      <img :src="this.images[this.page]" alt="img">
      <h5 class="mt-2" style="font-weight:bold">점수 : {{totalPoint}}</h5>
      
      <div class="d-flex justify-content-center">
        <div class="mx-1">
          <button @click="one"><i class="fa-solid fa-circle"></i> <span style="font-weight: bold">{{this.ans[this.page][0]}}</span></button>
        </div>
        <div class="mx-1">
          <button @click="two"><i class="fa-solid fa-circle"></i> <span style="font-weight: bold">{{this.ans[this.page][1]}}</span></button>
        </div>
        <div class="mx-1">
          <button @click="three"><i class="fa-solid fa-circle"></i> <span style="font-weight: bold">{{this.ans[this.page][2]}}</span></button>
        </div>
      </div>

      </div>
    <div v-else>
      <h1 style="font-weight:bold"><i class="fa-solid fa-cake-candles"></i> 축하합니다! 당신은 "{{ profile.nickname }}" 입니다.</h1>
      <p>{{ profile.description}}</p>
      <h2>이런 당신에게 추천하는 영화 장르는</h2>
      <h2>{{ userGenre }} 입니다.</h2>
      <h3>당신의 총 점수 : {{ totalPoint }}</h3>
      <p>[~11점 : 이성적인 자 | 11 ~ 16점 : 낙천적인 자 | 17점~ : 창의적인 자 ]</p>
      <router-link :to="{ name: 'recommendation' }">
        <button class="btn-hover color-2">추천장르 영화 페이지 가기</button>
      </router-link>
      <router-link :to="{ name: 'movies' }">
        <button class="btn-hover color-4">전체 영화 페이지 가기</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// import QuestionList from '@/components/QuestionList'

export default {
  name: 'QuestionView',
  data(){
    return {
      page:0,
      point: 0,
      images: [
        require('@/assets/question_images/question_img1.png'),
        require('@/assets/question_images/question_img2.png'),
        require('@/assets/question_images/question_img3.png'),
        require('@/assets/question_images/question_img4.png'),
        require('@/assets/question_images/question_img5.png'),
        require('@/assets/question_images/question_img6.png'),
        require('@/assets/question_images/question_img7.png'),
      ],
      ans: [
        ['외국 남성의 얼굴', '나무에 달린 사과', '앉아서 책을 보고 있는 흰머리 여성'],
        ['자동차', '망원경으로 관찰하고 있는 남성', '영어 알파벳 A'],
        ['볼링핀 5개', '신발 발자국', '러시아 네스팅 인형'],
        ['사과', '나비', '식칼과 에벌레'],
        ['사람 얼굴', '웅크리고 있는 개', '절벽과 흐르고 있는 강가'],
        ['악어', '보트와 그 위의 사람', '산 속에 흐르는 강물'],
        ['평온해 보이는 표정의 고래', '서핑하고 있는 사람', '물에 비친 달의 풍경']
      ],
    }
  },
  components: {
    // QuestionList,
  },
  computed: {
    ...mapGetters(['currentUser', 'profile', 'userGenre', 'hadNickname']),
    totalPoint(){
      return this.point
    }
  },
  methods: {
    ...mapActions(['SetNickname', ]),
    one(){
      this.point += 1
      this.page += 1
      this.message()
    },
    two(){
      this.point += 2
      this.page += 1
      this.message()
    },
    three(){
      this.point += 3
      this.page += 1
      this.message()
    },
    message(){
      if (this.page > 6){
        this.SetNickname({userPk:this.currentUserpk, username:this.currentUser.username, result:this.point})
      } 
    },
  }
}
</script>

<style scoped>
  img {
    box-shadow: -5px -5px 30px 5px red, 5px 5px 30px 5px blue
  }
  h1, h5 {
    color: black
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
  .btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}
.btn-hover.color-2 {
    background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
    box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.btn-hover.color-4 {
    background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
    box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
}
</style>