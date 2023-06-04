import {utils} from "../utils.js";

export class Button {

    constructor(selector) {
        this.button = utils.getNodeElement(selector)
    }
}