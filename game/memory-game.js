import {
    addClass,
    removeClass,
    getNodeElement,
    getAllNodeElements,
    generatePlayground,
} from './utils.js'
import {generateGridItems} from "./game-logic.js"
import {MatchGrid} from "./math-grid.js"
import {gameDefaultSetting} from "./constants.js"

let gameGrid = new MatchGrid(gameDefaultSetting)

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

const startModeDiv = getNodeElement('.start-mode');
const startButton = getNodeElement('.start-mode__modal-button-start');

if (startButton) {
    startButton.addEventListener('click', function () {
        startModeDiv.style.display = 'none';

        let numbersForGrid = generatePlayground(gameGrid.grid)

        const timer = getNodeElement('.timer');

        timer.innerHTML = `0${gameGrid.limit}:00`

        let min = gameGrid.limit
        let sec = 0

        const interval = setInterval(() => {

            if (min === 0 && sec === 0) {
                clearInterval(interval)
                alert('game over')
                return
            }

            if (sec === 0) {
                min--
                sec = 59
            } else {
                sec--
            }

            timer.innerHTML = `0${min}:${sec > 9 ? sec : '0' + sec}`

        }, 1000);

        generateGridItems(gameGrid.grid, numbersForGrid)

    })
}

