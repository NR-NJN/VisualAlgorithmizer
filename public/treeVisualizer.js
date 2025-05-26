let treeData = null;
const treeContainer = document.getElementById('tree-container');

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
         
    }
}

function updateTreeInfo(operation, timeComplexity, spaceComplexity) {
    const operationElement = document.getElementById('tree-operation');
    const complexityElement = document.getElementById('tree-complexity');
    const spaceElement = document.getElementById('tree-space');

    if (operationElement) operationElement.textContent = operation;
    if (complexityElement) complexityElement.textContent = timeComplexity;
    if (spaceElement) spaceElement.textContent = spaceComplexity;
}

function createBinarySearchTree(values) {
    if (!values || values.length === 0) return null;
    const root = new TreeNode(values[0]);
    for (let i = 1; i < values.length; i++) {
        insertNodeRecursive(root, values[i]);  
    }
    return root;
}

function insertNodeRecursive(node, value) {
    if (value < node.value) {
        if (node.left === null) {
            node.left = new TreeNode(value);
        } else {
            insertNodeRecursive(node.left, value);
        }
    } else if (value > node.value) {  
        if (node.right === null) {
            node.right = new TreeNode(value);
        } else {
            insertNodeRecursive(node.right, value);
        }
    }
}

export function getTreeHeight(node) {
    if (node === null) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

 
export function renderTree() {
    if (!treeContainer) {
        console.error("Tree container not found in treeVisualizer.js");
        return;
    }
    treeContainer.innerHTML = '';
    if (!treeData) {
        console.log("No tree data to render");
        return;
    }

    const height = getTreeHeight(treeData);
    if (height === 0) return;

    const maxNodesAtBottom = Math.pow(2, height - 1);
    const estimatedWidth = maxNodesAtBottom * 80; 
    treeContainer.style.width = `${Math.max(estimatedWidth, 300)}px`;

    const nodeElementsMap = new Map();

    function renderNodeRecursive(node, level, x, yOffset, horizontalSpacing) {
        if (!node) return;

        const nodeElement = document.createElement('div');
        nodeElement.className = 'tree-node';
        if (level === 0) nodeElement.classList.add('root');
        nodeElement.textContent = node.value;
        
        nodeElement.style.position = 'absolute';
        nodeElement.style.top = `${yOffset}px`;
        nodeElement.style.left = `${x}px`; 
        nodeElement.style.transform = 'translateX(-50%)';

        treeContainer.appendChild(nodeElement);
        nodeElementsMap.set(node, {element: nodeElement, x, y: yOffset + 30 });  

        const nextYOffset = yOffset + 100; 
        if (node.left) {
            renderNodeRecursive(node.left, level + 1, x - horizontalSpacing / 2, nextYOffset, horizontalSpacing / 2);
        }
        if (node.right) {
            renderNodeRecursive(node.right, level + 1, x + horizontalSpacing / 2, nextYOffset, horizontalSpacing / 2);
        }
    }
    
    const initialX = parseFloat(treeContainer.style.width) / 2;
    const initialHorizontalSpacing = parseFloat(treeContainer.style.width) / 2.5;  
    renderNodeRecursive(treeData, 0, initialX, 20, initialHorizontalSpacing);
    drawTreeLines(treeData, nodeElementsMap);  
}

 
 
 
function drawTreeLines(node, nodeElementsMap) {
    if (!node || !nodeElementsMap.has(node)) return;
    const parentData = nodeElementsMap.get(node);

    if (node.left && nodeElementsMap.has(node.left)) {
        const childData = nodeElementsMap.get(node.left);
        createLineElement(parentData.x, parentData.y, childData.x, childData.y - 30);  
        drawTreeLines(node.left, nodeElementsMap);
    }
    if (node.right && nodeElementsMap.has(node.right)) {
        const childData = nodeElementsMap.get(node.right);
        createLineElement(parentData.x, parentData.y, childData.x, childData.y - 30);
        drawTreeLines(node.right, nodeElementsMap);
    }
}

function createLineElement(x1, y1, x2, y2) {
     
    const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    const line = document.createElement('div');
     
    line.className = 'tree-connector-line'; 
    line.style.position = 'absolute';
    line.style.height = '2px'; 
    line.style.backgroundColor = 'var(--primary-color)';
    line.style.width = `${length}px`;
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    if (treeContainer) treeContainer.appendChild(line);
}


export function generateRandomTree(size = 7, min = 1, max = 99) {
    const values = [];
    while (values.length < size) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!values.includes(value)) {
            values.push(value);
        }
    }
    treeData = createBinarySearchTree(values);
    console.log("Generated tree:", treeData);
    renderTree();
    updateTreeInfo('Binary Tree initialized', 'O(log n) avg', 'O(n)');
}


export async function animateTreeInsertion() {
    const valueInput = document.getElementById('tree-value-input');
    if(!valueInput) return;
    const value = parseInt(valueInput.value);

    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }
    updateTreeInfo(`Inserting ${value}`, 'O(log n) avg', 'O(1)');

    if (!treeData) {
        treeData = new TreeNode(value);
    } else {
        insertNodeRecursive(treeData, value);
    }
    renderTree();  

    if (!treeContainer) return;
    const nodes = treeContainer.querySelectorAll('.tree-node');
    const insertedNodeElement = Array.from(nodes).find(el => parseInt(el.textContent) === value);
    if (insertedNodeElement) {
        insertedNodeElement.classList.add('inserting');
        await new Promise(resolve => setTimeout(resolve, 800));
        insertedNodeElement.classList.remove('inserting');
    }
    updateTreeInfo(`Inserted ${value}`, 'O(log n) avg', 'O(1)');
}

 
 
export async function animateTreeTraversal() { /* ... */ }
export async function inOrderTraversal(node, visitedNodes) { /* ... */ }
export async function preOrderTraversal(node, visitedNodes) { /* ... */ }
export async function postOrderTraversal(node, visitedNodes) { /* ... */ }
export async function levelOrderTraversal(node, visitedNodes) { /* ... */ }
export async function animateTreeDeletion() { /* ... */ }
