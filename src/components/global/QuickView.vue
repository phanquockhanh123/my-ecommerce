<template>
  <div class="product-details pt-10">
    <v-dialog v-model="dialog" max-width="1200" max-height="600">
      <v-icon
        style="
          position: absolute;
          right: -14px;
          top: -14px;
          background-color: black;
          color: white;
          font-size: 18px;
          padding: 13px;
          z-index: 10;
        "
        @click="dialog = false"
      >
      mdi-close
      </v-icon>
      <v-card elevation="0" class="content_card">
        <v-container fluid class="bg-white pt-10 px-10">
          <v-row>
            <v-col cols="12" md="7">
              <img
                :src="tab ? tab : productDetail.thumbnail"
                class="w-100"
                alt=""
                height="400"
                v-if="!loading"
              />
              <v-skeleton-loader
                type="article, article, article"
                v-if="loading"
              ></v-skeleton-loader>
              <v-tabs center-active height="150" v-model="tab">
                <v-tab
                  v-for="(img, i) in productDetail.images"
                  :key="i"
                  class="mx-10"
                  :value="img"
                >
                  <img :src="img" width="100" height="100" alt="" />
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" md="5" class="pt-2 pl-6 mt-8 mt-md-0">
              <v-card elevation="0" v-if="!loading">
                <v-card-title
                  class="px-0"
                  style="font-size: 18px; font-weight: bold; white-space: pre-wrap"
                  >({{ productDetail.title }}) Sample- {{ productDetail.category }} For
                  Sale</v-card-title
                >
                <div class="rating-parent d-flex align-center" style="gap: 10px">
                  <v-rating
                    v-model="productDetail.rating"
                    half-increments
                    readonly
                    color="yellow-darken-2"
                    size="x-small"
                    density="compact"
                  >
                  </v-rating>
                  <span class="mt-1" style="color: black; font-size: 15px"
                    >Stock: {{ productDetail.stock }}</span
                  >
                </div>
                <v-card-text class="px-0" style="color: black; font-size: 15px">{{
                  productDetail.description
                }}</v-card-text>
                <v-card-text class="px-0 pt-0" style="color: black; font-size: 15px"
                  >Brand: {{ productDetail.brand }}</v-card-text
                >
                <v-card-text class="px-0 pt-0" style="color: black; font-size: 15px"
                  >Sku: {{ productDetail.sku }}</v-card-text
                >
                <v-card-text class="px-0 pt-0" style="color: black; font-size: 15px"
                  >Available:
                  {{ productDetail.stock > 0 ? "In stock" : "Out of stock" }}</v-card-text
                >
                <v-card-text>
                  <del>{{ productDetail.price }}</del> From
                  <span class="text-red" style="font-weight: 900; font-size: 16px"
                    >${{
                      Math.ceil(
                        productDetail.price -
                          productDetail.price * (productDetail.discountPercentage / 100)
                      )
                    }}</span
                  >
                </v-card-text>
                <v-card-text class="pl-0 pt-0">Quantity</v-card-text>
                <div
                  class="counter px-1"
                  style="border-radius: 30px; border: 1px solid black; width: fit-content"
                >
                  <v-icon size="25" @click="quantity > 1 ? quantity-- : false"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    style="border: none; outline: none; width: 60px"
                    class="text-center py-2"
                    min="1"
                    value="1"
                    v-model="quantity"
                  />
                  <v-icon size="25" @click="quantity++">mdi-plus</v-icon>
                </div>
                <v-card-text class="pl-0 pt-5">
                  Subtotal: ${{
                      Math.ceil(
                        productDetail.price -
                          productDetail.price * (productDetail.discountPercentage / 100)
                      ) * quantity
                    }}
                </v-card-text>
                <v-card-actions class="mt-7 w-100 px-0">
                  <v-btn
                    variant="outlined"
                    style="
                      text-transform: none;
                      border-radius: 30px;
                      background-color: black;
                    "
                    class="w-75 text-white"
                    density="compact"
                    height="55"
                    @click="addToCart(productDetail)"
                    :loading="btnLoading"
                    >Add To Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/store/cart";
import { mapActions } from "pinia";

export default {
  inject: ['Emitter'],
  data: () => ({
    loading: false,
    tab: "",
    quantity: 1,
    dialog: false,
    productDetail: "",
    btnLoading: false,
  }),
  components: {
    VSkeletonLoader,
  },
  mounted() {
    this.Emitter.on("openQuickView", (data) => {
      this.loading = true;
      this.productDetail = data;
      this.dialog = true;
      setTimeout(()=> {
        this.loading = false;
      }, 1000)
    })
  },  
  methods: {
    ...mapActions(cartStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        
        this.addItem(item);
        this.Emitter.emit('openCart');
        this.Emitter.emit('showMsg', item.title);
        this.dialog = false;
      }, 1000);
      
    }
  }
};
</script>

<style lang="scss">
.content_card {
  &::-webkit-scrollbar {
    width:5px;
  }
  &::-webkit-scrollbar-thumb {
    width:5px;
    background-color: rgb(126, 125, 125);
  }
  &::-webkit-scrollbar-track {
    width:5px;
    background-color: rgb(126, 125, 125);
  }
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
</style>