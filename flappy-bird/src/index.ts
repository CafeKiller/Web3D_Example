import {LOAD_EVENT, resource} from "@eva/eva.js";

import sources, {resourceType} from "./resources"

// 加载资源
resource.addResource(sources as resourceType[])

// 资源加载进度更新
resource.on(LOAD_EVENT.PROGRESS, (value) => {
    console.log(`进度加载: ${value.progress * 100}%`)
    document.querySelector("#progress").nodeValue = value.progress
})

// 资源加载完成
resource.on(LOAD_EVENT.COMPLETE, ()=>{
    console.log("[success]资源加载完成!!!!!")
    // const game = createGame

})
