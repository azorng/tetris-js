class Game {
    grid = []
    activeFigure
    nextFigure
    onChangeAction

    score = 0
    level = 1

    constructor() {
        this._initGrid()
        this._addFigure(new Figure())
    }

    start() {
        setInterval(() => {
            this.moveDown(true)
        }, 400)
    }

    onChange(fn) {
        this.onChangeAction = fn
    }

    moveDown(auto = false) {
        if (!this._isCollision()) {
            this._registerChangeInFigure(() => {
                this.activeFigure.position.y++
                if (!auto) {
                    this.score += 1
                }
            })
        } else {
            this._handleLineClear()
            this._addFigure(this.nextFigure)
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
            this.moveDown(true)
            this.score += 2
        }
    }

    _addFigure(figure) {
        this.activeFigure = figure
        this.nextFigure = new Figure()
        this._setActiveFigureInGrid()
        this._registerChangeInFigure()

        if (this._isCollision()) {
            // Game over
            this._initGrid()
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
        this._removeActiveFigureFromGrid()
        if (fn) {
            fn()
        }
        this._setActiveFigureInGrid()

        if (this.onChangeAction) {
            this.onChangeAction()
        }
    }

    _handleLineClear() {
        let streak = 0
        this.grid.forEach((x, i) => {
            if (x.every(y => !!y)) {
                streak++
                for (let k = i; k > 0; k--) {
                    this.grid[k].forEach((_, j) => (this.grid[k][j] = this.grid[k - 1][j]))
                }
            }
        })

        this.level += streak
        this.score +=
            {
                1: 100 * this.level,
                2: 300 * this.level,
                3: 500 * this.level,
                4: 800 * this.level
            }[streak] || 0
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
        this._removeActiveFigureFromGrid()
        const isCollision = this.activeFigure.shape.some((x, i) =>
            x.some(
                (y, j) =>
                    y &&
                    (i + this.activeFigure.position.y + 1 == Settings.N_ROWS ||
                        !!this.grid[i + this.activeFigure.position.y + 1][j + this.activeFigure.position.x])
            )
        )
        this._setActiveFigureInGrid()
        return isCollision
    }

    _removeActiveFigureFromGrid() {
        this.activeFigure.shape.forEach((x, i) => {
            x.forEach((y, j) => {
                if (y) {
                    this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x] = 0
                }
            })
        })
    }

    _setActiveFigureInGrid() {
        this.activeFigure.shape.forEach((x, i) => {
            x.forEach((y, j) => {
                if (y) {
                    this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x] =
                        this.activeFigure.color
                }
            })
        })
    }
}
