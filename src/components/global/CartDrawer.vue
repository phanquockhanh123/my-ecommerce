<template>
    <div class="drawer">
        <v-navigation-drawer v-model="drawer" @openCart="openCart" location="right">
            <p>Navbar</p>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    inject: ["Emitter"],
    data() {
        return {
            drawer: false
        };
    },
    methods: {
        openCart() {
            this.drawer = true;
        }
    },
    mounted() {

    }
}
</script>
