<template>
  <div class="products-category pt-12">
    <h1 class="text-center">{{  $route.params.title }}</h1>
    <v-container fluid v-if="cateProducts">
      <v-card  :loading="loading" class="pt-5">
        <v-row>
        <v-col cols="3" v-for="item in cateProducts" :key="item.id" class="px-5">
          <v-card elevation="0" class="pb-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div class="img-parent" style="height: 200px; overflow: hidden">
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
                      style="border: 1px solid rgb(135, 135, 1); border-radius: 50%"
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
import { mapActions, mapState } from 'pinia';

export default {
  data: () => ({
    showenItem: {},
    loading: false
  }),
  methods: {
    ...mapActions(productsModule, ["getProductsByCategory"]),
  },
  computed: {
    ...mapState(productsModule, ["cateProducts"]),
  },
  async mounted() {
    this.loading = true;
    await this.getProductsByCategory(this.$route.params.category);
    this.loading = false;
  },
  watch: {
    async $route() {
      this.loading = true;
      await this.getProductsByCategory(this.$route.params.category);
      this.loading = false;
    }
  }
}
</script>