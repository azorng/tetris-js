class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Figure {
    position
    shape

    constructor(game) {
        const f = figureModels[Util.rng(0, figureModels.length - 1)]
        this.game = game
        this.shape = f.shape
        this.color = f.color
        this.position = new Position(Math.round(Settings.N_COLS / 2 - 1), 0)
    }

    notifyChange(fn) {
        this.game.handleChangeInFigure(fn)
    }

    rotate() {
        this.notifyChange(() => {
            const newShape = JSON.parse(JSON.stringify(this.shape))
            this.shape.forEach((x, i) => {
                x.forEach((_, j) => {
                    newShape[i][j] = this.shape[j][i]
                })
            })
            newShape.reverse()
            this.shape = newShape
        })
    }

    moveRight() {
        this.notifyChange(() => {
            this.position.x++
        })
    }

    moveLeft() {
        this.notifyChange(() => {
            this.position.x--
        })
    }

    moveDown() {
        this.notifyChange(() => {
            this.position.y++
        })
    }
}

const figureModels = [
    {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: '#03A9F4'
    },
    {
        shape: [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0]
        ],
        color: '#FFC107'
    },
    {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]
        ],
        color: '#673AB7'
    },
    {
        shape: [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 0]
        ],
        color: '#3F51B5'
    },
    {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#FFEB3B'
    },
    {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: '#4CAF50'
    },
    {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: '#673AB7'
    }
]
