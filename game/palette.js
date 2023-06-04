import {matchGrid} from './match-grid.js'

class Palette {
    setColorPalette = () => {
        let root = document.documentElement;

        if (matchGrid.color === 'orange') {
            root.style.setProperty('--primary', 'rgb(253, 162, 20)');
            root.style.setProperty('--dark', 'rgb(21, 41, 56)');
            root.style.setProperty('--dark-lighter', 'rgb(188, 206, 217)');
            root.style.setProperty('--blue-light', 'rgb(99, 149, 184)');
            root.style.setProperty('--gray-light', 'rgb(242, 242, 242)');
        } else {
            root.style.setProperty('--primary', 'rgb(62, 189, 147)');
            root.style.setProperty('--dark', 'rgb(114, 75, 183)');
            root.style.setProperty('--dark-lighter', 'rgb(99, 149, 184)');
            root.style.setProperty('--blue-light', 'rgb(98, 176, 232)');
            root.style.setProperty('--gray-light', 'rgb(220, 238, 251)');
        }
    }
}

export const palette = new Palette()