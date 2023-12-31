import {LOAD_EVENT, resource} from "@eva/eva.js";
import {Physics, PhysicsType} from "@eva/plugin-matterjs";
import {Event} from "@eva/plugin-renderer-event";

import sources, {resourceType} from "./resources"
import store from "./store";

import createGame from "./game"
import createBg from "./gameObjects/background"
import createBird from "./gameObjects/bird"
import createScore from "./gameObjects/score"
import createReady from "./gameObjects/ready"
import createBar from "./gameObjects/bars"
import createOver from "./gameObjects/over"


// 加载资源
resource.addResource(sources as resourceType[])

// 资源加载进度更新
resource.on(LOAD_EVENT.PROGRESS, (value) => {
    console.log(`进度加载: ${value.progress * 100}%`)
    document.querySelector("#progress").innerHTML = value.progress
})

// 资源加载完成
resource.on(LOAD_EVENT.COMPLETE, ()=>{
    console.log("[success]资源加载完成!!!!!")
    const game = createGame()
    store.game = game

    // 初始化
    init()

    // 事件监听
    listen()
})

// 资源预加载
resource.preload()

/**
 * @function 初始化
 * @description 创建基本对象
 * @Author CoffeeKiller
 * @Date 2023_11_03
 * */
let init: () => void
init = () => {
    // 创建背景
    createBg()

    // 创建小鸟
    createBird()

    // 创建得分标题
    createScore()

    // 创建标题按钮
    createReady()
}

/**
 * @function 监听
 * @description 对game相应事件进行监听
 * @Author CoffeeKiller
 * @Data 2023_11_03
 * */
let listen: () => void
listen = () => {
    const { game } = store

    const title = game.scene.gameObjects.find(
        (item:any) => item.name === "ready-title"
    );
    const taps = game.scene.gameObjects.find(
        (item:any) => item.name === "ready-taps"
    );
    const bird = game.scene.gameObjects.find(
        (item:any) => item.name === "bird"
    )

    game.on("start", () => {
        if(store.status != "ready") return

        store.status = "playing"

        // 移除准备按钮
        game.scene.removeChild(title)
        game.scene.removeChild(taps)

        // 创建管道
        createBar()

        // bird添加物理引擎
        const birdPhysics = bird.addComponent(
            new Physics({
                type: PhysicsType.RECTANGLE,
                bodyOptions: {
                    isStatic: false,
                    frictionAir: 0.1,
                    friction: 0.06,
                    frictionStatic: 0.3,
                    force: {x: 0, y:0},
                },
                stopRotation: true
            })
        )

        // 监听game的tap时间
        const evt = game.scene.addComponent(new Event())
        evt.on("tap", () => {
            if (birdPhysics){
                try{
                    birdPhysics.body.force.y -= 0.3
                }catch (err) {
                    console.error(`[error] ${err}`)
                }
            }
        })

        // 碰撞检查
        birdPhysics.on("collisionStart", () => {
            store.status = "over"

            // 创建结束标题
            createOver()

            // 移除bird物理引擎
            bird.removeComponent(birdPhysics)

            // 移除game tap事件
            game.scene.removeComponent(evt)
        })

    })

    game.on("ready", () => {
        store.status = "ready"
        store.score = 0

        // 移除结束标题按钮
        // get ready
        const overBox = game.scene.gameObjects.find(
            (item:any) => item.name === "overBox"
        )
        game.scene.removeChild(overBox)

        // 新增准备按钮
        game.scene.addChild(title)
        game.scene.addChild(taps)

        // 重置小鸟位置
        bird.transform.position.x = 100
        bird.transform.position.y = 640

        // 删除所有管道
        const pipes = game.scene.gameObjects.filter(
            (item:any) => item.name === "bar"
        )
        pipes.forEach((pipe:any) => {
            game.scene.removeChild(pipe)
            pipe.destroy()
        })
    })

}