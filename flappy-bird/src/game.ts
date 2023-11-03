import {Game} from "@eva/eva.js";
import {RendererSystem} from "@eva/plugin-renderer";
import {TextSystem} from "@eva/plugin-renderer-text";
import {ImgSystem} from "@eva/plugin-renderer-img";
import {StatsSystem} from "@eva/plugin-stats";
import {SpriteAnimationSystem} from "@eva/plugin-renderer-sprite-animation";
import {SpriteSystem} from "@eva/plugin-renderer-sprite";
import {EventSystem} from "@eva/plugin-renderer-event";
import {TilingSpriteSystem} from "@eva/plugin-renderer-tiling-sprite";
import {EvaXSystem} from "@eva/plugin-evax";
import {PhysicsSystem} from "@eva/plugin-matterjs";

console.warn(document.querySelector("#debugger"))

export default () => {
    return new Game({
        frameRate: 120, //帧数
        autoStart: true,
        // 需要添加的系统
        systems: [
            // 渲染
            new RendererSystem({
                canvas: document.querySelector("#canvas"),
                width: 720,
                height: 1280,
                resolution: window.devicePixelRatio/2, // 二倍图除2
            }),
            new TextSystem(), // 文字
            new ImgSystem(), // 图片
            new RendererSystem(), // 遮挡透明度
            new StatsSystem(), // 性能监控系统
            new SpriteAnimationSystem(), // 帧图
            new SpriteSystem(), // 精灵图
            new EventSystem(), // 事件
            new TilingSpriteSystem(), // 平铺精灵
            new EvaXSystem(), // EvaX
            // 物理引擎系统
            new PhysicsSystem({
                resolution: window.devicePixelRatio/2,
                isTest: true,
                element: document.querySelector("#debugger"),
                world: {
                    gravity:{y: 1} // gravity
                }
            })
        ]
    })
}