class MatchGrid {

    constructor(args) {
        this.font = args.font
        this.grid = args.grid
        this.limit = args.limit
    }
}

let game

const optionButtonsNode = document.querySelectorAll('.start-mode__option-button');

const gameSetting = {
    font: 'numbers',
    grid: '4',
    limit: '1'
}

if(optionButtonsNode.length) {
    const buttonsArray = Array.from(optionButtonsNode);
    buttonsArray.forEach((button) => {
        button.addEventListener('click', function() {

            const dataSet = Object.entries(this.dataset)[0]
            const dataKey = dataSet[0]
            const dataValue = dataSet[1]

            gameSetting[dataValue] = this.value

            console.log(this.value)
            console.log(dataValue)

            const activeElement = document.querySelector(`[data-${dataKey}="${dataValue}"].active`);
            activeElement.classList.remove('active')
            this.classList.add('active')

            if(dataKey === 'font') {
                document.body.style.fontFamily = `'${this.value}', sans-serif`
            }

        })
    })
}
// TODO come up with the idea how to change font on click
const startModeDiv = document.querySelector('.start-mode');
const startButton = document.querySelector('.start-mode__modal-button-start');

if(startButton) {
    startButton.addEventListener('click', function() {
        game = new MatchGrid(gameSetting)
        startModeDiv.style.display = 'none';

        const gridItems = document.querySelector('.game__grid-items');

        [...Array(Math.pow(Number(game.grid), 2))].forEach((_, i) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('game__grid-item');
            gridItem.classList.add(`game__grid-item-${game.grid}`)

            gridItems.classList.add(`game__grid-items-${game.grid}`)
            gridItems.appendChild(gridItem);
        })

        const timer = document.querySelector('.timer');
        const moves = document.querySelector('.moves');

        timer.innerHTML = `0${game.limit}:00`

        let min = game.limit
        let sec = 0


        //create a simple timer in format mm:ss
        // const time = new Date(null);
        // time.setSeconds(initialTime);
        // timer.innerHTML = time.toISOString().substring(14, 5);

        const interval = setInterval(() => {

            if(min === 0 && sec === 0) {
                clearInterval(interval)
                alert('game over')
                return
            }

            if(sec === 0) {
                min--
                sec = 59
            } else {
                sec--
            }

            timer.innerHTML = `0${min}:${sec > 9 ? sec : '0' + sec}`

        }, 1000);

    })
}
