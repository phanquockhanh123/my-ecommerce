<template>
  <div class="products-category pt-12">
    <h1 class="text-center">{{ q }}</h1>
    <v-container fluid v-if="productsSearch">
      <v-card :loading="loading" class="pt-5 ml-10">
        <v-row>
          <v-col cols="12"
            sm="6"
            md="4"
            lg="3" v-for="item in productsSearch" :key="item.id" class="px-10 px-sm-5 mt-8 mt-lg-0">
            <v-card elevation="0" class="pb-5">
              <v-hover v-slot="{ isHovering, props }">
                <div class="img-parent position-relative d-flex justify-center" style="height: 200px">
                  <img
                    :src="
                      showenItem[item.title] ? showenItem[item.title] : item.thumbnail
                    "
                    class="image-css"
                    :style="`height: 200px; transition: 0.5s all ease-in-out; scale: ${
                      isHovering ? 1.05 : 1
                    }; cursor: pointer`"
                    alt=""
                    v-bind="props"
                  />
                  <v-btn
                    density="compact"
                    width="100"
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
                      font-size: 14px;
                      transition: 0.2 all ease-in-out;
                      opacity: 0;
                    "
                    @click="openQuickView(item)"
                  >
                    Quick View</v-btn
                  >
                </div>
              </v-hover>

              <v-card-text class="pl-0 pb-1 pt-15">
                ({{ item.title }})
                {{
                  item.description + " " + item.description.split(" ").length <= 15
                    ? item.description
                    : item.description
                        .split(" ")
                        .slice(0, 15 - item.title.split(" ").length)
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
              <v-btn-toggle v-model="showenItem[item.title]">
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
                    style="border: 1px solid rgb(135, 135, 1); border-radius: 50%;object-fit: cover;"
                  />
                </v-btn>
              </v-btn-toggle>
              <div class="mt-5">
                <v-btn
                  denisity="combact"
                  width="220"
                  height="35"
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
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { productsModule } from "@/store/products";
import { mapActions, mapState } from "pinia";

export default {
  inject: ["Emitter"],
  methods: {
    ...mapActions(productsModule, ["getProductsByName"]),
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
    async fetchList(query) {
      this.loading = true;
       await this.getProductsByName(query);
      this.loading = false;
    }
  },
  data: () => ({
    showenItem: {},
    loading: false,
  }),
  computed: {
    ...mapState(productsModule, ["productsSearch"]),
  },
  async mounted() {
    this.Emitter.on("searchApp", (query) => {
      this.$router.replace({
        query
      })
    });
    this.fetchList(this.$route.query)
  },

  watch: {
    async $route() {
      this.fetchList(this.$route.query);
    },
  },
};
</script>

<style lang="scss">
.products-category {
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
  .img-parent {
    .image-css {
      object-fit: cover !important;
      height: 250px !important;
    }
  }
}
</style>
