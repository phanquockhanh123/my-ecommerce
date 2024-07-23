<template>
    <div class="product-details pt-10">
        <h1></h1>
        <v-container fluid>
            <v-row>
                <v-col cols="7">
                    <img :src="product.thumbnail" class="w-100" alt="">
                </v-col>
                <v-col cols="5" class="pt-0 pl-6">
                    <v-card elevation="0">
                        <v-card-title class="px-0" style="font-size: 18px; font-weight: bold;">({{ product.title }})
                            Sample- {{ product.category }} For Sale</v-card-title>
                        <div class="rating-parent d-flex align-center" style="gap:10px;">
                            <v-rating v-model="product.rating" half-increments readonly color="yellow-darken-2"
                                size="x-small" density="compact">
                            </v-rating>
                            <span class="mt-1" style="color: black;font-size: 15px;">Stock: {{ product.stock }}</span>
                        </div>
                        <v-card-text class="px-0" style="color: black;font-size: 15px;">{{ product.description
                            }}</v-card-text>
                        <v-card-text class="px-0 pt-0" style="color: black;font-size: 15px;">Brand: {{ product.brand
                            }}</v-card-text>
                        <v-card-text class="px-0 pt-0" style="color: black;font-size: 15px;">Sku: {{ product.sku
                            }}</v-card-text>
                        <v-card-text class="px-0 pt-0" style="color: black;font-size: 15px;">Available: {{ product.stock
                        > 0 ? 'In stock' : 'Out of stock' }}</v-card-text>
                        <v-card-text>
                            <del>{{ product.price }}</del> From
                            <span class="text-red" style="font-weight: 900; font-size: 16px">${{
                        Math.ceil(product.price - product.price * (product.discountPercentage / 100))
                                }}</span>
                        </v-card-text>
                        <v-card-text class="pl-0 pt-0">Quantity</v-card-text>
                        <div class="counter px-1"
                            style="border-radius: 30px;border: 1px solid black; width: fit-content">
                            <v-icon size="25">mdi-minus</v-icon>
                            <input type="number" style="border: none;outline: none;width:60px" class="text-center py-2"
                                min="1" value="1" />
                            <v-icon size="25">mdi-plus</v-icon>
                        </div>
                        <v-card-actions class="mt-7 w-100 px-0">
                            <v-btn variant="outlined"
                                style="text-transform: none;border-radius: 30px;background-color: black;"
                                class="w-75 text-white" density="compact" height="55">Add To Cart</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// import { mapActions, mapState } from 'pinia';
// import { productsModule } from '@/store/products';

export default {
    data: () => ({
        product: {
            "id": 1,
            "title": "Essence Mascara Lash Princess",
            "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            "category": "beauty",
            "price": 9.99,
            "discountPercentage": 7.17,
            "rating": 4.94,
            "stock": 5,
            "tags": [
                "beauty",
                "mascara"
            ],
            "brand": "Essence",
            "sku": "RCH45Q1A",
            "weight": 2,
            "dimensions": {
                "width": 23.17,
                "height": 14.43,
                "depth": 28.01
            },
            "warrantyInformation": "1 month warranty",
            "shippingInformation": "Ships in 1 month",
            "availabilityStatus": "Low Stock",
            "reviews": [
                {
                    "rating": 2,
                    "comment": "Very unhappy with my purchase!",
                    "date": "2024-05-23T08:56:21.618Z",
                    "reviewerName": "John Doe",
                    "reviewerEmail": "john.doe@x.dummyjson.com"
                },
                {
                    "rating": 2,
                    "comment": "Not as described!",
                    "date": "2024-05-23T08:56:21.618Z",
                    "reviewerName": "Nolan Gonzalez",
                    "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
                },
                {
                    "rating": 5,
                    "comment": "Very satisfied!",
                    "date": "2024-05-23T08:56:21.618Z",
                    "reviewerName": "Scarlett Wright",
                    "reviewerEmail": "scarlett.wright@x.dummyjson.com"
                }
            ],
            "returnPolicy": "30 days return policy",
            "minimumOrderQuantity": 24,
            "meta": {
                "createdAt": "2024-05-23T08:56:21.618Z",
                "updatedAt": "2024-05-23T08:56:21.618Z",
                "barcode": "9164035109868",
                "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
            },
            "images": [
                "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
            ],
            "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
        }
    }),
    // methods: {
    //     ...mapActions(productsModule, ["getProductDetail"]),
    // },
    // async mounted() {
    //     await this.getProductDetail();
    // },
    // computed: {
    //     ...mapState(productsModule, ["productDetail"])
    // }
}
</script>