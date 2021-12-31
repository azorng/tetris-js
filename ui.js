class UI {
    constructor(game) {
        this.game = game
        this._initKeyBindings()
    }

    drawGrid() {
        const main = document.createElement('div')
        main.id = 'main'
        for (let x of this.game.grid) {
            const col = document.createElement('div')
            col.classList.add('col')
            col.style.height = Settings.PIXEL_SIZE + 'px'
            for (let y of x) {
                const row = document.createElement('div')
                row.classList.add('row')
                row.classList.add(y ? 'filled' : 'unfilled')
                row.style.height = Settings.PIXEL_SIZE + 'px'
                row.style.width = Settings.PIXEL_SIZE - 1 + 'px' // -1 because border size
                row.style.backgroundColor = y
                col.appendChild(row)
            }
            main.appendChild(col)
        }
        document.querySelector('body').innerHTML = main.outerHTML
    }

    _initKeyBindings() {
        document.onkeydown = e => {
            switch (e.key) {
                case 'ArrowRight':
                    this.game.moveRight()
                    break
                case 'ArrowLeft':
                    this.game.moveLeft()
                    break
                case 'ArrowDown':
                    this.game.moveDown()
                    break
                case 'ArrowUp':
                    this.game.rotate()
                    break
                case ' ':
                    this.game.moveAllWayDown()
                    break
            }

            this.drawGrid()
        }
    }
}
