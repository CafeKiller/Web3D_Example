import {Component, GameObject} from "@eva/eva.js";
import {Physics} from "@eva/plugin-matterjs";
import store from "../store";
import {Sprite} from "@eva/plugin-renderer-sprite";

import createBar from "../gameObjects/bars";

export default class BarNext extends Component {
    gameObject: GameObject
    static componentName = "barNext"
    update() {
        const physics = this.gameObject.getComponent(Physics)

        if (store.status === "playing"){
            if (physics.body){
                let x = physics.body.position.x
                const only
                    = this.gameObject.getComponent(Sprite).spriteName === "bar.png"
                // 溢出屏幕
                if (x === -130){
                    this.gameObject.getComponent(Physics).removeAllListeners()
                    store.game.scene.removeChild(this.gameObject)
                    this.gameObject.destroy()
                    console.log("[success] 溢出管道销毁成功")
                    return
                }
                if (x == 60){
                    // 只判断下面的管道
                    if (only){
                        console.log("得分+1")
                        store.score += 1
                    }
                }
                if (x == 500){
                    // 新建一个管道
                    if (only){
                        createBar()
                    }
                }
            }

        }
    }
}