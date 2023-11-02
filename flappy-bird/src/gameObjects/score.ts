import {GameObject} from "@eva/eva.js";
import { Text } from "@eva/plugin-renderer-text"
import UpdateScore from "../component/updateScore";
import {EvaX} from "@eva/plugin-evax";
import store from "../store";

export default () => {

    const score = new GameObject("overScore", {
        size: {width:179, height:79},
        position: {x:350, y:1220},
        anchor: {x:0, y:0},
        origin: {x:0.5, y:0.5},
    })

    score.addComponent(
        new Text({
            text: "得分: 0",
            style: {
                fontFamily: "Arial",
                fontSize: 46,
                fontStyle: "italic",
                fontWeight: "bold",
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 5,
                dropShadow: true,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 400,
                breakWords: true
            }
        })
    )

    score.addComponent(new UpdateScore())

    score.addComponent(
        new EvaX({
            events: {
                "store.score"(store: any, oldStore:any){
                    console.log("listen", store, oldStore)
                    score.getComponent(UpdateScore).updateScore(store)
                }
            }
        })
    )
    store.game.scene.addChild(score)

    return { score }
}
