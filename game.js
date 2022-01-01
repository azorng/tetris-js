class Game {
    grid = []
    activeFigure
    nextFigure
    onChangeAction

    score = 0
    level = 1

    constructor() {
        this._initGrid()
        this._newFigure()
    }

    start() {
        setInterval(() => {
            this.moveDown({ auto: true })
        }, 400)
    }

    onChange(fn) {
        this.onChangeAction = fn
    }

    moveDown(cnf = { auto: false }) {
        if (!this._isCollisionDown()) {
            this.activeFigure.moveDown()
            if (!cnf.auto) {
                this.score += 1
            }
        } else {
            this._handleLineClear()
            this._newFigure(this.nextFigure)
        }
    }

    moveLeft() {
        if (!this._isCollisionLeft()) {
            this.activeFigure.moveLeft()
        }
    }

    moveRight() {
        if (!this._isCollisionRight()) {
            this.activeFigure.moveRight()
        }
    }

    rotate() {
        this.activeFigure.rotate()
    }

    moveAllWayDown() {
        const activeFigure = this.activeFigure
        while (activeFigure == this.activeFigure) {
            this.moveDown({ auto: true })
            this.score += 2
        }
    }

    _newFigure(figure) {
        this.activeFigure = figure || new Figure(this)
        this.nextFigure = new Figure(this)

        this.handleChangeInFigure()

        if (this._isCollisionDown()) {
            // Game over
            this.score = 0
            this.level = 1
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

    handleChangeInFigure(changeAction) {
        this._removeActiveFigureFromGrid()
        if (changeAction) {
            changeAction()
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

        this.score +=
            {
                1: 100 * this.level,
                2: 300 * this.level,
                3: 500 * this.level,
                4: 800 * this.level
            }[streak] || 0
        this.level += streak
    }

    _isCollisionRight() {
        return this._someCell(
            (relY, relX) =>
                relX + this.activeFigure.position.x + 1 == Settings.N_COLS ||
                !!this.grid[relY + this.activeFigure.position.y][relX + this.activeFigure.position.x + 1]
        )
    }

    _isCollisionLeft() {
        return this._someCell(
            (relY, relX) =>
                relX + this.activeFigure.position.x == 0 ||
                !!this.grid[relY + this.activeFigure.position.y][relX + this.activeFigure.position.x - 1]
        )
    }

    _isCollisionDown() {
        return this._someCell(
            (relY, relX) =>
                relY + this.activeFigure.position.y + 1 == Settings.N_ROWS ||
                !!this.grid[relY + this.activeFigure.position.y + 1][relX + this.activeFigure.position.x]
        )
    }

    _someCell(f) {
        this._removeActiveFigureFromGrid()
        const r = this.activeFigure.shape.some((x, i) => x.some((y, j) => y && f(i, j)))
        this._setActiveFigureInGrid()
        return r
    }

    _removeActiveFigureFromGrid() {
        this._fillActiveFigureWith(0)
    }

    _setActiveFigureInGrid() {
        this._fillActiveFigureWith(this.activeFigure.color)
    }

    _fillActiveFigureWith(fillWith) {
        this.activeFigure.shape.forEach((x, i) => {
            x.forEach((y, j) => {
                if (y && [j + this.activeFigure.position.x] < Settings.N_COLS) {
                    this.grid[i + this.activeFigure.position.y][j + this.activeFigure.position.x] = fillWith
                }
            })
        })
    }
}
