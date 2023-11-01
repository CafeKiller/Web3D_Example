import {createStore} from "vuex";

// 创建一个store实例
const store = createStore({
    state(){
        return {
            isFullscreen: false,
            buyCartList: []
        }
    },
    mutations:{
        setFullscreen(state, payload){
            state.isFullscreen = payload
        },
        // 添加商品
        addBuyCarts( state, payload ){
            state.buyCartList.push(payload)
        },
        // 添加商品数量
        addBuyCartsNum(state, payload){
            state.buyCartList[payload].num++
        }

    },
    getters:{

    },
    actions:{

    }
})

export default store