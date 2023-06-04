import {utils} from "../utils.js";
import {Button} from "./button.js";

export class SetupButton extends Button {
    constructor() {
        super('.end-mode__modal-button-setup')
        this.button.addEventListener('click', this.setupGame)
    }

    setupGame = () => {
        const startModeDiv = utils.getNodeElement('.start-mode');
        const endModeNode = utils.getNodeElement('.end-mode');
        endModeNode.classList.remove('open')
        const gridItems = utils.getNodeElement('.game__grid-items');
        gridItems.innerHTML = ''
        startModeDiv.style.display = 'grid';
    }
}