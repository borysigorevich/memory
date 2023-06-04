import {utils} from "../utils.js";
import {matchGrid} from "../match-grid.js";
import {timer} from "../set-timer.js";
import {playground} from "../playground.js";
import {palette} from '../palette.js'
import {Button} from "./button.js";

export class StartButton extends Button {

    constructor() {
        super('.start-mode__modal-button-start')
        this.button.addEventListener('click', this.startGame.bind(this))
    }

    startGame() {
        const startModeDiv = utils.getNodeElement('.start-mode');
        startModeDiv.style.display = 'none';
        palette.setColorPalette(matchGrid.color)
        matchGrid.isStarted = true
        timer.setTimer()
        playground.generateGridItems()
    }
}