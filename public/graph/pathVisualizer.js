import { GraphEngine } from './graphEngine.js';

let isVisualizing = false;
const ANIMATION_DELAY = 150;
const pathGraph = new GraphEngine('path-graph-container');  

async function visualizeBellmanFord() {
    if (isVisualizing) return;
    isVisualizing = true;
    
    updatePathInfo('Bellman-Ford', 'O(V * E)', 'O(V)');
    resetPathVisualization(); 

    const nodes = pathGraph.nodes;
    const adjacencyList = pathGraph.adjacencyList;
    const startNodeId = document.getElementById('start-node-select').value;
    const endNodeId = document.getElementById('end-node-select').value;

    const startNode = nodes.find(n => n.id === startNodeId);
    if (!startNode) return;
    startNode.distance = 0;
    updateDistancesTable();

    const edges = [];
    adjacencyList.forEach((neighbors, uId) => {
        neighbors.forEach(edge => {
            edges.push({ source: uId, target: edge.node, weight: edge.weight });
        });
    });

    for (let i = 0; i < nodes.length - 1; i++) {
        let changed = false;
        for (const edge of edges) {
            const u = nodes.find(n => n.id === edge.source);
            const v = nodes.find(n => n.id === edge.target);
            if (u.distance !== Infinity && u.distance + edge.weight < v.distance) {
                v.distance = u.distance + edge.weight;
                v.prev = u.id;
                changed = true;
                
                const vNodeElem = document.getElementById(`path-graph-container-node-${v.id}`);
                if(vNodeElem) vNodeElem.classList.add('current');
                await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY / 2));
                if(vNodeElem) vNodeElem.classList.remove('current');
            }
        }
        updateDistancesTable();
        if (!changed) break;
    }

    for (const edge of edges) {
        const u = nodes.find(n => n.id === edge.source);
        const v = nodes.find(n => n.id === edge.target);
        if (u.distance !== Infinity && u.distance + edge.weight < v.distance) {
            alert('Negative weight cycle detected!');
            isVisualizing = false;
            return;
        }
    }
    
    const path = [];
    let currentId = endNodeId;
    while (currentId) {
        path.unshift(currentId);
        const node = nodes.find(n => n.id === currentId);
        currentId = node ? node.prev : null;
    }
    
    const pathResultEl = document.getElementById('path-result');
    if (pathResultEl && path[0] === startNodeId) {
        pathResultEl.textContent = `Path: ${path.join(' → ')} (Cost: ${nodes.find(n => n.id === endNodeId).distance})`;
        path.forEach(nodeId => document.getElementById(`path-graph-container-node-${nodeId}`)?.classList.add('shortest-path'));
    } else if(pathResultEl) {
        pathResultEl.textContent = `No path found from ${startNodeId} to ${endNodeId}.`;
    }

    isVisualizing = false;
}

async function visualizeDijkstra() {
    if (isVisualizing) return;
    isVisualizing = true;
    
    const startNodeSelect = document.getElementById('start-node-select');
    const endNodeSelect = document.getElementById('end-node-select');
    if (!startNodeSelect || !endNodeSelect) {
        console.error("Could not find start/end node select elements.");
        isVisualizing = false;
        return;
    }
    const startNodeId = startNodeSelect.value;
    const endNodeId = endNodeSelect.value;
    if (!startNodeId || !endNodeId) {
        alert("Please generate a graph and select start/end nodes.");
        isVisualizing = false;
        return;
    }
    
    const nodes = pathGraph.nodes;
    const adjacencyList = pathGraph.adjacencyList;
    updatePathInfo('Dijkstra\'s Algorithm', 'O(E log V)', 'O(V)');
    
    resetPathVisualization();

    const startNode = nodes.find(n => n.id === startNodeId);
    if (!startNode) return;
    startNode.distance = 0;

    const pq = [{ id: startNode.id, distance: 0 }];
    const visited = new Set();
    
    while (pq.length > 0) {
        pq.sort((a, b) => a.distance - b.distance);
        const { id: uId, distance: uDist } = pq.shift();
        if (visited.has(uId)) continue;
        visited.add(uId);

        const uNodeElem = document.getElementById(`path-graph-container-node-${uId}`);
        if(uNodeElem) uNodeElem.classList.add('current');
        updateDistancesTable();
        await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY));
        if(uNodeElem) {
            uNodeElem.classList.remove('current');
            uNodeElem.classList.add('visited-dijkstra');
        }
        
        if (uId === endNodeId) break;

        adjacencyList.get(uId).forEach(edge => {
            const vId = edge.node;
            if (visited.has(vId)) return;
            const vNode = nodes.find(n => n.id === vId);
            const newDist = uDist + edge.weight;
            if (newDist < vNode.distance) {
                vNode.distance = newDist;
                vNode.prev = uId;
                pq.push({ id: vId, distance: newDist });
            }
        });
    }


    const path = [];
    let currentId = endNodeId;
    while (currentId) {
        path.unshift(currentId);
        const node = nodes.find(n => n.id === currentId);
        currentId = node.prev;
    }
    const pathResultEl = document.getElementById('path-result');
    if (pathResultEl && path[0] === startNodeId) {
        for (let i = 0; i < path.length; i++) {
            const nodeElem = document.getElementById(`path-graph-container-node-${path[i]}`);
            if (nodeElem) nodeElem.classList.add('shortest-path');
        }
        pathResultEl.textContent = `Path: ${path.join(' → ')} (Cost: ${nodes.find(n => n.id === endNodeId).distance})`;
    } else if (pathResultEl) {
        pathResultEl.textContent = `No path found from ${startNodeId} to ${endNodeId}.`;
    }

    isVisualizing = false;
}


 
function updateDistancesTable() {
    const tableContainer = document.getElementById('path-distances-table');
    if (!tableContainer) return;

    let tableHTML = '<table><thead><tr><th>Node</th><th>Distance</th><th>Previous</th></tr></thead><tbody>';
     
    pathGraph.nodes.sort((a, b) => a.id.localeCompare(b.id)).forEach(node => {
        tableHTML += `<tr><td>${node.id}</td><td>${node.distance === Infinity ? '∞' : node.distance}</td><td>${node.prev || '-'}</td></tr>`;
    });
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
}

function resetPathVisualization(resetInfo = true) {
    document.querySelectorAll('#path-graph-container .graph-node').forEach(el => {
        el.classList.remove('visited-dijkstra', 'visited-bellman-ford', 'current', 'shortest-path');
    });
    pathGraph.nodes.forEach(node => {
        node.distance = Infinity;
        node.prev = null;
    });
    updateDistancesTable();
    const pathResultEl = document.getElementById('path-result');
    if(pathResultEl) pathResultEl.textContent = 'No path visualized yet.';
}

function updatePathInfo(operation, timeComplexity = '', spaceComplexity = '') {
    const opEl = document.getElementById('path-algorithm-name');
    const timeEl = document.getElementById('path-time-complexity');
    const spaceEl = document.getElementById('path-space-complexity');
    if (opEl) opEl.textContent = operation;
    if (timeEl) timeEl.textContent = timeComplexity;
    if (spaceEl) spaceEl.textContent = spaceComplexity;
}


function populateNodeSelects(nodes) {
     
    const startNodeSelect = document.getElementById('start-node-select');
    const endNodeSelect = document.getElementById('end-node-select');
    if (!startNodeSelect || !endNodeSelect) return;

    startNodeSelect.innerHTML = '';
    endNodeSelect.innerHTML = '';
    nodes.forEach(node => {
        startNodeSelect.innerHTML += `<option value="${node.id}">${node.id}</option>`;
        endNodeSelect.innerHTML += `<option value="${node.id}">${node.id}</option>`;
    });

    if (nodes.length > 1) {
        endNodeSelect.value = nodes[nodes.length - 1].id;
    }
}

 
export function setupPathVisualizerControls() {
    document.getElementById('generate-weighted-graph-btn').addEventListener('click', async () => {
        const nodes = await pathGraph.generateGraph(true);
        populateNodeSelects(nodes);
        resetPathVisualization();
        updatePathInfo('Ready');
    });

    document.getElementById('visualize-dijkstra-btn').addEventListener('click', visualizeDijkstra);
    
    document.getElementById('visualize-bellman-ford-btn').addEventListener('click', visualizeBellmanFord);
}