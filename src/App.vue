<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script setup>
import Header from "./components/Header.vue";
import {useRoute, useRouter} from "vue-router";
import HomeComp from "@/components/HomeComp.vue";
import {onErrorCaptured} from "vue";

let route = useRoute()
let router = useRouter()
onErrorCaptured(err => {
    console.log('Caught error', err)
})
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
