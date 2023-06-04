import {matchGrid} from "../match-grid.js";
import {utils} from "../utils.js";

export class OptionButtons {

    constructor() {
        const buttonsNode = utils.getAllNodeElements('.start-mode__option-button')
        this.buttons = Array.from(buttonsNode)
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.setOptionButtonEvent(button))
        })
    }

    setOptionButtonEvent(button) {
        const [dataKey, dataValue] = Object.entries(button.dataset)[0]

        matchGrid[dataValue] = button.value

        const activeElement = utils.getNodeElement(`[data-${dataKey}="${dataValue}"].active`);

        utils.removeClass(activeElement, 'active')
        utils.addClass(button, 'active')
    }
}