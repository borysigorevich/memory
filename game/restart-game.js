import {getNodeElement} from "./utils.js";
import {setTimer} from "./set-timer.js";
import {generateGridItems} from "./game-logic.js";

export const restartGame = (time, gameGrid) => {
    const endModeNode = getNodeElement('.end-mode');
    endModeNode.classList.remove('open')
    const playground = getNodeElement('.game__grid-items');
    playground.innerHTML = ''

    setTimer(time, gameGrid.limit)
    generateGridItems(gameGrid.grid, time)
}