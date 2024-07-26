<template>
  <div class="home">
    <UpperBanner />
    <TheFeature />
    <TopOffer />
    <ProductsSwiper :products="flashDeals" title="Flash Deals" titleColor="red" :index="0"/>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <img src="@/assets/images/band-left-cover.webp" alt="" class="w-100" >
        </v-col>
        <v-col cols="6">
          <img src="@/assets/images/band-right-cover.webp" alt="" class="w-100" >
        </v-col>
      </v-row>
    </v-container>
    <TopCategories />
    <NewProducts :products="newProducts"/>
    <QualityFeatures />
    <ProductsSwiper :products="topProducts" title="Top Products" titleColor="blue" :index="3"/>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <img src="@/assets/images/tv-banner.webp" class="w-100" alt="">
        </v-col>
        </v-row>
    </v-container>
    <WhyShopWithUs />
  </div>
</template>

<script>
import UpperBanner from '@/components/home_page/UpperBanner';
import TheFeature from '@/components/home_page/TheFeature';
import TopOffer from '@/components/home_page/TopOffers';
import ProductsSwiper from '@/components/home_page/ProductsSwiper';
import TopCategories from '@/components/home_page/TopCategories';
import NewProducts from '@/components/home_page/NewProducts';
import { productsModule } from '@/store/products';
import { mapActions, mapState } from 'pinia'
import QualityFeatures from '@/components/home_page/QualityFeatures';
import WhyShopWithUs from '@/components/home_page/WhyShopWithUs';

export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeature,
    TopOffer,
    ProductsSwiper,
    TopCategories,
    NewProducts,
    QualityFeatures,
    WhyShopWithUs
  },
  methods: {
    ...mapActions(productsModule, ["getProducts"]),
  },
  async mounted() {
    await this.getProducts();
  },
  computed: {
    ...mapState(productsModule, ["flashDeals", "newProducts", "topProducts"])
  }
};
</script>
