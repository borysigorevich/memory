export class Utils {

    getNodeElement = (selector) => document.querySelector(`${selector}`)

    getAllNodeElements = (selector) => document.querySelectorAll(`${selector}`)

    createNodeElement = (element) => document.createElement(element)

    getFirstNodeElement = (node) => node.firstElementChild

    addClass = (node, className) => node.classList.add(className)

    removeClass = (node, className) => node.classList.remove(className)

    getRandomNumber = (limit) => Math.floor(Math.random() * limit)

    generatePlayground = (dimension) => {
        let numbersForGrid = [...Array(Math.pow(Number(dimension), 2) / 2).keys()].map(value => ++value)
        return numbersForGrid.concat(numbersForGrid)
    }
}

export const utils = new Utils()