import {getNodeElement} from "./utils.js";

export const setupGame = () => {
    const startModeDiv = getNodeElement('.start-mode');
    const endModeNode = getNodeElement('.end-mode');
    endModeNode.classList.remove('open')
    const playground = getNodeElement('.game__grid-items');
    playground.innerHTML = ''
    startModeDiv.style.display = 'grid';
}