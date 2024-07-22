<template>
  <div class="home">
    <UpperBanner />
    <TheFeature />
    <TopOffer />
    <ProductsSwiper :products="products"/>
  </div>
</template>

<script>
import UpperBanner from '@/components/home_page/UpperBanner';
import TheFeature from '@/components/home_page/TheFeature';
import TopOffer from '@/components/home_page/TopOffers';
import ProductsSwiper from '@/components/home_page/ProductsSwiper';
import { productsModule } from '@/store/products';
import { mapActions, mapState } from 'pinia';

export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeature,
    TopOffer,
    ProductsSwiper
  },
  methods: {
    ...mapActions(productsModule, ["getProducts"]),
  },
  async mounted() {
    await this.getProducts();
  },
  computed: {
    ...mapState(productsModule, ["products"])
  }
};
</script>
