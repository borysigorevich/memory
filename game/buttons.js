import {utils} from './utils.js'
import {gameGrid} from "./match-grid.js";
import {timer} from "./set-timer.js";
import {playground} from "./game-logic.js";

export class Buttons {

    constructor(selector) {
        this.button = utils.getNodeElement(selector)
    }
}

export class OptionButtons {

    constructor() {
        this.buttons = this.getAllButtonNodes('.start-mode__option-button')
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.setOptionButtonEvent(button))
        })
    }

    setOptionButtonEvent(button) {
        console.log(button, 'button')
        const dataSet = Object.entries(button.dataset)[0]
        const dataKey = dataSet[0]
        const dataValue = dataSet[1]

        gameGrid[dataValue] = button.value

        const activeElement = utils.getNodeElement(`[data-${dataKey}="${dataValue}"].active`);

        utils.removeClass(activeElement, 'active')
        utils.addClass(button, 'active')
    }

    getAllButtonNodes(selector) {
        const nodes = utils.getAllNodeElements(selector)
        if (nodes.length) {
            return Array.from(nodes)
        }
    }
}

export class StartButton extends Buttons {

    constructor() {
        super('.start-mode__modal-button-start')
        this.button.addEventListener('click', this.startGame.bind(this))
    }

    startGame() {
        const startModeDiv = utils.getNodeElement('.start-mode');
        startModeDiv.style.display = 'none';
        this.setColorPalette(gameGrid.color)
        gameGrid.isStarted = true
        timer.setTimer()
        playground.generateGridItems(timer.time, gameGrid)
    }

    setColorPalette = (theme) => {
        let root = document.documentElement;

        if (theme === 'orange') {
            root.style.setProperty('--primary', 'rgb(253, 162, 20)');
            root.style.setProperty('--dark', 'rgb(21, 41, 56)');
            root.style.setProperty('--dark-lighter', 'rgb(188, 206, 217)');
            root.style.setProperty('--blue-light', 'rgb(99, 149, 184)');
            root.style.setProperty('--gray-light', 'rgb(242, 242, 242)');
        } else {
            root.style.setProperty('--primary', 'rgb(62, 189, 147)');
            root.style.setProperty('--dark', 'rgb(114, 75, 183)');
            root.style.setProperty('--dark-lighter', 'rgb(99, 149, 184)');
            root.style.setProperty('--blue-light', 'rgb(98, 176, 232)');
            root.style.setProperty('--gray-light', 'rgb(220, 238, 251)');
        }
    }
}

export class RestartButton extends Buttons {
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
        playground.generateGridItems(timer.time, gameGrid)
    }
}

export class SetupButton extends Buttons {
    constructor() {
        super('.end-mode__modal-button-setup')
        this.button.addEventListener('click', this.setupGame)
    }

    setupGame = () => {
        const startModeDiv = utils.getNodeElement('.start-mode');
        const endModeNode = utils.getNodeElement('.end-mode');
        endModeNode.classList.remove('open')
        const gridItems = utils.getNodeElement('.game__grid-items');
        gridItems.innerHTML = ''
        startModeDiv.style.display = 'grid';
    }
}