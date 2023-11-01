<template>
  <suspense>
      <template #fallback>
          <div class="loading">
              <Loading></Loading>
          </div>
      </template>
      <template #default>
          <HomeAsync></HomeAsync>
      </template>
  </suspense>
</template>

<script setup>

import {defineAsyncComponent, onMounted} from "vue";
import {getHomePage} from "@/api/index.js";
import LoadingError from "@/components/LoadingError.vue";
import Loading from "@/components/Loading.vue";
import HomeComp from "@/components/HomeComp.vue"

const HomeAsync = defineAsyncComponent(() => {
    return import('@/components/HomeComp.vue')
} )

// const HomeAsync = defineAsyncComponent({
//     loader: () => import('@/components/HomeComp.vue'),
//     // loadingComponent: Loading,
//     // errorComponent:LoadingError,
//     // delay: 1000,
//     // timeout: 3000
// })

// onMounted(async ()=>{
//     const result = await getHomePage()
//     console.log("views/Home",result)
// })
</script>

<style scoped>

</style>