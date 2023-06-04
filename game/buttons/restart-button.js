import {utils} from "../utils.js";
import {timer} from "../set-timer.js";
import {playground} from "../playground.js";
import {matchGrid} from "../match-grid.js";
import {Button} from "./button.js";

export class RestartButton extends Button {
    constructor() {
        super('.end-mode__modal-button-restart')
        this.button.addEventListener('click', this.restartGame.bind(this))
    }

    restartGame = () => {
        const endModeNode = utils.getNodeElement('.end-mode');
        endModeNode.classList.remove('open')
        const gridItems = utils.getNodeElement('.game__grid-items');
        gridItems.innerHTML = ''

        timer.setTimer()
        playground.generateGridItems(timer.time, matchGrid)
    }
}