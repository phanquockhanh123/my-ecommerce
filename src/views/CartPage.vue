<template>
  <div class="cart-page pt-5">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pb-0 px-0">
          <v-breadcrumbs :items="['Home', 'Your cart']" style="font-size: 13px">
            <template v-slot:divider>
              <v-icon color="#878484">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-card-title
            class="pl-0 pr-2 pb-0 d-flex justify-space-between align-center w-100"
            >Your Cart
          </v-card-title>
          <div class="bar-parent mt-6 position-relative mr-2" v-if="cartItems.length">
            <svg
              width="30"
              :style="`position: absolute;
              bottom: 50%;
              z-index: 1;
              left: calc(${
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? parseInt((calcTotalPrice / 10000) * 100)
                  : 100
              }% - 30px);
              transition: 0.2s all ease-in-out;`"
              :fill="
                parseInt((calcTotalPrice / 10000) * 100) < 50
                  ? 'red'
                  : parseInt((calcTotalPrice / 10000) * 100) >= 50 &&
                    parseInt((calcTotalPrice / 10000) * 100) < 100
                  ? 'orange'
                  : 'green'
              "
              :model-value="
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? parseInt((calcTotalPrice / 10000) * 100)
                  : 100
              "
              class="icon-shipping-truck"
              viewBox="0 0 40.55 24"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="truck-body"
                    d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"
                  ></path>
                  <path
                    class="truck-body"
                    d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="white"
                    d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="white"
                    d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"
                  ></path>
                </g>
              </g>
            </svg>
            <v-progress-linear
              :color="
                parseInt((calcTotalPrice / 10000) * 100) < 50
                  ? 'red'
                  : parseInt((calcTotalPrice / 10000) * 100) >= 50 &&
                    parseInt((calcTotalPrice / 10000) * 100) < 100
                  ? 'orange'
                  : 'green'
              "
              :model-value="
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? parseInt((calcTotalPrice / 10000) * 100)
                  : 100
              "
              height="10"
              striped
            ></v-progress-linear>
          </div>
          <v-card-text
            class="px-0 pt-2"
            style="color: #6f6f6f"
            v-if="cartItems.length && 10000 - calcTotalPrice > 0"
            >Only ${{ 10000 - calcTotalPrice }} away from free shipping</v-card-text
          >
          <v-card-text
            class="px-0 pt-2"
            style="color: #6f6f6f"
            v-if="!cartItems.length && 10000 - calcTotalPrice > 0"
            >Free shipping For All Orders Over 10000$</v-card-text
          >

          <v-card-text
            class="px-0 pt-2"
            style="color: #6f6f6f"
            v-if="cartItems.length && 10000 - calcTotalPrice <= 0"
            >Your order now is included free shipping
          </v-card-text>

          <v-card-text
            class="px-0 pt-2 text-center"
            style="color: #6f6f6f"
            v-if="!cartItems.length"
            >Your Cart is Empty!
          </v-card-text>

          <v-card-actions class="px-0 justify-center" v-if="!cartItems.length">
            <v-btn
              color="blue"
              style="
                text-transform: none;
                border-color: rgb(199, 199, 199);
                border-radius: 30px;
              "
              variant="outlined"
              density="compact"
              height="45"
              class="text-white"
              width="300"
              @click="$router.push({ name: 'home' })"
              >Continue Shopping</v-btn
            >
          </v-card-actions>
        </v-col>
        <v-col cols="8" v-if="cartItems.length">
          <v-table class="w-100">
            <thead>
              <tr>
                <th class="text-center" style="font-size: 12px; font-weight: bold">
                  PRODUCT
                </th>
                <th class="text-center" style="font-size: 12px; font-weight: bold">
                  PRICE
                </th>
                <th class="text-center" style="font-size: 12px; font-weight: bold">
                  QUANTITY
                </th>
                <th class="text-center" erstyle="font-size:12px;font-weight:bold;">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.id">
                <td style="width: 55%">
                  <v-row class="align-center mb-4">
                    <v-col cols="5">
                      <img :src="item.thumbnail" class="w-100" alt="" />
                    </v-col>
                    <v-col cols="7">
                      <v-card-title
                        class="px-0"
                        style="white-space: pre-wrap; font-size: 14px; line-height: 1.2"
                        >{{ item.title }} Sample - {{ item.category }}</v-card-title
                      >
                      <v-card-text class="px-0 pb-0" style="color: #6f6f6f"
                        >Category: {{ item.category }}</v-card-text
                      >
                    </v-col>
                  </v-row>
                </td>
                <td style="width: 15%" class="text-center">
                  ${{
                    Math.ceil(item.price - item.price * (item.discountPercentage / 100))
                  }}
                </td>
                <td style="width: 20%" class="text-center">
                  <div class="item-footer d-flex justify-space-between align-center">
                    <div
                      class="counter px-1"
                      style="
                        border-radius: 30px;
                        border: 1px solid black;
                        width: fit-content;
                      "
                    >
                      <v-icon
                        color="#a6a6a6"
                        size="25"
                        @click="item.quantity > 1 ? item.quantity-- : false"
                        >mdi-minus</v-icon
                      >
                      <input
                        type="number"
                        style="border: none; outline: none; width: 32px; font-size: 12px"
                        class="text-center py-2"
                        min="1"
                        value="1"
                        v-model="item.quantity"
                      />
                      <v-icon color="#a6a6a6" size="25" @click="item.quantity++"
                        >mdi-plus</v-icon
                      >
                    </div>
                  </div>
                </td>

                <td class="text-center">
                  ${{
                    Math.ceil(item.price - item.price * (item.discountPercentage / 100)) *
                    item.quantity
                  }}
                </td>
                <td>
                  <v-icon size="22 " @click="deleteItems(item.id)">mdi-close</v-icon>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-divider length="100%" color="black"></v-divider>
          <v-divider length="100%" color="black"></v-divider>
          <v-divider length="100%" color="black"></v-divider>
          <v-col cols="12">
            <v-card-text
              class="px-0 pt-2 d-flex align-center"
              style="color: #6f6f6f; gap: 10px"
              v-if="cartItems.length"
            >
              <span
                ><svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 179.94 179.96"
                  class="icon icon-shield-check"
                  width="20"
                >
                  <path
                    d="M90,0,5,42.78C13.73,105.26,38.14,154.32,90,180c51.83-25.64,76.25-74.7,85-137.18Z"
                  ></path>
                  <polygon
                    fill="white"
                    class="cls-1"
                    points="149.83 67.57 134.81 52.55 79.31 108.05 49.74 78.48 34.72 93.5 79.15 137.94 79.31 137.78 79.47 137.94 149.83 67.57"
                  ></polygon></svg
              ></span>
              <span>Secure Shopping Guanrantee</span></v-card-text
            >
            <img src="@/assets/images/cart-page-cards.webp" width="270" alt="" />
          </v-col>
        </v-col>
        <v-col cols="4" class="px-3" v-if="cartItems.length">
          <v-card elevation="0">
            <v-card-title style="font-size: 15px; font-weight: bold"
              >ORDER SUMMARY</v-card-title
            >
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>

            <v-card-text class="d-flex align-center justify-space-between">
              <span>Subtotal</span>
              <span class="font-weight-bold" style="font-size: 15px"
                >${{ calcTotalPrice }}</span
              >
            </v-card-text>

            <v-divider length="100%" color="black"></v-divider>
            <v-card-text> Get Shipping Estimate: </v-card-text>
            <select
              name=""
              id=""
              class="w-100 pa-3"
              style="border: 1px solid black; border-radius: 30px; font-size: 14px"
            >
              <option value="" v-for="country in countries" :key="country">
                {{ country }}
              </option>
            </select>
            <div class="states">
              <select
                name=""
                id=""
                class="pa-3 mt-4"
                style="
                  width: 55%;
                  border: 1px solid black;
                  border-radius: 30px;
                  font-size: 14px;
                "
              >
                <option value="" v-for="country in countries" :key="country">
                  {{ country }}
                </option>
              </select>
              <input
                type="text"
                class="pa-3 mt-4"
                style="
                  width: 43%;
                  border: 1px solid black;
                  border-radius: 30px;
                  font-size: 14px;
                  margin-left: 1%;
                "
              />
            </div>
            <v-card-actions class="px-0 my-5">
              <v-btn
                color="blue"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  border-color: rgb(199, 199, 199);
                "
                variant="elevated"
                density="compact"
                height="45"
                class="w-100 text-white"
                >Caculator Shipping</v-btn
              >
            </v-card-actions>
            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-text class="d-flex align-center justify-space-between">
              <span>TOTAL:</span>
              <span class="font-weight-bold" style="font-size: 15px"
                >${{ calcTotalPrice }}</span
              >
            </v-card-text>
            <v-divider length="100%" color="black"></v-divider>
            <v-card-actions class="px-0 my-5 flex-column">
              <v-btn
                color="blue"
                style="text-transform: none; border-color: rgb(199, 199, 199)"
                variant="elevated"
                density="compact"
                height="45"
                class="w-100 text-white"
                @click="toCheckout"
                >Proceed to Checkout</v-btn
              >
            </v-card-actions>
            <v-card-actions class="px-0 my-5">
              <v-btn
                color="blue"
                style="text-transform: none; border-color: rgb(199, 199, 199)"
                variant="outlined"
                density="compact"
                height="45"
                class="w-100 text-white"
                @click="$router.push({ name: 'home' })"
                >Continue Shopping</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { cartStore } from "@/store/cart";

export default {
  inject: ["Emitter"],
  data() {
    return {
      drawer: true,
      countries: ["VN", "Laos", "ThaiLand", "Japan"],
    };
  },
  mounted() {
    this.Emitter.on("openCart", () => {
      this.drawer = true;
    });
    this.getCartItems();
  },
  methods: {
    ...mapActions(cartStore, ["getCartItems", "deleteItems", "setToLocalStorage"]),
    toCheckout() {
      this.setToLocalStorage();
      this.$router.push({name: 'checkout'});
    }
  },
  computed: {
    ...mapState(cartStore, ["cartItems"]),
    calcTotalPrice() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total +=
          Math.ceil(item.price - item.price * (item.discountPercentage / 100)) *
          item.quantity;
      });
      return total;
    },
  },
};
</script>

<style lang="scss">
.items-card {
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(126, 125, 125);
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    background-color: rgb(126, 125, 125);
  }
}
</style>
