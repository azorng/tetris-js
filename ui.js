class UI {
    constructor(game) {
        this.main = document.querySelector('div[id="main"]')
        this.game = game
        this._initKeyBindings()
        this.draw()
    }

    draw() {
        this.main.innerHTML = ''
        this._drawGrid()
        this._drawInfoWindow()
    }

    _drawInfoWindow() {
        const info = this._newElement('info')
        info.style.height = document.querySelector('div[id="grid"]').clientHeight + 'px'

        const nextFigure = this._newElement('next-figure')
        nextFigure.innerHTML = 'Next: '
        info.appendChild(nextFigure)
        info.appendChild(this._drawNextFigure())

        const score = this._newElement('score')
        score.innerHTML = 'Score: '
        const scoreVal = this._newElement()
        scoreVal.innerHTML = this.game.score
        score.appendChild(scoreVal)
        info.appendChild(score)

        const level = this._newElement('level')
        level.innerHTML = 'Level: '
        const levelVal = this._newElement()
        levelVal.innerHTML = this.game.level
        level.appendChild(levelVal)
        info.appendChild(level)

        this.main.appendChild(info)
    }

    _drawNextFigure() {
        const nextFigure = this._newElement('next-shape')
        for (let x of this.game.nextFigure.shape) {
            const col = this._newElement()
            col.classList.add('col')
            col.style.height = Settings.PIXEL_SIZE + 'px'

            if (x.every(y => !y)) {
                continue
            }

            for (let y of x) {
                const row = this._newElement()
                row.classList.add('row')
                row.classList.add(y ? 'filled' : 'unfilled')
                row.style.height = Settings.PIXEL_SIZE + 'px'
                row.style.width = Settings.PIXEL_SIZE - 1 + 'px' // -1 because border size
                if (y) {
                    row.style.backgroundColor = this.game.nextFigure.color
                }
                col.appendChild(row)
            }
            nextFigure.appendChild(col)
        }
        return nextFigure
    }

    _drawGrid() {
        const grid = this._newElement('grid')
        for (let x of this.game.grid) {
            const col = this._newElement()
            col.classList.add('col')
            col.style.height = Settings.PIXEL_SIZE + 'px'
            for (let y of x) {
                const row = this._newElement()
                row.classList.add('row')
                row.classList.add(y ? 'filled' : 'unfilled')
                row.style.height = Settings.PIXEL_SIZE + 'px'
                row.style.width = Settings.PIXEL_SIZE - 1 + 'px' // -1 because border size
                row.style.backgroundColor = y
                col.appendChild(row)
            }
            grid.appendChild(col)
        }
        this.main.appendChild(grid)
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
        }
    }

    _newElement(id) {
        const el = document.createElement('div')
        if (id) {
            el.id = id
        }
        return el
    }
}
