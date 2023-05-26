import {addClass, createNodeElement, getFirstNodeElement, getNodeElement, getRandomNumber, removeClass} from "./utils.js"

export const generateGridItems = (dimension, numbersForGrid) => {

    const playground = getNodeElement('.game__grid-items');
    const moves = getNodeElement('.moves');

    const gameProps = {
        prevElement: null,
        numbers: [],
        results: [],
        isLock: false,
        movesNodeElement: moves
    };

    [...Array(Math.pow(Number(dimension), 2))].forEach((_, i) => {

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


        // GAME LOGIC
        gridItemContainer.addEventListener('click', function () {
            gameLogic.call(this, gameProps)
        })
    })
}

function gameLogic(props) {
    const frontItem = getFirstNodeElement(this)

    const value = frontItem.innerHTML

    if(this === props.prevElement) return
    if(props.results.includes(value)) return
    if(props.isLock) return

    const movesValue = Number(props.movesNodeElement.innerHTML)
    props.movesNodeElement.innerHTML = String(movesValue + 1)

    this.classList.add('game__grid-item-container--flipped')

    if(!props.prevElement) {
        props.prevElement = this
    }

    frontItem.classList.add('game__grid-item-container--active')

    if(props.numbers.length) {
        if(value === props.numbers[0]) {
            props.results.push(props.numbers.pop())

            const frontItemPrev = getFirstNodeElement(props.prevElement)

            removeClass(frontItemPrev, 'game__grid-item-container--active')
            removeClass(frontItem, 'game__grid-item-container--active')

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
        props.numbers.push(value)
    }

}