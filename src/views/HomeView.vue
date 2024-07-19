<template>
  <div class="home">
    <UpperBanner />
    <TheFeature />
  </div>
</template>

<script>
import UpperBanner from '@/components/home_page/UpperBanner';
import TheFeature from '@/components/home_page/TheFeature';

export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeature
  }
};
</script>
