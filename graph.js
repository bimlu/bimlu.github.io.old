class Graph {
    constructor() {
        this.GRIDSIZE = TABLESIZE;
    }

    makeGraph() {
        let cnt = 0;
        let A = [], g = {};

        for (let i = 0; i < this.GRIDSIZE; i++) {
            let row = [];
            for (let j = 0; j < this.GRIDSIZE; j++) {
                row.push(cnt);
                cnt++;
            }
            A.push(row);
        }

        cnt = 0
        for (let i = 0; i < this.GRIDSIZE; i++) {
            for (let j = 0; j < this.GRIDSIZE; j++) {
                g[cnt] = [];
                for (let x of [-1, 0, 1]) {
                    if (x === 0) {
                        for (let y of [-1, 1]) {
                            if (A[i+x]!==undefined && A[i+x][j+y]!==undefined) {
                                g[cnt].push(A[i+x][j+y]);
                            }
                        }
                    } else {
                        if (A[i+x]!==undefined && A[i+x][j]!==undefined) {
                            g[cnt].push(A[i+x][j]);
                        }
                    }
                }
                cnt++;
            }
        }
        return g;
        
    }

    addVertex(vertex) {
        if (!(vertex in this.graph)) {
            this.graph[vertex] = []
        }
    }

    addEdge(edge) {
        let vertex1, vertex2;
        [vertex1, vertex2] = edge;
        if (vertex1 in this.graph) {
            this.graph[vertex1].push(vertex2);
        } else {
            this.graph[vertex1] = [vertex2]
        }
    }

    removeVertex(vertex) {
        delete this.graph[vertex];
    }

    removeEdge(edge) {
        let vert, neig;
        [vert, neig] = edge;
        let idx = this.graph[vert].indexOf(neig);
        this.graph[vert].splice(idx, 1);
    }

    findShortestPathBFS(root, goal) {
        let parent = {};
        let discovered = [];
        let queue = [];

        discovered.push(root);
        queue.push(root);

        while (queue) {
            let node = queue.shift();
            if (node === goal) {
                let path = [goal];
                while (goal !== root) {
                    let new_goal = parent[goal];
                    path.push(new_goal);
                    goal = new_goal;
                }
                return path.reverse();
            }

            if (!this.graph[node]) {
                return null;
            }

            for (let neighbour of this.graph[node]) {
                if ( !discovered.includes(neighbour) ) {
                    discovered.push(neighbour);
                    parent[neighbour] = node;
                    queue.push(neighbour);
                }
            }
        }
    }
}