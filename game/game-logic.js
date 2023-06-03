import anime from '../node_modules/animejs/lib/anime.es.js'
import {
    utils
} from "./utils.js"
import {timer} from './set-timer.js'

export class Playground {

    generateGridItems = (time, gameGrid) => {

        const playgroundRef = this

        let numbersForGrid = utils.generatePlayground(gameGrid.grid)

        const playground = utils.getNodeElement('.game__grid-items');

        const moves = utils.getNodeElement('.moves');
        moves.innerHTML = '0'

        const gameProps = {
            gameGrid,
            prevElement: null,
            numbers: [],
            results: [],
            isLock: false,
            movesNodeElement: moves
        };

        [...Array(Math.pow(Number(gameGrid.grid), 2))].forEach((_) => {

            const animateContainer = utils.createNodeElement('div');
            const gridItemContainer = utils.createNodeElement('div');
            const gridItemFront = utils.createNodeElement('div');
            const gridItemBack = utils.createNodeElement('div');

            utils.addClass(animateContainer, 'game__grid-item-animate-container')
            animateContainer.appendChild(gridItemContainer)

            utils.addClass(gridItemContainer, `game__grid-items-container`)
            utils.addClass(gridItemContainer, `game__grid-item-${gameGrid.grid}`)

            utils.addClass(gridItemFront, 'game__grid-item-front')
            utils.addClass(gridItemFront, `game__grid-item-${gameGrid.grid}`)

            const randomIndex = utils.getRandomNumber(numbersForGrid.length)
            gridItemFront.innerHTML = String(numbersForGrid[randomIndex])
            numbersForGrid.splice(randomIndex, 1)

            utils.addClass(gridItemBack, 'game__grid-item-back')
            utils.addClass(gridItemBack, `game__grid-item-${gameGrid.grid}`)

            gridItemContainer.appendChild(gridItemFront)
            gridItemContainer.appendChild(gridItemBack)

            utils.addClass(playground, `game__grid-items-${gameGrid.grid}`)
            playground.appendChild(animateContainer);

            gridItemContainer.addEventListener('click', function () {
                playgroundRef.gameItemClickHandler.call(this, gameProps, time)
            })
        })

        anime({
            targets: '.game__grid-item-animate-container',
            scale: [
                {value: .1, easing: 'easeOutSine', duration: 300},
                {value: 1, easing: 'easeInOutQuad', duration: 500}
            ],
            delay: anime.stagger(200, {grid: [gameGrid.grid, gameGrid.grid], from: 'center'})
        });

        playground.addEventListener('mouseleave', function () {
            clearInterval(time.intervalId)
            time.intervalId = null
        })
        playground.addEventListener('mouseenter', function () {
            if (!time.intervalId) timer.setTimer(time, gameGrid, true)
        })
    }


    gameItemClickHandler(props, time) {
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

                // END GAME
                if (props.results.length === Math.pow(props.gameGrid.grid, 2) / 2) {
                    const endModeTitleNode = utils.getNodeElement('.end-mode__modal-title');
                    const movesNode = utils.getNodeElement('.moves');
                    const endModeNode = utils.getNodeElement('.end-mode');
                    const timeElapsedNode = utils.getNodeElement('.elapsed');
                    const totalMovesNode = utils.getNodeElement('.total-moves');

                    const totalLimitSeconds = Number(props.gameGrid.limit) * 60
                    const totalLeftSeconds = time.min * 60 + time.sec

                    const totalElapsedSeconds = totalLimitSeconds - totalLeftSeconds
                    const elapsedMin = Math.floor(totalElapsedSeconds / 60)
                    const elapsedSec = totalElapsedSeconds % 60

                    endModeTitleNode.innerHTML = 'You did it!!'
                    timeElapsedNode.innerHTML = `0${elapsedMin}:${elapsedSec > 9 ? elapsedSec : '0' + elapsedSec}`
                    totalMovesNode.innerHTML = `${movesNode.innerHTML} Moves`

                    clearInterval(time.intervalId)
                    time.intervalId = null
                    endModeNode.classList.add('open')
                    time.min = 0
                    time.sec = 0
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

export const playground = new Playground()