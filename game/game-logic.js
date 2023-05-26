import {
    addClass,
    createNodeElement,
    generatePlayground,
    getFirstNodeElement,
    getNodeElement,
    getRandomNumber,
    removeClass
} from "./utils.js"

export const generateGridItems = (dimension, time, timeLimit) => {

    let numbersForGrid = generatePlayground(dimension)

    const playground = getNodeElement('.game__grid-items');
    const moves = getNodeElement('.moves');
    moves.innerHTML = '0'

    const gameProps = {
        timeLimit,
        dimension,
        prevElement: null,
        numbers: [],
        results: [],
        isLock: false,
        movesNodeElement: moves
    };

    [...Array(Math.pow(Number(dimension), 2))].forEach((_) => {

        const gridItemContainer = createNodeElement('div');
        const gridItemFront = createNodeElement('div');
        const gridItemBack = createNodeElement('div');

        addClass(gridItemContainer, `game__grid-items-container`)
        addClass(gridItemContainer, `game__grid-item-${dimension}`)

        addClass(gridItemFront, 'game__grid-item-front')
        addClass(gridItemFront, `game__grid-item-${dimension}`)


        const randomIndex = getRandomNumber(numbersForGrid.length)
        gridItemFront.innerHTML = String(numbersForGrid[randomIndex])
        numbersForGrid.splice(randomIndex, 1)


        addClass(gridItemBack, 'game__grid-item-back')
        addClass(gridItemBack, `game__grid-item-${dimension}`)

        gridItemContainer.appendChild(gridItemFront)
        gridItemContainer.appendChild(gridItemBack)

        addClass(playground, `game__grid-items-${dimension}`)
        playground.appendChild(gridItemContainer);

        gridItemContainer.addEventListener('click', function () {
            gameLogic.call(this, gameProps, time)
        })
    })
}

function gameLogic(props, time) {
    if(props.isLock) return

    const frontItemNode = getFirstNodeElement(this)

    const frontItemNodeValue = frontItemNode.innerHTML

    if(this === props.prevElement) return
    if(props.results.includes(frontItemNodeValue)) return

    const movesValue = Number(props.movesNodeElement.innerHTML)
    props.movesNodeElement.innerHTML = String(movesValue + 1)

    addClass(this, 'game__grid-item-container--flipped')
    addClass(frontItemNode, 'game__grid-item-container--active')

    if(!props.prevElement) {
        props.prevElement = this
    }

    if(props.numbers.length) {
        if(frontItemNodeValue === props.numbers[0]) {
            props.results.push(props.numbers.pop())

            const frontItemPrev = getFirstNodeElement(props.prevElement)

            removeClass(frontItemPrev, 'game__grid-item-container--active')
            removeClass(frontItemNode, 'game__grid-item-container--active')

            // END GAME
            if(props.results.length === Math.pow(props.dimension, 2) / 2) {
                const endModeTitleNode = getNodeElement('.end-mode__modal-title');
                const movesNode = getNodeElement('.moves');
                const endModeNode = getNodeElement('.end-mode');
                const timeElapsedNode = getNodeElement('.elapsed');
                const totalMovesNode = getNodeElement('.total-moves');

                const elapsedMin = props.timeLimit === 1 ? 0 : props.timeLimit - time.min
                const elapsedSec = 60 - time.sec

                endModeTitleNode.innerHTML = 'You did it!!'
                timeElapsedNode.innerHTML = `0${elapsedMin}:${elapsedSec > 9 ? elapsedSec : '0' + elapsedSec}`
                totalMovesNode.innerHTML = `${movesNode.innerHTML} Moves`

                clearInterval(time.intervalId)
                endModeNode.classList.add('open')
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