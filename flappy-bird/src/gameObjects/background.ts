import {GameObject} from "@eva/eva.js";
import {TilingSprite} from "@eva/plugin-renderer-tiling-sprite";
import {Physics, PhysicsType} from "@eva/plugin-matterjs";
import store from "../store";

export default () => {
    // 背景
    const bg:GameObject = new GameObject("bg", {
        size: {width: 720, height: 1280}
    })
    bg.addComponent(
        new TilingSprite({
            resource: "bg",
            tileScale: {x:1, y:1},
            tilePosition: {x:0, y:0}
        })
    )

    // 草地背景
    const ground:GameObject = new GameObject("ground", {
        size: {width:720, height: 320},
        position: {x:0, y:0},
        anchor: {x:0, y:0},
        origin: {x:0.5, y:0.5},
        scale: {x:2, y:2}
    })
    ground.addComponent(
        new TilingSprite({
            resource: "ground",
            tileScale: {x:1, y:1},
            tilePosition: {x:0, y:0}
        })
    )
    ground.addComponent(
        new Physics({
            type:PhysicsType.RECTANGLE,
            bodyOptions: {
                isStatic: true
            }
        })
    )

    // 将草地添加到背景
    bg.addChild(ground)
    // 将背景添加到game中
    store.game.scene.addChild(bg)

    return { bg }
}