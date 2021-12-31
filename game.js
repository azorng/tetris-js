class Game {
    grid = []
    activeFigure
    onChangeAction

    constructor() {
        this._initGrid()
        this.addFigure(new Figure())
    }

    start() {
        setInterval(() => {
            this.moveDown()
        }, 400)
    }

    onChange(fn) {
        this.onChangeAction = fn
    }

    addFigure(figure) {
        this.activeFigure = figure
        this._setFigureInGrid()
        if (this._isCollision()) {
            this._initGrid()
        }
    }

    moveDown() {
        if (!this._isCollision()) {
            this._registerChangeInFigure(() => {
                this.activeFigure.position.y++
            })
        } else {
            this._handleStrike()
            this.addFigure(new Figure())
        }
    }

    moveLeft() {
        this._registerChangeInFigure(() => {
            if (this._isValidMoveLeft()) {
                this.activeFigure.position.x--
            }
        })
    }

    moveRight() {
        this._registerChangeInFigure(() => {
            if (this._isValidMoveRight()) {
                this.activeFigure.position.x++
            }
        })
    }

    rotate() {
        this._registerChangeInFigure(() => {
            const newShape = JSON.parse(JSON.stringify(this.activeFigure.shape))
            this.activeFigure.shape.forEach((x, i) => {
                x.forEach((_, j) => {
                    newShape[i][j] = this.activeFigure.shape[j][i]
                })
            })
            newShape.reverse()
            this.activeFigure.shape = newShape
        })
    }

    moveAllWayDown() {
        const activeFigure = this.activeFigure
        while (activeFigure == this.activeFigure) {
            this.moveDown()
        }
    }

    _initGrid() {
        for (let i = 0; i < Settings.N_ROWS; i++) {
            this.grid[i] = []
            for (let j = 0; j < Settings.N_COLS; j++) {
                this.grid[i][j] = 0
            }
        }
    }

    _registerChangeInFigure(fn) {
        this._removeFigureFromGrid()
        fn()
        this._setFigureInGrid()
        this.onChangeAction()
    }

    _handleStrike() {
        this.grid.forEach((x, i) => {
            if (x.every(y => !!y)) {
                for (let k = i; k > 0; k--) {
                    this.grid[k].forEach((_, j) => (this.grid[k][j] = this.grid[k - 1][j]))
                }
            }
        })
    }

    _isValidMoveRight() {
        return !this.activeFigure.shape.some((x, i) =>
            x.some(
                (y, j) =>
                    y &&
                    (j + this.activeFigure.position.x + 1 == Settings.N_COLS ||
                        !!this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x + 1])
            )
        )
    }

    _isValidMoveLeft() {
        return !this.activeFigure.shape.some((x, i) =>
            x.some(
                (y, j) =>
                    y &&
                    (j + this.activeFigure.position.x == 0 ||
                        !!this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x - 1])
            )
        )
    }

    _isCollision() {
        this._removeFigureFromGrid()
        const isCollision = this.activeFigure.shape.some((x, i) =>
            x.some(
                (y, j) =>
                    y &&
                    (i + this.activeFigure.position.y + 1 == Settings.N_ROWS ||
                        !!this.grid[i + this.activeFigure.position.y + 1][j + this.activeFigure.position.x])
            )
        )
        this._setFigureInGrid()
        return isCollision
    }

    _removeFigureFromGrid() {
        this.activeFigure.shape.forEach((x, i) => {
            x.forEach((y, j) => {
                if (y) {
                    this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x] = 0
                }
            })
        })
    }

    _setFigureInGrid() {
        this.activeFigure.shape.forEach((x, i) => {
            x.forEach((y, j) => {
                if (y) {
                    this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x] = this.activeFigure.color
                }
            })
        })
    }
}
