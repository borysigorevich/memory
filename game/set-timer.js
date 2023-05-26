import {getNodeElement} from "./utils.js";

export const setTimer = (time, gameGrid, restore) => {
    const timer = getNodeElement('.timer');
    timer.innerHTML =  `0${restore ? time.min : gameGrid.limit}:${time.sec > 9 ? time.sec : '0' + time.sec}`

    if (!restore) time.min = gameGrid.limit

    const endModeTitleNode = getNodeElement('.end-mode__modal-title');
    const movesNode = getNodeElement('.moves');
    const endModeNode = getNodeElement('.end-mode');
    const timeElapsedNode = getNodeElement('.elapsed');
    const totalMovesNode = getNodeElement('.total-moves');

    time.intervalId = setInterval(() => {

        if (time.min === 0 && time.sec === 0) {

            endModeTitleNode.innerHTML = 'Time is up!'
            timeElapsedNode.innerHTML = `0${gameGrid.limit}:00`
            totalMovesNode.innerHTML = `${movesNode.innerHTML} Moves`

            endModeNode.classList.add('open')
            clearInterval(time.intervalId)
            time.intervalId = null
            gameGrid.isStarted = false
            time.sec = 0
            time.min = 0
            return
        }

        if (time.sec === 0) {
            time.min--
            time.sec = 59
        } else {
            time.sec--
        }

        timer.innerHTML = `0${time.min}:${time.sec > 9 ? time.sec : '0' + time.sec}`

    }, 1000);

}