import { defineStore } from "pinia";
import axios from "axios";

export const productsModule = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    topProducts: [],
    productDetail: [],
    categories: [
      {
        title: "Beauty",
        route: "beauty"
      },
      {
        title: "Fragrances",
        route: "fragrances"
      },
      {
        title: "Furniture",
        route: "furniture"
      },
      {
        title: "Groceries",
        route: "groceries"
      },
      {
        title: "Home-decoration",
        route: "home-decoration"
      },
      {
        title: "Laptops",
        route: "laptops"
      }
    ],
    cateProducts: [],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.newProducts = res.data.products.filter(el => el.category == "beauty");
          this.flashDeals = res.data.products.slice(0, 8);
          this.topProducts = res.data.products.filter(el => el.category == "fragrances");
        })
        .catch((err) => console.log(err));
    },
    async getProductsByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => {
          this.cateProducts = res.data.products;
        })
        .catch((err) => console.log(err));
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => {
          this.productDetail = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
