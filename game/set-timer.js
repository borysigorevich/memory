import {getNodeElement} from "./utils.js";

export const setTimer = (time, limit, restore) => {
    const timer = getNodeElement('.timer');

    console.log(time, limit)

    const normalizedLimitTime = `0${restore ? time.min : limit}:${time.sec > 9 ? time.sec : '0' + time.sec}`
    timer.innerHTML = normalizedLimitTime

    if (!restore) time.min = limit

    const endModeTitleNode = getNodeElement('.end-mode__modal-title');
    const movesNode = getNodeElement('.moves');
    const endModeNode = getNodeElement('.end-mode');
    const timeElapsedNode = getNodeElement('.elapsed');
    const totalMovesNode = getNodeElement('.total-moves');

    time.intervalId = setInterval(() => {

        if (time.min === 0 && time.sec === 0) {

            endModeTitleNode.innerHTML = 'Time is up!'
            timeElapsedNode.innerHTML = normalizedLimitTime
            totalMovesNode.innerHTML = `${movesNode.innerHTML} Moves`

            endModeNode.classList.add('open')
            clearInterval(time.intervalId)
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