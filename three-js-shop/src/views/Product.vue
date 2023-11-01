<template>
    <!--  进入加载 start  -->
    <div class="loading" v-show="state.isLoading">
        <Loading :progress="state.progress"></Loading>
    </div>
    <!--  进入加载 end  -->
    <div class="product" id="product" v-show="!state.isLoading">

        <!-- 产品描述    -->
        <template v-if="state.products[state.pIdx]">
            <div class="desc" :class="{ active: state.descIdx === idx}" v-for="(desc, idx) in state.products[state.pIdx].desc" :key="idx">
                <h1 class="title">{{ desc.title }}</h1>
                <p class="content">{{ desc.content }}</p>
            </div>
        </template>

        <!-- 全部产品展示     -->
        <div class="product-list" :class="{ hide: store.state.isFullscreen }">
            <h1><SketchOutlined></SketchOutlined>产品推荐</h1>
            <div class="products">
                <div class="product-item" v-for="(prod, pIdx) in state.products" :key="prod.id" @click="changeModel(prod,pIdx)">
                    <div class="product-title">{{ prod.title }}</div>
                    <div class="img-box">
                        <img :src="prod.imgsrc" :alt="prod.title">
                    </div>
                    <a-button type="primary" block @click="addBuyCart(prod)">
                        <template #icon>
                            <ShoppingCartOutlined></ShoppingCartOutlined>
                        </template>
                        加入购物车
                    </a-button>
                </div>
            </div>
        </div>

        <!--  场景替换  -->
        <div class="scene-list" :class="{ hide: store.state.isFullscreen }">
            <h3> <RadarChartOutlined></RadarChartOutlined> 切换使用场景</h3>
            <div class="scenes">
                <div class="scene-item" v-for="(scene, sIdx) in state.scenes" :key="`${scene}_${sIdx}`" @click="changeHdr(scene,sIdx)">
                    <img :class="{ active: state.sceneIdx === sIdx }" :src="`./files/hdr/${scene}.jpg`" :alt="scene">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import {onMounted, reactive} from "vue";
import {useStore} from "vuex";
import {getProducts} from "@/api/index.js";
import { SketchOutlined, ShoppingCartOutlined, RadarChartOutlined } from "@ant-design/icons-vue"
import Base3D from "@/utils/Base3D.js";


const store = useStore()
console.log(store.state)
const state = reactive({
    products:[],
    isLoading: true,
    scenes: [],
    sceneIdx:0,
    base3D: {},
    progress: 0,
    pIdx: 0,
    descIdx: 0,
})

// 加载完成函数
function LoadingFinish(){
    state.isLoading = false
}

// 更换商品
function changeModel(prod, index){
    state.pIdx = index
    state.base3D.setModel(prod.modelName)
}

// 更换场景
function changeHdr(scene, index){
    state.sceneIdx = index
    state.base3D.setEnvMap(scene)
}

// 将商品添加到购物车
function addBuyCart(prod){
    let product = {...prod, num:1}
    let index = 0
    let isExist = store.state.buyCartList.some((item, i)=>{
        if(product.id === item.id){
            index = i
            return true
        }else{
            return false
        }
    })

    if (isExist){
        store.commit("addBuyCartsNum", index)
    }else{
        store.commit("addBuyCarts", product)
    }
}

onMounted(async ()=>{
    let result = await getProducts()
    console.log(result)
    state.products = result.list
    state.scenes = result.hdr
    state.base3D = new Base3D('#product',LoadingFinish)
    state.base3D.onProgress((e) => {
        // console.log(e)
        let progressNumber = e.loaded / e.total
        progressNumber = progressNumber.toFixed(2) * 100
        state.progress = progressNumber
    })
})


window.addEventListener('mousewheel',(e)=>{
    if (e.deltaY > 0){
        store.commit("setFullscreen", true)
    }else if(e.deltaY < 0){
        store.commit("setFullscreen",false)
    }
})

// 窗口添加监听函数
window.addEventListener("mousewheel",(e) =>{
    let duration = state.base3D.animeAction._clip.duration
    let time = state.base3D.animeAction.time
    let index = Math.floor((time / duration)*4)
    state.descIdx = index
})
</script>

<style lang="less" scoped>
.desc{
    padding: 10px;
    position: fixed;
    top: 120px;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    border-radius: 20px;
    background-color: rgba(255,255,255,.7);
    transform: translate(-100vw, 0);
    transition: all .5s ease-in;
    z-index: 1000;
}
.desc.active{
    transform: translate(0,0);
}

.product-list{
    width: 300px;
    height: 100vh;
    padding-top: 70px;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(255,255,255,.8);
    transition: all .5s ease-in;
    z-index: 900;
    h1 {
        font-size: 20px;
        font-weight: bold;
        padding: 10px 25px 0;
    }
    .products {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .product-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 250px;
            //height: 200px;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            margin: 10px 0;
            box-shadow: 2px 5px 5px rgba(0,0,0,.3);
            transition: all .3s ease-in;
            &.active{
                box-shadow: 2px 5px 5px rgba(0,0,0,.5) , 0px 0px 10px #733c13
            }
            &:hover{
                transform: translateY(-5px);
                box-shadow: 2px 5px 5px rgba(0,0,0,.5), 0px 0px 10px #733c13
            }
            img {
                width: 190px;
            }
            .prod-title{
                padding: 0 20px;
            }
        }
    }
}
.product-list.hide{
    transform: translate(-100%,0);
}

.scene-list {
    width: 300px;
    height: 100vh;
    padding: 60px 0 0;
    position: fixed;
    z-index: 900;
    transition: all 0.5s;
    background-color: rgba(255, 255, 255, 0.8);
    right: 0;
    top: 0;
    h3 {
        font-size: 20px;
        font-weight: 900;
        padding: 0 30px;
    }
    .scenes {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .scene-item {
        padding: 6px 0;

        img {
            width: 250px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px #666;
            transition: all 0.3s;
            &.active {
                box-shadow: 2px 2px 5px #666, 0px 0px 10px #733c13;
            }
            &:hover {
                transform: translate(0px, -5px);
                box-shadow: 2px 2px 5px #666, 0px 0px 10px #733c13;
            }
        }
    }
}
.scene-list.hide {
    transform: translate(100%, 0);
}
</style>