export const getNodeElement = (selector) => document.querySelector(`${selector}`)
export const getAllNodeElements = (selector) => document.querySelectorAll(`${selector}`)
export const createNodeElement = (element) => document.createElement(element)
export const getFirstNodeElement = (node) => node.firstElementChild

export const addClass = (node, className) => node.classList.add(className)
export const removeClass = (node, className) => node.classList.remove(className)

export const getRandomNumber = (limit) => Math.floor(Math.random() * limit)
export const generatePlayground = (dimension) => {
    let numbersForGrid = [...Array(Math.pow(Number(dimension), 2) / 2).keys()].map(value => ++value)
    return numbersForGrid.concat(numbersForGrid)
}

