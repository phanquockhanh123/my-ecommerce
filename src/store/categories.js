import axiosInstance from "../service/axiosInteceptor";
import { defineStore } from "pinia";

export const categoriesModule = defineStore("categoriesModule", {
  state: () => ({
    listCates: [],
  }),
  actions: {
    async getCategories() {
      await axiosInstance
        .get("/admin/categories")
        .then((res) => {
          this.listCates = res.data.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
});