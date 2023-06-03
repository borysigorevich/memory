import {Utils, utils} from "./utils.js";
import {Timer, timer} from "./set-timer.js";
import {Playground, playground} from "./game-logic.js";
import {MatchGrid} from "./match-grid.js";
import {OptionButtons} from "./button.js";

export class Game {

    constructor(){

        this.gameGrid = new MatchGrid({
            grid: '4',
            limit: '1',
            color: 'orange',
            isStarted: false
        })

        console.log(this.gameGrid)

        const gameContext = this

        const optionsButtons = new OptionButtons(this.gameGrid)

        // if (optionButtonsNode.length) {
        //     // TODO add button class and create a function to handle the click event
        //     const buttonsArray = Array.from(optionButtonsNode);
        //     buttonsArray.forEach((button) => {
        //         button.addEventListener('click', function () {
        //
        //             const dataSet = Object.entries(this.dataset)[0]
        //             const dataKey = dataSet[0]
        //             const dataValue = dataSet[1]
        //
        //             gameSettings[dataValue] = this.value
        //
        //             const activeElement = utils.getNodeElement(`[data-${dataKey}="${dataValue}"].active`);
        //
        //             utils.removeClass(activeElement, 'active')
        //             utils.addClass(this, 'active')
        //
        //         })
        //     })
        // }
        // TODO use button class
        const startButton = utils.getNodeElement('.start-mode__modal-button-start');

        if (startButton) {
            startButton.addEventListener('click', () => {
                const startModeDiv = utils.getNodeElement('.start-mode');
                startModeDiv.style.display = 'none';
                this.setColorPalette(this.gameGrid.color)
                this.gameGrid.isStarted = true
                timer.setTimer(this.gameGrid)
                playground.generateGridItems(timer.time, this.gameGrid)
            })
        }

        const restartButton = utils.getNodeElement('.end-mode__modal-button-restart');
        if (restartButton) restartButton.addEventListener('click', () => this.restartGame())

        const setupButton = utils.getNodeElement('.end-mode__modal-button-setup');
        if (setupButton) setupButton.addEventListener('click', this.setupGame)

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                clearInterval(timer.time.intervalId)
                timer.time.intervalId = null
            }

            if (document.visibilityState === 'visible' && this.gameGrid.isStarted) {
                timer.setTimer(timer.time, this.gameGrid, true)
            }
        })
    }

    setupGame = () => {
        const startModeDiv = utils.getNodeElement('.start-mode');
        const endModeNode = utils.getNodeElement('.end-mode');
        endModeNode.classList.remove('open')
        const gridItems = utils.getNodeElement('.game__grid-items');
        gridItems.innerHTML = ''
        startModeDiv.style.display = 'grid';
    }

    setColorPalette = (theme) => {
        let root = document.documentElement;

        if(theme === 'orange') {
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

    restartGame = () => {
        const endModeNode = utils.getNodeElement('.end-mode');
        endModeNode.classList.remove('open')
        const gridItems = utils.getNodeElement('.game__grid-items');
        gridItems.innerHTML = ''

        timer.setTimer(this.gameGrid)
        playground.generateGridItems(timer.time, this.gameGrid)
    }
}