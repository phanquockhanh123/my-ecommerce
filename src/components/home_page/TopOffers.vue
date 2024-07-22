<template>
  <div class="top-offers bg-grey-lighten-4 pt-9 pb-16">
    <v-container fluid>
      <v-row>
        <v-col cols="4" class="py-0 pr-6">
          <v-hover v-slot="{isHovering, props}">
            <div class="parent" v-bind="props" style="overflow: hidden; height:100%;border-radius:7px0">
            <img src="@/assets/images/playstations.webp" :style="`width:100%;height:100%;cursor:pointer;transition: 0.5s all ease-in-out;scale: ${isHovering ? 1.1 : 1}`" alt="">
            </div>
          </v-hover>
        </v-col>
        <v-col cols="4" class="py-0 pr-6">
          <v-hover v-slot="{isHovering, props}">
            <div class="parent" v-bind="props" style="overflow: hidden; height:100%;border-radius:7px">
            <img src="@/assets/images/headset.webp" :style="`width:100%;height:100%;cursor:pointer;transition: 0.5s all ease-in-out;scale: ${isHovering ? 1.1 : 1}`" alt="">
            </div>
          </v-hover>
        </v-col>
        <v-col cols="4" class="py-0 pr-6">
          <v-hover v-slot="{isHovering, props}">
            <div class="parent" v-bind="props" style="overflow: hidden; height:100%;border-radius:7px">
            <img src="@/assets/images/chairs.webp" :style="`width:100%;height:100%;cursor:pointer;transition: 0.5s all ease-in-out;scale: ${isHovering ? 1.1 : 1}`" alt="">
            </div>
          </v-hover>
        </v-col>
        <v-row class="mt-5">
          <v-col cols="6" class="mt-3" >
          <v-hover v-slot="{isHovering, props}">
            <div class="parent pr-2" v-bind="props" style="overflow: hidden; height:100%;border-radius:7px">
            <img src="@/assets/images/iphones.webp" :style="`width:100%;height:100%;cursor:pointer;transition: 0.5s all ease-in-out;scale: ${isHovering ? 1.1 : 1}`" alt="">
            </div>
          </v-hover>
        </v-col>
        <v-col cols="6" class="mt-3" >
          <v-hover v-slot="{isHovering, props}">
            <div class="parent pl-2" v-bind="props" style="overflow: hidden; height:100%;border-radius:7px">
            <img src="@/assets/images/laptops.webp" :style="`width:100%;height:100%;cursor:pointer;transition: 0.5s all ease-in-out;scale: ${isHovering ? 1.1 : 1}`" alt="">
            </div>
          </v-hover>
        </v-col>
        </v-row>
      </v-row></v-container>
  </div>
</template>
