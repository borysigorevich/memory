import {addClass, getAllNodeElements, getNodeElement, removeClass,} from './utils.js'
import {generateGridItems} from "./game-logic.js"
import {MatchGrid} from "./math-grid.js"
import {gameDefaultSetting} from "./constants.js"
import {setTimer} from "./set-timer.js";
import {restartGame} from "./restart-game.js";
import {setupGame} from "./setup-game.js";

let gameGrid = new MatchGrid(gameDefaultSetting)
const time = {
    min: 0,
    sec: 0,
    intervalId: null
}

const optionButtonsNode = getAllNodeElements('.start-mode__option-button');

if (optionButtonsNode.length) {
    const buttonsArray = Array.from(optionButtonsNode);
    buttonsArray.forEach((button) => {
        button.addEventListener('click', function () {

            const dataSet = Object.entries(this.dataset)[0]
            const dataKey = dataSet[0]
            const dataValue = dataSet[1]

            gameGrid[dataValue] = this.value

            const activeElement = getNodeElement(`[data-${dataKey}="${dataValue}"].active`);

            removeClass(activeElement, 'active')
            addClass(this, 'active')

        })
    })
}

const startButton = getNodeElement('.start-mode__modal-button-start');

if (startButton) {
    startButton.addEventListener('click', function () {
        const startModeDiv = getNodeElement('.start-mode');
        startModeDiv.style.display = 'none';

        setTimer(time, gameGrid.limit)
        generateGridItems(gameGrid.grid, time, gameGrid.limit)

    })
}

const restartButton = getNodeElement('.end-mode__modal-button-restart');
if (restartButton) restartButton.addEventListener('click', () => restartGame(time, gameGrid))

const setupButton = getNodeElement('.end-mode__modal-button-setup');
if (setupButton) setupButton.addEventListener('click', setupGame)

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        clearInterval(time.intervalId)
    }

    if (document.visibilityState === 'visible') {
        setTimer(time, gameGrid.limit, true)
    }
})