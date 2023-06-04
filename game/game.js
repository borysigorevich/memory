import {timer} from "./set-timer.js";
import {matchGrid} from "./match-grid.js";
import {OptionButtons, RestartButton, SetupButton, StartButton} from "./buttons";

export class Game {

    constructor() {

        const optionsButtons = new OptionButtons(matchGrid)
        const startButton = new StartButton()
        const restartButton = new RestartButton()
        const setupButton = new SetupButton()

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                clearInterval(timer.time.intervalId)
                timer.time.intervalId = null
            }

            if (document.visibilityState === 'visible' && matchGrid.isStarted) {
                timer.setTimer(true)
            }
        })
    }


}