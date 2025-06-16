

const MIN_DISTANCE = 85; 
const REPULSION_STRENGTH = 8000;  
const ATTRACTION_STRENGTH = 0.04; 
const DAMPING_FACTOR = 0.95; 

let animationFrameId = null;

const adjacencyList = new Map();    
let nodes = [];
const graphContainer = document.getElementById('graph-container');

function runForceSimulation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // Stop any previous simulation
    }

    nodes.forEach(node => {
        node.forceX = 0;
        node.forceY = 0;
    });

    function simulationStep() {
        // 1. Calculate Repulsive Forces (every node pushes every other node)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];
                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distanceSquared = dx * dx + dy * dy;
                if (distanceSquared > 0) {
                    const force = REPULSION_STRENGTH / distanceSquared;
                    const forceX = (dx / Math.sqrt(distanceSquared)) * force;
                    const forceY = (dy / Math.sqrt(distanceSquared)) * force;
                    nodeA.forceX += forceX;
                    nodeA.forceY += forceY;
                    nodeB.forceX -= forceX;
                    nodeB.forceY -= forceY;
                }
            }
        }

        // 2. Calculate Attractive Forces (edges pull nodes together)
        adjacencyList.forEach((neighbors, nodeId) => {
            const nodeA = nodes.find(n => n.id === nodeId);
            neighbors.forEach(neighborId => {
                const nodeB = nodes.find(n => n.id === neighborId);
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const forceX = dx * ATTRACTION_STRENGTH;
                const forceY = dy * ATTRACTION_STRENGTH;
                nodeA.forceX += forceX;
                nodeA.forceY += forceY;
                nodeB.forceX -= forceX;
                nodeB.forceY -= forceY;
            });
        });

        // 3. Apply forces to move nodes
        let totalMovement = 0;
        nodes.forEach(node => {
            node.forceX *= DAMPING_FACTOR;
            node.forceY *= DAMPING_FACTOR;
            node.x += node.forceX;
            node.y += node.forceY;
            
            // Keep nodes within the container bounds
            const containerRect = graphContainer.getBoundingClientRect();
            node.x = Math.max(25, Math.min(containerRect.width - 25, node.x));
            node.y = Math.max(25, Math.min(containerRect.height - 25, node.y));
            totalMovement += Math.abs(node.forceX) + Math.abs(node.forceY);
        });
        
        // 4. Re-render the graph with the new positions
        updateNodePositions();

        // 5. Continue simulation if nodes are still moving
        if (totalMovement > 1) {
            animationFrameId = requestAnimationFrame(simulationStep);
        }
    }
    simulationStep();
}

function updateGraphInfo(operation, timeComplexity, spaceComplexity) {
    const opEl = document.getElementById('graph-operation');
    const timeEl = document.getElementById('graph-complexity');
    const spaceEl = document.getElementById('graph-space');
    if (opEl) opEl.textContent = operation;
    if (timeEl) timeEl.textContent = timeComplexity;
    if (spaceEl) spaceEl.textContent = spaceComplexity;
}

function findSafePosition() {
    if (!graphContainer) return null;
    let position = null;
    let attempts = 0;
    const maxAttempts = 50;
    while (attempts < maxAttempts) {
        const containerRect = graphContainer.getBoundingClientRect();
        const x = Math.random() * (containerRect.width - 100) + 40;
        const y = Math.random() * (containerRect.height - 100) + 40;
        let isSafe = true;
        for (const existingNode of nodes) {
            const distance = Math.sqrt(Math.pow(existingNode.x - x, 2) + Math.pow(existingNode.y - y, 2));
            if (distance < MIN_DISTANCE) {
                isSafe = false;
                break;
            }
        }
        if (isSafe) {
            position = { x, y };
            break;
        }
        attempts++;
    }
    return position;
}

function drawEdge(fromNode, toNode) {
    if (!fromNode || !toNode || !graphContainer) return;
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
    const containerRect = graphContainer.getBoundingClientRect();
    const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
    const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
    const x2 = toRect.left - containerRect.left + toRect.width / 2;
    const y2 = toRect.top - containerRect.top + toRect.height / 2;
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const edge = document.createElement('div');
    edge.className = 'graph-edge';
    edge.style.width = `${length}px`;
    edge.style.left = `${x1}px`;
    edge.style.top = `${y1}px`;
    edge.style.transform = `rotate(${angle}deg)`;
    graphContainer.appendChild(edge);
}

function updateNodePositions() {
    // Update node positions
    nodes.forEach(node => {
        const nodeElement = document.getElementById(`graph-node-${node.id}`);
        if (nodeElement) {
            nodeElement.style.left = `${node.x}px`;
            nodeElement.style.top = `${node.y}px`;
        }
    });

    // Update edge positions by clearing and redrawing only the edges
    const edges = graphContainer.querySelectorAll('.graph-edge');
    edges.forEach(edge => edge.remove());

    adjacencyList.forEach((neighbors, nodeId) => {
        const fromNodeElement = document.getElementById(`graph-node-${nodeId}`);
        neighbors.forEach(neighborId => {
            if (nodeId < neighborId) {
                const toNodeElement = document.getElementById(`graph-node-${neighborId}`);
                drawEdge(fromNodeElement, toNodeElement);
            }
        });
    });
}

function renderGraph() {
    if (!graphContainer) return;
    graphContainer.innerHTML = '';
    nodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'graph-node';
        nodeElement.id = `graph-node-${node.id}`;
        nodeElement.textContent = node.id;
        // The positions will be set by the simulation loop
        graphContainer.appendChild(nodeElement);
    });
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;
        element.style.top = `${newTop}px`;
        element.style.left = `${newLeft}px`;
        const nodeId = element.id.replace('graph-node-', '');
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
            node.x = newLeft;
            node.y = newTop;
        }
        //renderGraph();
        runForceSimulation();
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function initializeGraph() {
    // This function sets everything up in the correct order.
    // 1. Create the DOM elements for the nodes
    renderGraph();
    // 2. Make the newly created nodes draggable
    nodes.forEach(node => {
        const nodeElement = document.getElementById(`graph-node-${node.id}`);
        if (nodeElement) {
            makeDraggable(nodeElement, node.id);
        }
    });
    // 3. Run the physics simulation to arrange them
    runForceSimulation();
}


export function generateRandomGraph() {
    
    adjacencyList.clear();
    nodes = [];

     const numNodes = 8;
    const nodeIds = Array.from({ length: numNodes }, (_, i) => String.fromCharCode(65 + i));  

     
    nodeIds.forEach(id => {
        adjacencyList.set(id, []);
        const position = findSafePosition();
        if (position) {
            nodes.push({ id, x: position.x, y: position.y });
        }
    });

     
    const connected = [nodeIds[0]];
    const unconnected = nodeIds.slice(1);

    while (unconnected.length > 0) {
         
        const unconnectedIndex = Math.floor(Math.random() * unconnected.length);
        const uNode = unconnected[unconnectedIndex];
        
         
        const vNode = connected[Math.floor(Math.random() * connected.length)];

         
        adjacencyList.get(uNode).push(vNode);
        adjacencyList.get(vNode).push(uNode);

         
        connected.push(uNode);
        unconnected.splice(unconnectedIndex, 1);
    }
    
     
     
     
    let nodeA, nodeB;
    do {
         
        const indexA = Math.floor(Math.random() * numNodes);
        const indexB = Math.floor(Math.random() * numNodes);
        nodeA = nodeIds[indexA];
        nodeB = nodeIds[indexB];
        
         
    } while (nodeA === nodeB || adjacencyList.get(nodeA).includes(nodeB));
    
     
    adjacencyList.get(nodeA).push(nodeB);
    adjacencyList.get(nodeB).push(nodeA);
    initializeGraph();
    updateGraphInfo('Generated New Graph', '', `V=8, E=8`);
}


export async function animateBfs() {
    if (adjacencyList.size === 0) {
        alert('Graph is empty. Please generate a new graph first.');
        return;
    }

     
     
    const startNodeId = prompt('Enter the starting node for BFS (e.g., "A"):');
    
    if (!startNodeId || !adjacencyList.has(startNodeId)) {
        alert(`Invalid start node. Please enter a valid node name like "A", "B", etc.`);
        return;
    }

    updateGraphInfo('Breadth-First Search (BFS)', 'O(V + E)', 'O(V)');

     
    const queue = [startNodeId];
    const visited = new Set([startNodeId]);  

     
    const allDomNodes = graphContainer.querySelectorAll('.graph-node');
    allDomNodes.forEach(n => n.classList.remove('visited', 'current'));

     
    while (queue.length > 0) {
         
        const currentNodeId = queue.shift();

         
        const domElement = document.getElementById(`graph-node-${currentNodeId}`);
        if (domElement) {
             
            domElement.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 800));  

             
            domElement.classList.remove('current');
            domElement.classList.add('visited');
        }

         
        const neighbors = adjacencyList.get(currentNodeId);

         
        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                visited.add(neighborId);  
                queue.push(neighborId);
            }
        }
    }

    updateGraphInfo('BFS Complete', '', '');
}

export async function animateDfs() {
    alert('DFS traversal animation not implemented yet.');
}
