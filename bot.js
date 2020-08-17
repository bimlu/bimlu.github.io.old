class Bot {
    constructor(botName) {
        this.botName = botName;
        this.bot = null;
        this.position = null;
        this.timerId = null;
    }

    chBot() {
        if (snake.headX === TABLESIZE - 1 && snake.headY === TABLESIZE - 1) {
            snake.moveLeft();
        }

        if (snake.headY === 0 && snake.headX === TABLESIZE - 1) {
            snake.moveUp();
        }

        if (!this.position) {
            if (snake.headY === TABLESIZE - 1) {
                if (snake.direction === 'right') {
                    snake.moveDown();
                } else if (snake.direction === 'down') {
                    snake.moveLeft();
                } 
            } else if (snake.headY === 0) {
                snake.moveUp();
                this.position = 'correct'
            } 
        } else {
            if (snake.headX === 0) {
                if (snake.direction === 'up') {
                    snake.moveRight()
                } else {
                    snake.moveDown()
                }
            } else if (snake.headX === TABLESIZE - 1) {
                if (snake.direction === 'down') {
                    snake.moveRight()
                } else if (snake.direction === 'right') {
                    snake.moveUp()
                }
            }
        }
    }

    mcBot() {
        if (snake.headX === 0 && snake.headY === 0) {
            (snake.direction === 'up') ? snake.moveRight() : snake.moveDown();
        } else if (snake.headX === 0 && snake.headY === TABLESIZE - 1) {
            (snake.direction === 'right') ? snake.moveDown() : snake.moveLeft();
        } else if (snake.headX === TABLESIZE - 1 && snake.headY === TABLESIZE -1) {
            (snake.direction === 'down') ? snake.moveLeft() : snake.moveUp();
        } else if (snake.headX === TABLESIZE - 1 && snake.headY === 0) {
            (snake.direction === 'left') ? snake.moveUp() : snake.moveRight();
        } else if (snake.headX === 0 && snake.direction === 'up') {
            (food.foodY > snake.headY) ? snake.moveRight() : snake.moveLeft();
        } else if (snake.headY === TABLESIZE - 1 && snake.direction === 'right') {
            (food.foodX > snake.headX) ? snake.moveDown() : snake.moveUp();
        } else if (snake.headX === TABLESIZE - 1 && snake.direction === 'down') {
            (food.foodY > snake.headY) ? snake.moveRight() : snake.moveLeft();
        } else if (snake.headY === 0 && snake.direction === 'left') {
            (food.foodX > snake.headX) ? snake.moveDown() : snake.moveUp();
        } else if (food.foodX === snake.headX) {
            (food.foodY > snake.headY) ? snake.moveRight() : snake.moveLeft();
        } else if (food.foodY === snake.headY) {
            (food.foodX > snake.headX) ? snake.moveDown() : snake.moveUp();
        }
    }

    mccBot() {
        graph.graph = graph.makeGraph();
        // remove vertex from graph where tail is filled
        for (let i = 0; i < snake.tailX.length; i++) {
            let tailVertex = snake.tailX[i] * graph.GRIDSIZE + snake.tailY[i];
            graph.removeVertex(tailVertex);

            // remove all connections of this vertex from graph
            for (let vert in graph.graph) {
                let neigs = graph.graph[vert];
                neigs.forEach(neig => {
                    if (neig === tailVertex) {
                        graph.removeEdge([vert, neig]);
                    }
                })
            }
        }

        // vertices of head and food
        let headVertex = snake.headX * graph.GRIDSIZE + snake.headY;
        let foodVertex = food.foodX * graph.GRIDSIZE + food.foodY;

        // find the shortest path from head to food, e.g. path = [1, 2, 6]
        let path = graph.findShortestPathBFS(headVertex, foodVertex);

        if (path) {
            if (path[1] === headVertex + 1) {
                snake.moveRight();
            } else if (path[1] === headVertex - 1) {
                snake.moveLeft();
            } else if (path[1] === headVertex + graph.GRIDSIZE) {
                snake.moveDown();
            } else if (path[1] === headVertex - graph.GRIDSIZE) {
                snake.moveUp();
            }
        } 
        
    }

    start() {
        game.start();

        switch (this.botName) {
            case 'chBot':
                this.bot = this.chBot;
                break;
            case 'mcBot':
                this.bot = this.mcBot;
                break;
            case 'mccBot':
                this.bot = this.mccBot;
                break;

        }

        let play = () => {
            this.bot();

            if (snake.dead) {
                bot.stop();
                return;
            }

            this.timerId = setTimeout(play, game.updateInterval);
        }
        
        this.timerId = setTimeout(play, 0);
    }

    pause() {
        clearTimeout(this.timerId);
        game.pause();
    }

    stop() {
        clearTimeout(this.timerId);
        game.stop();
    }
}