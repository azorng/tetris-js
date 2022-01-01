window.onload = () => {
    const game = new Game()
    const ui = new UI(game)

    game.onChange(() => {
        ui.draw()
    })

    game.start()
}
