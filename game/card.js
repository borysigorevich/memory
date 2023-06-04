import {utils} from "./utils.js";
import {matchGrid} from "./match-grid.js";
import {timer} from "./set-timer.js";

export class Card {

    constructor(gameProps, playground, numbersForGrid){
        const animateContainer = utils.createNodeElement('div');
        const gridItemContainer = utils.createNodeElement('div');
        const gridItemFront = utils.createNodeElement('div');
        const gridItemBack = utils.createNodeElement('div');

        utils.addClass(animateContainer, 'game__grid-item-animate-container')
        animateContainer.appendChild(gridItemContainer)

        utils.addClass(gridItemContainer, `game__grid-items-container`)
        utils.addClass(gridItemContainer, `game__grid-item-${matchGrid.grid}`)

        utils.addClass(gridItemFront, 'game__grid-item-front')
        utils.addClass(gridItemFront, `game__grid-item-${matchGrid.grid}`)

        const randomIndex = utils.getRandomNumber(numbersForGrid.length)
        gridItemFront.innerHTML = String(numbersForGrid[randomIndex])
        numbersForGrid.splice(randomIndex, 1)

        utils.addClass(gridItemBack, 'game__grid-item-back')
        utils.addClass(gridItemBack, `game__grid-item-${matchGrid.grid}`)

        gridItemContainer.appendChild(gridItemFront)
        gridItemContainer.appendChild(gridItemBack)

        utils.addClass(playground, `game__grid-items-${matchGrid.grid}`)
        playground.appendChild(animateContainer);

        gridItemContainer.addEventListener('click', function () {
            Card.cardClickHandler.call(this, gameProps)
        })
    }

    static cardClickHandler(props){
        if (props.isLock) return

        const frontItemNode = utils.getFirstNodeElement(this)

        const frontItemNodeValue = frontItemNode.innerHTML

        if (this === props.prevElement) return
        if (props.results.includes(frontItemNodeValue)) return

        const movesValue = Number(props.movesNodeElement.innerHTML)
        props.movesNodeElement.innerHTML = String(movesValue + 1)

        utils.addClass(this, 'game__grid-item-container--flipped')
        utils.addClass(frontItemNode, 'game__grid-item-container--active')

        if (!props.prevElement) {
            props.prevElement = this
        }

        if (props.numbers.length) {
            if (frontItemNodeValue === props.numbers[0]) {
                props.results.push(props.numbers.pop())

                const frontItemPrev = utils.getFirstNodeElement(props.prevElement)

                utils.removeClass(frontItemPrev, 'game__grid-item-container--active')
                utils.removeClass(frontItemNode, 'game__grid-item-container--active')

                // TODO separate to different function
                // END GAME
                if (props.results.length === Math.pow(props.gameGrid.grid, 2) / 2) {
                    const endModeTitleNode = utils.getNodeElement('.end-mode__modal-title');
                    const movesNode = utils.getNodeElement('.moves');
                    const endModeNode = utils.getNodeElement('.end-mode');
                    const timeElapsedNode = utils.getNodeElement('.elapsed');
                    const totalMovesNode = utils.getNodeElement('.total-moves');

                    const totalLimitSeconds = Number(props.gameGrid.limit) * 60
                    const totalLeftSeconds = timer.time.min * 60 + timer.time.sec

                    const totalElapsedSeconds = totalLimitSeconds - totalLeftSeconds
                    const elapsedMin = Math.floor(totalElapsedSeconds / 60)
                    const elapsedSec = totalElapsedSeconds % 60

                    endModeTitleNode.innerHTML = 'You did it!!'
                    timeElapsedNode.innerHTML = `0${elapsedMin}:${elapsedSec > 9 ? elapsedSec : '0' + elapsedSec}`
                    totalMovesNode.innerHTML = `${movesNode.innerHTML} Moves`

                    clearInterval(timer.time.intervalId)
                    timer.time.intervalId = null
                    endModeNode.classList.add('open')
                    timer.time.min = 0
                    timer.time.sec = 0
                    props.gameGrid.isStarted = false
                }

                props.prevElement = null
            } else {
                props.isLock = true
                setTimeout(() => {

                    utils.removeClass(this, 'game__grid-item-container--flipped')
                    utils.removeClass(props.prevElement, 'game__grid-item-container--flipped')

                    props.prevElement = null
                    props.isLock = false
                    props.numbers.pop()
                }, 1000)
            }
        } else {
            props.numbers.push(frontItemNodeValue)
        }
    }

}
