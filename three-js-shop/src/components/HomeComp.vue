<template>
    <div class="home-page">
        <HomeSwiper :banner="state.banner"></HomeSwiper>
        <div class="live" v-if="state.sports.length !== 0">
            <h1>乐享生活100+</h1>
            <div class="live-list">
                <div class="live-item" v-for="idx in 10" :key="state.sports[idx].priority">
                    <div class="live-btn">
                        <img :src="state.sports[idx].menuThumbnail" :alt="state.sports[idx].displayName">
                        <h3>{{ state.sports[idx].displayName }}</h3>
                    </div>
                </div>
            </div>
            <a-button type="primary" size="large" @click="router.push('/product')">进入3D商店</a-button>
        </div>
    </div>
</template>

<script setup>
  import {getHomePage} from "@/api/index.js";
  import {reactive} from "vue";
  import {useRouter} from "vue-router";
  import HomeSwiper from "@/components/HomeSwiper.vue";

  const router = useRouter()

  const result = await getHomePage()

  const state = reactive({
      banner: result.banner,
      sports: result.sports
  })
</script>

<style scoped lang="less">
.home-page {
    padding-top: 60px;
    font-size: 100px;
}
.live {
    padding-bottom: 30px;
    width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    h1 {
    font-size: 30px;
    }
    .live-list{
        display: flex;
        flex-wrap: wrap;
        .live-item {
            width: 240px;
        }
        .live-btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 73px;
            width: 200px;
            background-color: #ffffff;
            border-radius: 8px 8px 16px 8px;
            margin-bottom: 30px;
            box-shadow: 3px 10px 10px rgba(0,0,0,.3);
            img {
                position: absolute;
                width: 80px;
                height: 80px;
                left: -15px;
                top: -15px;
            }
            h3 {
                font-weight: bold;
                font-size: 20px;
            }
        }
    }

}
</style>