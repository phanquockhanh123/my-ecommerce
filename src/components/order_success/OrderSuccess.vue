<template>
    <div class="order-success">
        <v-dialog v-model="dialog" width="50%" persistant>
            <v-card class="text-center pt-5">
                <div class="text-center">
                    <v-icon style="background: white;color:green;width: 80px;height: 80px;border-radius: 50%;font-size: 75px;border: 1px solid green" color="green" size="75" >mdi-check</v-icon>
                </div>
                <v-card-title style="font-size: 30px;font-weight: bold">Order placed successfully</v-card-title>
                <v-card-text>
                    Order sucess  Order sucess  Order sucess  Order sucess Order sucess  Order sucess
                </v-card-text>
                <v-card-actions class="mt-5 justify-center">
                    <v-btn variant="elevated" color="blue" @click="resetData">Got it</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<script>
import { cartStore } from "@/store/cart";
import { mapActions } from "pinia";


export default  {
    data: () => ({
        dialog: false,
    }),
    props: {
        popup: {
            type: Boolean,
        },
    },
    mounted() {
        this.dialog = this.popup;
    },
    watch: {
        dialog(newVal) {
            if (!newVal) {
                setTimeout(() => {
                    this.$emit("close_popup");
                }, 2000);
            }
        }
    },
    methods: {
        ...mapActions(cartStore, ["resetItems"]),
        resetData() {
            this.resetItems();
            this.dialog = false;
            this.$router.push({name: "home"});
        }
    }
    
}
</script>