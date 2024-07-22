<template>
  <div class="flash-deals pt-16">
    <Swiper>
      <swiper-slide>
        
      </swiper-slide>
    </Swiper>
    <v-container fluid>
      <v-row>
        <v-col cols="3" v-for="item in products" :key="item.id">
          <v-card elevation="0" class="pb-5">
            <img :src="showenItem[item.title] ? showenItem[item.title] : item.thumbnail" class="w-100" style="height: 200px;" alt="">
          </v-card>
          <v-card-text class="pl-0 pb-1">
            ({{ item.title }})
            {{ item.description.split(' ').length <= 20 ? item.description : item.description.split(" ").slice(0, 9).join(" ") + "..." }}
          </v-card-text>
          <v-rating v-model="item.rating" half-increments readonly color="yellow-darken-2" size="x-small" density="compact" >
          </v-rating>
          <v-card-text>
            <del>{{ item.price }}</del> From
            <span class="text-red" style="font-weight: 900; font-size: 16px">${{ Math.ceil(item.price - item.price * (item.discountPercentage / 100)) }}</span>
          </v-card-text>
          <v-btn-toggle v-model="showenItem[item.title]">
            <v-btn v-for="(pic, i) in item.images" :value="pic" :key="i" size="x-small">
              <img :src="pic" width="30" height="30" alt="" style="border:1px solid rgb(135,135,1);border-radius:50%;">
            </v-btn>
          </v-btn-toggle>
          <div class="mt-5">
            <v-btn denisity="combact" class="py-2 px-12" style="text-transform: none;border-radius:30px" >Choose Options</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper,SwiperSlide } from 'vue-awesome-swiper';

export default {
  props: {
    products: {
      type: Array,
    },
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data: () => ({
    showenItem: {}
  })
};
</script>
