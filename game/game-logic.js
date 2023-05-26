import anime from '../node_modules/animejs/lib/anime.es.js'
import {
    addClass,
    createNodeElement,
    generatePlayground,
    getFirstNodeElement,
    getNodeElement,
    getRandomNumber,
    removeClass
} from "./utils.js"
import {setTimer} from "./set-timer.js";

export const generateGridItems = (time, gameGrid) => {

    let numbersForGrid = generatePlayground(gameGrid.grid)

    const playground = getNodeElement('.game__grid-items');

    const moves = getNodeElement('.moves');
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

        const animateContainer = createNodeElement('div');
        const gridItemContainer = createNodeElement('div');
        const gridItemFront = createNodeElement('div');
        const gridItemBack = createNodeElement('div');

        addClass(animateContainer, 'game__grid-item-animate-container')
        animateContainer.appendChild(gridItemContainer)

        addClass(gridItemContainer, `game__grid-items-container`)
        addClass(gridItemContainer, `game__grid-item-${gameGrid.grid}`)

        addClass(gridItemFront, 'game__grid-item-front')
        addClass(gridItemFront, `game__grid-item-${gameGrid.grid}`)


        const randomIndex = getRandomNumber(numbersForGrid.length)
        gridItemFront.innerHTML = String(numbersForGrid[randomIndex])
        numbersForGrid.splice(randomIndex, 1)


        addClass(gridItemBack, 'game__grid-item-back')
        addClass(gridItemBack, `game__grid-item-${gameGrid.grid}`)

        gridItemContainer.appendChild(gridItemFront)
        gridItemContainer.appendChild(gridItemBack)

        addClass(playground, `game__grid-items-${gameGrid.grid}`)
        playground.appendChild(animateContainer);

        gridItemContainer.addEventListener('click', function () {
            gameLogic.call(this, gameProps, time)
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
        if(!time.intervalId) setTimer(time, gameGrid, true)
    })
}

function gameLogic(props, time) {
    if (props.isLock) return

    const frontItemNode = getFirstNodeElement(this)

    const frontItemNodeValue = frontItemNode.innerHTML

    if (this === props.prevElement) return
    if (props.results.includes(frontItemNodeValue)) return

    const movesValue = Number(props.movesNodeElement.innerHTML)
    props.movesNodeElement.innerHTML = String(movesValue + 1)

    addClass(this, 'game__grid-item-container--flipped')
    addClass(frontItemNode, 'game__grid-item-container--active')

    if (!props.prevElement) {
        props.prevElement = this
    }

    if (props.numbers.length) {
        if (frontItemNodeValue === props.numbers[0]) {
            props.results.push(props.numbers.pop())

            const frontItemPrev = getFirstNodeElement(props.prevElement)

            removeClass(frontItemPrev, 'game__grid-item-container--active')
            removeClass(frontItemNode, 'game__grid-item-container--active')

            // END GAME
            if (props.results.length === Math.pow(props.gameGrid.grid, 2) / 2) {
                const endModeTitleNode = getNodeElement('.end-mode__modal-title');
                const movesNode = getNodeElement('.moves');
                const endModeNode = getNodeElement('.end-mode');
                const timeElapsedNode = getNodeElement('.elapsed');
                const totalMovesNode = getNodeElement('.total-moves');

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

                removeClass(this, 'game__grid-item-container--flipped')
                removeClass(props.prevElement, 'game__grid-item-container--flipped')

                props.prevElement = null
                props.isLock = false
                props.numbers.pop()
            }, 1000)
        }
    } else {
        props.numbers.push(frontItemNodeValue)
    }

}