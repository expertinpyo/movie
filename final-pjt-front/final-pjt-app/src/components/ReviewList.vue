<template>
  <div>
    <ReviewListForm />
    <ReviewListItem v-for="review in reviews" :review="review" :key="review.pk" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import ReviewListForm from './ReviewListForm.vue'
import ReviewListItem from './ReviewListItem.vue'

export default {
  name: 'ReviewList',
  components: {
    ReviewListForm, ReviewListItem,
  },
  computed: {
    ...mapGetters(['reviews',]),
  }

}
</script>

<style>

</style>