import { defineStore } from "pinia";
// import axios from "axios";

export const cartStore = defineStore("cartStore", ({
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addItem(item) {
      let exists = false;
      for(let i =0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id == item.id) {
          this.cartItems[i].quantity += item.quantity;
          exists = true;
          break;
        }
      }

      if (!exists) {
        this.cartItems.push(item);
      }
      this.cartItems.push(item);
      
      localStorage.setItem('cart-items', JSON.stringify(this.cartItems))
      console.log(this.cartItems);
    }
  }
}))