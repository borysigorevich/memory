import {utils} from "./utils.js";
import {gameGrid} from "./match-grid.js";

export class Timer {

    time = {
        min: 0,
        sec: 0,
        intervalId: null
    }

    setTimer = (restore) => {
        console.log('gameGrid', gameGrid)
        const timer = utils.getNodeElement('.timer');
        timer.innerHTML =  `0${restore ? this.time.min : gameGrid.limit}:${this.time.sec > 9 ? this.time.sec : '0' + this.time.sec}`

        if (!restore) this.time.min = gameGrid.limit

        const endModeTitleNode = utils.getNodeElement('.end-mode__modal-title');
        const movesNode = utils.getNodeElement('.moves');
        const endModeNode = utils.getNodeElement('.end-mode');
        const timeElapsedNode = utils.getNodeElement('.elapsed');
        const totalMovesNode = utils.getNodeElement('.total-moves');

        this.time.intervalId = setInterval(() => {

            if (this.time.min === 0 && this.time.sec === 0) {

                endModeTitleNode.innerHTML = 'Time is up!'
                timeElapsedNode.innerHTML = `0${gameGrid.limit}:00`
                totalMovesNode.innerHTML = `${movesNode.innerHTML} Moves`

                endModeNode.classList.add('open')
                clearInterval(this.time.intervalId)
                this.time.intervalId = null
                gameGrid.isStarted = false
                this.time.sec = 0
                this.time.min = 0
                return
            }

            if (this.time.sec === 0) {
                this.time.min--
                this.time.sec = 59
            } else {
                this.time.sec--
            }

            timer.innerHTML = `0${this.time.min}:${this.time.sec > 9 ? this.time.sec : '0' + this.time.sec}`

        }, 1000);
    }
}

export const timer = new Timer()