

const MIN_DISTANCE = 85; 


const adjacencyList = new Map();
let nodes = [];
const graphContainer = document.getElementById('graph-container');
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

function renderGraph() {
    if (!graphContainer) return;
    graphContainer.innerHTML = '';
    nodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'graph-node';
        nodeElement.id = `graph-node-${node.id}`;
        nodeElement.textContent = node.id;
        nodeElement.style.left = `${node.x}px`;
        nodeElement.style.top = `${node.y}px`;
        makeDraggable(nodeElement); // Keep nodes draggable
        graphContainer.appendChild(nodeElement);
    });
    adjacencyList.forEach((neighbors, nodeId) => {
        const fromNodeElement = document.getElementById(`graph-node-${nodeId}`);
        neighbors.forEach(neighborId => {
            const toNodeElement = document.getElementById(`graph-node-${neighborId}`);
            if (nodeId < neighborId) {
                drawEdge(fromNodeElement, toNodeElement);
            }
        });
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
        renderGraph();
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


export function generateRandomGraph() {
    
    adjacencyList.clear();
    nodes = [];

    const numNodes = Math.floor(Math.random() * 6) + 7; 
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
    
   
    renderGraph();
    updateGraphInfo('Generated New Graph', '', `V=${numNodes}, E=${numNodes - 1}`);
}

// Placeholders for traversal animations
export async function animateBfs() {
    alert('BFS traversal animation not implemented yet.');
}

export async function animateDfs() {
    alert('DFS traversal animation not implemented yet.');
}
