import {Component, GameObject} from "@eva/eva.js"
import { Text } from "@eva/plugin-renderer-text"

class UpdateScore extends Component {
    gameObject: GameObject;
    static componentName: "UpdateScore";
    updateScore(score: number) {
        this.gameObject.getComponent(Text).text = `得分: ${score}`
    }
}

export default UpdateScore