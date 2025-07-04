const REPULSION_STRENGTH = 8000;
const ATTRACTION_STRENGTH = 0.04;
const DAMPING_FACTOR = 0.95;
const MIN_DISTANCE = 85;

export class GraphEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nodes = [];
        this.adjacencyList = new Map();
        this.animationFrameId = null;

        if (!this.container) {
            console.error(`Graph container with ID "${containerId}" not found.`);
        }
    }

      
    async generateGraph(isWeighted = false) {
        this._clear();
        
        const loader = this.container.querySelector('.graph-loader');
        const loadingText = this.container.querySelector('.loading-text');
        if (loader) loader.classList.remove('hidden');
        if (loadingText) loadingText.classList.remove('hidden');

        await new Promise(resolve => requestAnimationFrame(resolve));

        const numNodes = 8;
        const nodeIds = Array.from({ length: numNodes }, (_, i) => String.fromCharCode(65 + i));

        nodeIds.forEach(id => {
            this.adjacencyList.set(id, []);
            const position = this._findSafePosition();
            if (position) {
                this.nodes.push({ ...position, id, forceX: 0, forceY: 0 });
            }
        });

          
        const connected = [nodeIds[0]];
        const unconnected = nodeIds.slice(1);
        while (unconnected.length > 0) {
            const uNode = unconnected.splice(Math.floor(Math.random() * unconnected.length), 1)[0];
            const vNode = connected[Math.floor(Math.random() * connected.length)];
            const weight = isWeighted ? Math.floor(Math.random() * 9) + 1 : 1;
            
            this.adjacencyList.get(uNode).push({ node: vNode, weight });
            this.adjacencyList.get(vNode).push({ node: uNode, weight });
            connected.push(uNode);
        }

        this._render();
        this._runForceSimulation();
        return this.nodes;   
    }

      
    _clear() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.adjacencyList.clear();
        this.nodes = [];
        if (this.container) this.container.innerHTML = '';
    }

    _findSafePosition() {
        if (!this.container) return { x: 100, y: 100 };  

    const rect = this.container.getBoundingClientRect();
    for (let attempts = 0; attempts < 50; attempts++) {
        const x = Math.random() * (rect.width - 100) + 40;
        const y = Math.random() * (rect.height - 100) + 40;
        let isSafe = true;
        for (const node of this.nodes) {
            if (Math.hypot(node.x - x, node.y - y) < MIN_DISTANCE) {
                isSafe = false;
                break;
            }
        }
        if (isSafe) return { x, y };
    }
    
    console.warn("Could not find a safe position, placing node in center.");
    return { x: rect.width / 2, y: rect.height / 2 };
    }
    
    _render() {
        if (!this.container) return;
        this.container.innerHTML = '';  
        this.container.innerHTML = `
            <p class="loading-text hidden">Working...</p>
            <div class="graph-loader hidden"></div>
        `;

        this.nodes.forEach(node => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'graph-node';
            nodeEl.id = `${this.container.id}-node-${node.id}`;
            nodeEl.textContent = node.id;
            this.container.appendChild(nodeEl);
        });

        this._updatePositions();
    }
    
    _updatePositions() {
    if (!this.container) return;
    this.nodes.forEach(node => {
        const nodeEl = document.getElementById(`${this.container.id}-node-${node.id}`);
        if (nodeEl) {
            nodeEl.style.left = `${node.x}px`;
            nodeEl.style.top = `${node.y}px`;
        }
    });
 
    const weightsContainer = document.querySelector('#path-visualizer #edge-weights-list');
    if (weightsContainer) {
        weightsContainer.innerHTML = '';  
    }
     
    this.container.querySelectorAll('.graph-edge, .weight').forEach(el => el.remove());

     
    this.adjacencyList.forEach((neighbors, nodeId) => {
        const nodeA = this.nodes.find(n => n.id === nodeId);
        neighbors.forEach(edge => {
            const nodeB = this.nodes.find(n => n.id === edge.node);

            if (nodeA && nodeB && nodeA.id < nodeB.id) {  
                 
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const distance = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                const edgeEl = document.createElement('div');
                edgeEl.id = `${this.container.id}-edge-${nodeA.id}-${nodeB.id}`;
                edgeEl.className = 'graph-edge';
                edgeEl.style.width = `${distance}px`;
                edgeEl.style.left = `${nodeA.x + 25}px`;
                edgeEl.style.top = `${nodeA.y + 25}px`;
                edgeEl.style.transformOrigin = '0 0';
                edgeEl.style.transform = `rotate(${angle}deg)`;
                this.container.appendChild(edgeEl);
                
                if (weightsContainer && edge.weight > 1) {
                    const weightItem = document.createElement('p');
                    weightItem.className = 'weight-item';
                    weightItem.innerHTML = `<span class="edge-label">Edge ${nodeA.id}—${nodeB.id}:</span><span class="edge-value">${edge.weight}</span>`;
                    weightsContainer.appendChild(weightItem);
                }
            }
        });
    });
}

    _runForceSimulation() {
        const simulationStep = () => {
            let totalMovement = 0;
              
              
            this.nodes.forEach(n => { n.forceX = 0; n.forceY = 0; });
            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const nodeA = this.nodes[i], nodeB = this.nodes[j];
                    const dx = nodeA.x - nodeB.x, dy = nodeA.y - nodeB.y;
                    let distSq = dx * dx + dy * dy;
                    if (distSq === 0) distSq = 0.1;
                    const force = REPULSION_STRENGTH / distSq;
                    const fX = (dx / Math.sqrt(distSq)) * force, fY = (dy / Math.sqrt(distSq)) * force;
                    nodeA.forceX += fX; nodeA.forceY += fY;
                    nodeB.forceX -= fX; nodeB.forceY -= fY;
                }
            }
            this.adjacencyList.forEach((neighbors, id) => {
                const nodeA = this.nodes.find(n => n.id === id);
                if (!nodeA) return;
                neighbors.forEach(edge => {
                    const nodeB = this.nodes.find(n => n.id === edge.node);
                    if (!nodeB) return;
                    const dx = nodeB.x - nodeA.x, dy = nodeB.y - nodeA.y;
                    nodeA.forceX += dx * ATTRACTION_STRENGTH; nodeA.forceY += dy * ATTRACTION_STRENGTH;
                });
            });
            this.nodes.forEach(n => {
                n.forceX *= DAMPING_FACTOR; n.forceY *= DAMPING_FACTOR;
                n.x += n.forceX; n.y += n.forceY;
                const rect = this.container.getBoundingClientRect();
                n.x = Math.max(25, Math.min(rect.width - 25, n.x));
                n.y = Math.max(25, Math.min(rect.height - 25, n.y));
                totalMovement += Math.abs(n.forceX) + Math.abs(n.forceY);
            });

            this._updatePositions();

            if (totalMovement > 1) {
                this.animationFrameId = requestAnimationFrame(simulationStep);
            } else {
                this.container.querySelector('.graph-loader')?.classList.add('hidden');
                this.container.querySelector('.loading-text')?.classList.add('hidden');
            }
        };
        this.animationFrameId = requestAnimationFrame(simulationStep);
    }
}