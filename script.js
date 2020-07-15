class Game {
    constructor(m) {
        this.cells = this.createInitialSeed(m);
        this.interval = 100;
        this.cellSize = 32;
        this.createBoard();
    }

    updateCellsGeneration() {
        let newCells = this.cells.map(row => row.map(el => 0));

        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                let n = 0; // sum of alive cell in neighbour

                /* 
                    (i-1,j-1)   (i-1,j)     (i-1,j+1)
                    (i,j-1)     (i,j)       (i,j+1)
                    (i+1,j-1)   (i+1,j)     (i+1,j+1)
                */

                // all cells except border-cells
                if (i !== 0 && j !== 0 && i !== this.cells.length-1 &&
                        j !== this.cells.length-1) {
                    n += this.cells[i-1][j-1] + this.cells[i-1][j] +
                         this.cells[i-1][j+1] + this.cells[i][j-1] +
                         this.cells[i][j+1] + this.cells[i+1][j-1] +
                         this.cells[i+1][j] + this.cells[i+1][j+1];
                }else if (i === 0 && j !== 0 && j !== this.cells.length-1) {
                    // all top-most-border cells expect cells at the edges
                    n += this.cells[this.cells.length-1][j-1] + this.cells[this.cells.length-1][j] +
                     this.cells[this.cells.length-1][j+1] + this.cells[i][j-1] +
                     this.cells[i][j+1] + this.cells[i+1][j-1] +
                     this.cells[i+1][j] + this.cells[i+1][j+1];
                }else if (i === this.cells.length-1 && j !== 0 && j !== this.cells.length-1) {
                    // all bottom-most-border cells expect cells at the edges
                    n += this.cells[i-1][j-1] + this.cells[i-1][j] +
                     this.cells[i-1][j+1] + this.cells[i][j-1] +
                     this.cells[i][j+1] + this.cells[0][j-1] +
                     this.cells[0][j] + this.cells[0][j+1];
                }else if (j === 0 && i !== 0 && i !== this.cells.length-1) {
                    // all left-most-border cells expect cells at the edges
                    n += this.cells[i-1][this.cells.length-1] + this.cells[i-1][j] +
                         this.cells[i-1][j+1] + this.cells[i][this.cells.length-1] +
                         this.cells[i][j+1] + this.cells[i+1][this.cells.length-1] +
                         this.cells[i+1][j] + this.cells[i+1][j+1];
                }else if (j === this.cells.length-1 && i !== 0 && i !== this.cells.length-1) {
                    // all right-most-border cells expect cells at the edges
                    n += this.cells[i-1][j-1] + this.cells[i-1][j] +
                         this.cells[i-1][0] + this.cells[i][j-1] +
                         this.cells[i][0] + this.cells[i+1][j-1] +
                         this.cells[i+1][j] + this.cells[i+1][0];
                } else if (i === 0 && j === 0) {
                    // top-left-corner cell
                    n += this.cells[this.cells.length-1][this.cells.length-1] +
                         this.cells[this.cells.length-1][j] +
                         this.cells[this.cells.length-1][j+1] + 
                         this.cells[i][this.cells.length-1] +
                         this.cells[i][j+1] + this.cells[i+1][this.cells.length-1] +
                         this.cells[i+1][j] + this.cells[i+1][j+1];
                } else if (i === 0 && j === this.cells.length-1) {
                    // top-right-corner cell
                    n += this.cells[this.cells.length-1][j-1] + this.cells[this.cells.length-1][j] +
                         this.cells[this.cells.length-1][0] + this.cells[i][j-1] +
                         this.cells[i][0] + this.cells[i+1][j-1] +
                         this.cells[i+1][j] + this.cells[i+1][0];
                } else if (i === this.cells.length-1 && j === 0) {
                    // bottom-left-corner cell
                    n += this.cells[i-1][this.cells.length-1] + this.cells[i-1][j] +
                         this.cells[i-1][j+1] + this.cells[i][this.cells.length-1] +
                         this.cells[i][j+1] + this.cells[0][this.cells.length-1] +
                         this.cells[0][j] + this.cells[0][j+1];
                } else if (i === this.cells.length-1 && j === this.cells.length-1) {
                    // bottom-right-corner cell
                    n += this.cells[i-1][j-1] + this.cells[i-1][j] +
                         this.cells[i-1][0] + this.cells[i][j-1] +
                         this.cells[i][0] + this.cells[0][j-1] +
                         this.cells[0][j] + this.cells[0][0];
                }

                // whether the newCells[i][j] is alive or dead
                if ( this.cells[i][j] === 1 ) {
                    if (n >= 2 && n <= 3) {
                        newCells[i][j] = 1;
                    } else {
                        newCells[i][j] = 0;
                    }
                } else {
                    if (n === 3) {
                        newCells[i][j] = 1;
                    } else {
                        newCells[i][j] = 0;
                    }
                }  
            }
        }

        this.cells = newCells;
    }

    start() {
        this.stop();
        let next = () => {
            this.updateCellsGeneration();
            this.render();
            this.timerId = setTimeout(next, this.interval);
        }
        this.timerId = setTimeout(next, 0);
    }

    stop() {
        clearTimeout(this.timerId);
    }

    clear() {
        this.stop();
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                this.cells[i][j] = 0;
            }
        }
        this.render();
    }

    createBoard() {
        let board = document.querySelector('.board');
        let table = document.querySelector('.board').children[0];
        if (table) {
            table.remove();
        }
  
        table = document.createElement('table');
        table.className = 'tableBorderd';

        for (let i = 0; i < this.cells.length; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < this.cells.length; j++) {
                let td = document.createElement('td');

                // render initial board
                // note:- don't call this.render()
                if (this.cells[i][j] === 1) {
                    td.className = 'alive';
                } else {
                    td.className = 'dead';
                }

                // dynamically adjust each cell size
                td.style.width = this.cellSize;
                td.style.height = this.cellSize;

                // add celloffsetHeight 

                // add event listener to each cell
                td.addEventListener('click', (e) => {
                    if (this.cells[i][j] === 1) {
                        this.cells[i][j] = 0;
                        td.className = 'dead';
                    } else {
                        this.cells[i][j] = 1;
                        td.className = 'alive';
                    }
                })

                tr.appendChild(td);
            }
            table.appendChild(tr);

        }
        board.appendChild(table);
        this.render();

    }

    render() {
        let table = document.querySelector('.board').children[0];

        for (let i = 0; i < this.cells.length; i++) {
            let tr = table.children[i];
            if (tr !== undefined) {
                for (let j = 0; j < this.cells.length; j++) {
                    let td = tr.children[j];

                    if (td !== undefined) {
                        // assign className to cells based on their state
                        if (this.cells[i][j] === 1) {
                            td.className = 'alive';
                        } else {
                            td.className = 'dead';
                        }
                    }

                }
            }
            
        }

        /*************** FOR UNBOUNDED UNIVERSE *************/
        /****************************************************/
        /*
        cells are only added in right and bottom
        check if the board needs more cells
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i][this.cells.length-1] ||
                this.cells[this.cells.length-1][i]) {
                    this.stop();
                    if (this.cellSize >= 8) {
                        this.cellSize /= 2;
                        this.addMoreCells(this.cells.length);
                        this.createBoard();
                    }        
            }
        }
        */
        /****************************************************/
        /****************************************************/
    }

    addMoreCells(n) {
        for (let i = 0; i < n && this.cells.length < 40; i++) {
            for (let cellRow of this.cells) {
                cellRow.push(0);
            }
            let temp = this.cells[0].map(el => 0);
            this.cells.push(temp);
        }   
    }

    changeSpeed(speed) {
        this.stop();
        this.interval = 500 / speed;
        this.start();
    }

    changeBoardConfig() {
        if (this.cellSize >= 16) {
            this.cellSize /= 2;
            this.addMoreCells(this.cells.length);
        }

        if (this.cellSize < 16) {
            let boardConfigButton = document.querySelector('button.size2X');
            boardConfigButton.hidden = true; 
        }
    }

    createInitialSeed(m) {
        let seedSelector = document.querySelector('select[name="seed"]');
        let cells = [];

        if (seedSelector.selectedIndex === 0) {
            // create glider
            // creates glider by default
            for (let i = 0; i < m; i++) {
                let cellRow = [];
                for (let j = 0; j < m; j++) {
                    if ( (i === 0 && j === 0) ||
                         (i === 1 && j === 1) ||
                         (i === 1 && j === 2) ||
                         (i === 2 && j === 0) ||
                         (i === 2 && j === 1)) {

                        cellRow.push(1);
                    } else {
                        cellRow.push(0);
                    }
                }
                cells.push(cellRow);
            }
        } else if (seedSelector.selectedIndex === 1) {
            // create empty cells
            for (let i = 0; i < m; i++) {
                let cellRow = [];
                for (let j = 0; j < m; j++) {
                    cellRow.push(0);
                }
                cells.push(cellRow);
            }
        } else if (seedSelector.selectedIndex === 2) {
            // all cells alive
            for (let i = 0; i < m; i++) {
                let cellRow = [];
                for (let j = 0; j < m; j++) {
                    cellRow.push(1);
                }
                cells.push(cellRow);
            }
        } else if (seedSelector.seedSelector === 3) {
            // create glider-gun
            let n = 40;
            this.cellSize = 8;

            for (let i = 0; i < n; i++) {
                let cellRow = [];
                for (let j = 0; j < n; j++) {
                    if (i === 1) {
                        if (j === 25) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 2) {
                        if (j === 25 || j === 23) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 3) {
                        if (j === 36 || j === 35 || j === 22 || j === 21 || j === 14 || j === 13) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 4) {
                        if (j === 36 || j === 35 || j === 22 || j === 21 || j === 16 || j === 12) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 5) {
                        if (j === 1 || j === 2 || j === 11 || j === 17 || j === 21 || j === 22) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 6) {
                        if (j === 1 || j === 2 || j === 11 || j === 15 || j === 17 || j === 18 || j === 23) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 7) {
                        if (j === 11 || j === 17 || j === 25) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 8) {
                        if (j === 12 || j === 16 || j === 27) {
                            cellRow.push(1);
                        } else {
                            cellRow.push(0);
                        }
                    } else if (i === 9) {
                        if (j === 13 || j === 14) {
                            cellRow.push(1);
                        }
                        else {
                            cellRow.push(0);
                        }
                    } else {
                        cellRow.push(0);
                    }
                }
                cells.push(cellRow);
            }
        } else {
            // code here
        }

        return cells;
    }
}

/**********************************************/
/**************GAME CLASS INSTANCE*************/
/**********************************************/

// defalut initial cell is 12
let game = new Game(12);


/**********************************************/
/*****************EVENT LISTENERS**************/
/**********************************************/

let startButton = document.querySelector('button.start');
startButton.addEventListener('click', (e) => {
    game.start();
});

let stopButton = document.querySelector('button.stop');
stopButton.addEventListener('click', (e) => {
    game.stop();
});

let clearButton = document.querySelector('button.clear');
clearButton.addEventListener('click', (e) => {
    game.clear();
});

let viewButton = document.querySelector('button.view');
viewButton.addEventListener('click', (e) => {
    let table = document.querySelector('.board').children[0];
    (table.className === 'tableSimple') ? table.className = 'tableBorderd' :
                                          table.className = 'tableSimple';
});

let boardConfigButton = document.querySelector('button.size2X');
boardConfigButton.addEventListener('click', (e) => {
    game.changeBoardConfig();
    game.createBoard();

    let seedDiv = document.querySelector('.seedDiv');
    seedDiv.hidden = true;
});

let speedSlider = document.querySelector('input[name="speed"]');
speedSlider.addEventListener('change', (e) => {
    game.changeSpeed(speedSlider.value);
});

let seedSelector = document.querySelector('select[name="seed"]');
seedSelector.addEventListener('change', (e) => {
    game.stop();
    game.cells = game.createInitialSeed(12);
    game.createBoard();
})