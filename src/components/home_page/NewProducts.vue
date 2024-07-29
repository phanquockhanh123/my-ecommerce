<template>
  <div class="new-products py-12">
    <div class="title d-flex justify-center align-center">
      <h2 class="text-center flex-grow-1" style="font-weight: 900; font-size: 20px">
        New Products
      </h2>
      <a href="#" class="text-black">Show All</a>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="7" v-if="!products.length" class="pt-14"
          ><v-row>
            <v-col cols="4" v-for="num in 4" :key="num">
              <v-skeleton-loader type="image, article"> </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" v-else class="pt-14 order-1 order-md-0">
          <Swiper
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="4"
            :space-between="35"
            class="pb-9 px-5 pt-10 ml-5"
            :autoplay="{ delay: 3000 }"
            :breakpoints="breakpoints"
          >
            <swiper-slide v-for="item in products" :key="item.id">
              <v-card elevation="0" class="pb-5 pl-5" style="background-color: #f4eeee;border-radius: 10px;">
                <v-hover v-slot="{ isHovering, props }">
                  <div class="img-parent position-relative" style="height: 200px;">
                    <img
                      :src="
                        showenItem[item.title] ? showenItem[item.title] : item.thumbnail
                      "
                      class="w-100"
                      :style="`height: 200px; transition: 0.5s all ease-in-out; scale: ${
                        isHovering ? 1.05 : 1
                      }; cursor: pointer`"
                      alt=""
                      v-bind="props"
                    />
                    <v-btn
                    density="compact"
                    width="60"
                    height="30"
                    variant="outlined"
                    class="bg-white quick-view-btn"
                    style="
                      text-transform: none;
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%, -50%);
                      border-radius: 30px;
                      font-size: 14ps;
                      transition: 0.2 all ease-in-out;
                      opacity: 0;
                    "
                    @click="openQuickView(item)"
                  >
                    Quick View</v-btn
                  >
                  </div>
                 
                </v-hover>

                <v-card-text class="pl-0 pb-1">
                  ({{ item.title }})
                  {{
                    item.description + " " + item.description.split(" ").length <= 4
                      ? item.description
                      : item.description
                          .split(" ")
                          .slice(0, 6 - item.title.split(" ").length)
                          .join(" ") + " ..."
                  }}
                </v-card-text>
                <v-rating
                  v-model="item.rating"
                  half-increments
                  readonly
                  color="yellow-darken-2"
                  size="x-small"
                  density="compact"
                >
                </v-rating>
                <v-card-text>
                  <del>{{ item.price }}</del> From
                  <span class="text-red" style="font-weight: 900; font-size: 16px"
                    >${{
                      Math.ceil(item.price - item.price * (item.discountPercentage / 100))
                    }}</span
                  >
                </v-card-text>
                <v-btn-toggle v-model="showenItem[item.title]" mandatory>
                  <v-btn
                    v-for="(pic, i) in item.images"
                    :value="pic"
                    :key="i"
                    size="x-small"
                    rounded="xl"
                    :ripple="false"
                  >
                    <img
                      :src="pic"
                      width="30"
                      height="30"
                      alt=""
                      style="border: 1px solid rgb(135, 135, 1); border-radius: 50%"
                    />
                  </v-btn>
                </v-btn-toggle>
                <div class="mt-5">
                  <v-btn
                    denisity="combact"
                    class="py-2 px-12"
                    style="text-transform: none; border-radius: 30px"
                    @click="
                      $router.push({
                        name: 'product_details',
                        params: { productId: item.id },
                      })
                    "
                    >Choose Options</v-btn
                  >
                </div>
              </v-card>
            </swiper-slide>

            <div class="swiper-pagination"></div>
          </Swiper>
        </v-col>
        <v-col cols="12" md="5">
          <img src="@/assets/images/vr-banner.webp" class="w-100" alt="" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Navigation, Pagination, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
export default {
  inject: ["Emitter"],
  methods: {
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  props: {
    products: {
      type: Array,
    },
    routeTitle: {
      type: String
    },
    routeCategory: {
      type: String
    },
    index: {
      type: Number
    }
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
  },
  data: () => ({
    showenItem: {},
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      580: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    },
  }),
};
</script>

<style lang="scss">
.new-products {
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}

// media queries
@media (max-width:580px) {
  .new-products {
    .img-parent {
      height: 300px !important;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    top:60%;
  }
}
</style>
