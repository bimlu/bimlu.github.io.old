let game = new Game();
let bot;
let graph;

let gameControl = (e) => {
    if (game.player === 'bot') {
        if (e.key === 'Enter' || e.key === ' ') {
            (game.paused === true) ? bot.start() : bot.pause();
        }

        return;
    }

    switch (e.key) {
        case 'Enter':
        case ' ':
            (game.paused === true) ? game.start() : game.pause();
            break;
        case 'ArrowLeft':
        case 'a':
            snake.moveLeft();
            break;
        case 'ArrowUp':
        case 'w':
            snake.moveUp();
            break;
        case 'ArrowRight':
        case 'd':
            snake.moveRight();
            break;
        case 'ArrowDown':
        case 's':
            snake.moveDown();
            break;
    }
}

document.addEventListener('keydown', gameControl);

document.querySelector('button.userGame').addEventListener('click', (e) => {
    if (game.player) {
        return;
    }

    game.player = 'user'
    game.start()
})

document.querySelector('button.chBot').addEventListener('click', (e) => {
    if (game.player) {
        return;
    }

    game.player = 'bot';
    bot = new Bot('chBot');
    bot.start();
})

document.querySelector('button.mcBot').addEventListener('click', (e) => {
    if (game.player) {
        return;
    }

    game.player = 'bot';
    bot = new Bot('mcBot');
    bot.start();
})

document.querySelector('button.mccBot').addEventListener('click', (e) => {
    if (game.player) {
        return;
    }

    graph = new Graph();
    game.player = 'bot';
    bot = new Bot('mccBot');
    bot.start();
})

document.querySelector('button.reset').addEventListener('click', (e) => {
 
    game.reset();    

    // show all buttons while the game is on
    document.querySelector('button.userGame').hidden = false;
    document.querySelector('button.chBot').hidden = false;
    document.querySelector('button.mcBot').hidden = false;
    document.querySelector('button.mccBot').hidden = false;
})