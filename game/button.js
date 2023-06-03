import {utils} from './utils.js'

export class Button {

    constructor(selector) {
        this.button = utils.getNodeElement(selector)
    }

    getButtonNode(selector) {

    }
}

export class OptionButtons {

    constructor(gameSettings) {
        this.gameSettings = gameSettings
        this.buttons = this.getAllButtonNodes('.start-mode__option-button')
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.setOptionButtonEvent(button))
        })
    }

    setOptionButtonEvent(button) {
        console.log(button, 'button')
        const dataSet = Object.entries(button.dataset)[0]
        const dataKey = dataSet[0]
        const dataValue = dataSet[1]

        this.gameSettings[dataValue] = button.value

        const activeElement = utils.getNodeElement(`[data-${dataKey}="${dataValue}"].active`);

        utils.removeClass(activeElement, 'active')
        utils.addClass(button, 'active')
    }

    getAllButtonNodes(selector) {
        const nodes = utils.getAllNodeElements(selector)
        if (nodes.length) {
            return Array.from(nodes)
        }
    }
}

export class StartButton extends Button {

}

export class RestartButton extends Button {

}

export class SetupButton extends Button {

}