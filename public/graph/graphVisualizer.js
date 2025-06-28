import { GraphEngine } from './graphEngine.js';

let isVisualizing = false;


const traversalGraph = new GraphEngine('graph-container');

function updateGraphInfo(operation, timeComplexity, spaceComplexity) {
    const opEl = document.getElementById('graph-operation');
    const timeEl = document.getElementById('graph-complexity');
    const spaceEl = document.getElementById('graph-space');
    if (opEl) opEl.textContent = operation;
    if (timeEl) timeEl.textContent = timeComplexity;
    if (spaceEl) spaceEl.textContent = spaceComplexity;
}

export async function animateBfs() {
    const graphContainer = document.getElementById('graph-container');
    if (!graphContainer) return;

     
    if (traversalGraph.adjacencyList.size === 0) {
        alert('Graph is empty. Please generate a new graph first.');
        return;
    }

    const startNodeId = prompt('Enter the starting node for BFS (e.g., "A"):');
     
    if (!startNodeId || !traversalGraph.adjacencyList.has(startNodeId)) {
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
        const domElement = document.getElementById(`graph-container-node-${currentNodeId}`);  
        if (domElement) {
            domElement.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 800));
            domElement.classList.remove('current');
            domElement.classList.add('visited');
        }

         
        const neighbors = traversalGraph.adjacencyList.get(currentNodeId).map(edge => edge.node);
        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                queue.push(neighborId);
            }
        }
    }
    updateGraphInfo('BFS Complete', '', '');
}

function dfsRecursive(nodeId, visited, animationOrder) {
    visited.add(nodeId);
    animationOrder.push(nodeId);
     
    const neighbors = traversalGraph.adjacencyList.get(nodeId).map(edge => edge.node);
    for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
            dfsRecursive(neighborId, visited, animationOrder);
        }
    }
}

export async function animateDfs() {
    const graphContainer = document.getElementById('graph-container');
    if (!graphContainer) return;
     
    if (traversalGraph.adjacencyList.size === 0) {
        alert('Graph is empty. Please generate a new graph first.');
        return;
    }

    const startNodeId = prompt('Enter the starting node for DFS (e.g., "A"):');
     
    if (!startNodeId || !traversalGraph.adjacencyList.has(startNodeId)) {
        alert(`Invalid start node. Please enter a valid node name like "A", "B", etc.`);
        return;
    }

    updateGraphInfo('Depth-First Search (DFS)', 'O(V + E)', 'O(V)');
    const visited = new Set();
    const animationOrder = [];
    dfsRecursive(startNodeId, visited, animationOrder);

    const allDomNodes = graphContainer.querySelectorAll('.graph-node');
    allDomNodes.forEach(n => n.classList.remove('visited', 'current'));

    for (const currentNodeId of animationOrder) {
        const domElement = document.getElementById(`graph-container-node-${currentNodeId}`);  
        if (domElement) {
            domElement.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 800));
            domElement.classList.remove('current');
            domElement.classList.add('visited');
        }
    }
    updateGraphInfo('DFS Complete', '', '');
}

export function setupTraversalControls() {
    document.getElementById('graph-reset-btn').addEventListener('click', () => {
        traversalGraph.generateGraph(false);  
    });
    document.getElementById('graph-bfs-btn').addEventListener('click', async () => {
        if (isVisualizing) return;
        isVisualizing = true;
        await animateBfs();
        isVisualizing = false;
    });
    document.getElementById('graph-dfs-btn').addEventListener('click', async () => {
        if (isVisualizing) return;
        isVisualizing = true;
        await animateDfs();
        isVisualizing = false;
    });
}