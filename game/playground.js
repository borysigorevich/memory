import anime from '../node_modules/animejs/lib/anime.es.js'
import {
    utils
} from "./utils.js"
import {timer} from './set-timer.js'
import {matchGrid} from './match-grid.js'
import {Card} from "./card.js";

export class Playground {

    generateGridItems = () => {

        const cardItems = []

        const numbersForGrid = utils.generatePlayground(matchGrid.grid)

        const playground = utils.getNodeElement('.game__grid-items');

        const moves = utils.getNodeElement('.moves');
        moves.innerHTML = '0'

        const gameProps = {
            gameGrid: matchGrid,
            prevElement: null,
            numbers: [],
            results: [],
            isLock: false,
            movesNodeElement: moves
        };

        [...Array(Math.pow(Number(matchGrid.grid), 2))].forEach((_) => cardItems.push(new Card(gameProps, playground, numbersForGrid)))

        anime({
            targets: '.game__grid-item-animate-container',
            scale: [
                {value: .1, easing: 'easeOutSine', duration: 300},
                {value: 1, easing: 'easeInOutQuad', duration: 500}
            ],
            delay: anime.stagger(200, {grid: [matchGrid.grid, matchGrid.grid], from: 'center'})
        });

        playground.addEventListener('mouseleave', function () {
            clearInterval(timer.time.intervalId)
            timer.time.intervalId = null
        })
        playground.addEventListener('mouseenter', function () {
            if (!timer.time.intervalId) timer.setTimer(timer.time, matchGrid, true)
        })
    }
}

export const playground = new Playground()