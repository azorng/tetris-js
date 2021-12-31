class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Figure {
    position
    shape

    constructor() {
        const f = this.figures[Util.rng(0, this.figures.length - 1)]
        this.shape = f.shape
        this.color = f.color
        this.position = new Position(Settings.N_COLS / 2 - 1, 0)
    }

    figures = [
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
}
