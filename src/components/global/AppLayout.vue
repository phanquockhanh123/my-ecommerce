<template>
    <div class="layout">
        <v-layout class="position-relative">

            <CartDrawer />
            <v-main style="padding-top: 150px;">
                <slot></slot>
            </v-main>

            <AppNav />

            <AppFooter />
        </v-layout>
    </div>
</template>
<script>
import AppNav from './AppNav.vue';
import CartDrawer from './CartDrawer.vue';
import AppFooter from './AppFooter.vue';
export default {
    components: {
        CartDrawer,
        AppNav,
        AppFooter
    },
    data: () => ({
        drawer: true,
    })
}
</script>
