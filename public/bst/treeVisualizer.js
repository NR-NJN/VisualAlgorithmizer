const MAX_HEIGHT = 15;
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

function deleteNodeRecursive(node, value) {
   
    if (node === null) {
        return null;
    }

   
    if (value < node.value) {
        node.left = deleteNodeRecursive(node.left, value);
        return node;
    } else if (value > node.value) {
        node.right = deleteNodeRecursive(node.right, value);
        return node;
    } else {
        
        if (node.left === null && node.right === null) {
            return null; 
        }

        
        if (node.left === null) {
            return node.right; 
        }
        if (node.right === null) {
            return node.left; 
        }

        const successor = findMinNode(node.right);
        node.value = successor.value;
        node.right = deleteNodeRecursive(node.right, successor.value);
        return node;
    }
}
function findInsertionDepth(node, value, currentDepth = 1) {
    if (value === node.value) {
        return -1; 
    }

    if (value < node.value) {
        if (node.left === null) {
            return currentDepth + 1; 
        }
        return findInsertionDepth(node.left, value, currentDepth + 1);
    } else { 
        if (node.right === null) {
            return currentDepth + 1; 
        }
        return findInsertionDepth(node.right, value, currentDepth + 1);
    }
}

function findMinNode(node) {
    if (node.left === null) {
        return node;
    } else {
        return findMinNode(node.left);
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
    //treeContainer.style.width = `${Math.max(estimatedWidth, 300)}px`;

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
    
    const containerWidth = treeContainer.getBoundingClientRect().width;
    const initialX = containerWidth / 2;
    const initialHorizontalSpacing = containerWidth / 2.5;  
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
    const nodeCount = Math.floor(Math.random() * 9) + 7;
    const values = [];
    while (values.length < nodeCount) {
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

    if (!treeData) {
        treeData = new TreeNode(value);
        renderTree();
        updateTreeInfo(`Inserted ${value} as root`, 'O(1)', 'O(1)');
        return;
    }
    
   
    const newDepth = findInsertionDepth(treeData, value);

    if (newDepth === -1) {
        alert(`Value ${value} already exists in the tree.`);
        return;  
    }
    if (newDepth > MAX_HEIGHT) {
        alert(`Cannot insert node. Maximum tree height of ${MAX_HEIGHT} would be exceeded.`);
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

export async function animateTreeDeletion() {
    const valueInput = document.getElementById('tree-value-input');
    if (!valueInput) return;
    const value = parseInt(valueInput.value);

    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }

    updateTreeInfo(`Deleting node with value ${value}`, 'O(log n) avg', 'O(1)');
    
     
    if (!treeContainer) return;
    const nodes = treeContainer.querySelectorAll('.tree-node');
    const nodeToDeleteElement = Array.from(nodes).find(el => parseInt(el.textContent) === value);

    if (nodeToDeleteElement) {
        nodeToDeleteElement.classList.add('deleting');
        await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
        alert(`Node with value ${value} not found.`);
        updateTreeInfo('Deletion failed: Node not found', '', '');
        return;
    }

     
    treeData = deleteNodeRecursive(treeData, value);

     
    renderTree();

    updateTreeInfo(`Deleted node ${value}`, 'O(log n) avg', 'O(1)');
}

 
 
export async function animateTreeTraversal() { 
    const traversalSelect = document.getElementById('tree-traverse-select');
    if (!traversalSelect) return;
    const traversalType = traversalSelect.value;


    if (!treeData) {
        alert('Tree is empty. Please add nodes first.');
        return;
    }
   const operationName = traversalType.charAt(0).toUpperCase() + traversalType.slice(1);
    updateTreeInfo(`${operationName} Traversal`, 'O(n)', 'O(n)');

    const visitedNodes = [];
    switch (traversalType) {
        case 'inorder':
            inOrderTraversal(treeData, visitedNodes);
            break;
        case 'preorder':
            preOrderTraversal(treeData, visitedNodes);
            break;
        case 'postorder':
            postOrderTraversal(treeData, visitedNodes);
            break;
        default:
            console.error('Unknown traversal type:', traversalType);
            return;
    }

    const allDomNodes = treeContainer.querySelectorAll('.tree-node');
    
    allDomNodes.forEach(n => n.classList.remove('visited', 'current'));
    
    for (const nodeToHighlight of visitedNodes) {
        const domElement = Array.from(allDomNodes).find(el => parseInt(el.textContent) === nodeToHighlight.value);

        if (domElement) {
            domElement.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 800)); 

            domElement.classList.remove('current');
            domElement.classList.add('visited');
        }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    allDomNodes.forEach(n => n.classList.remove('visited'));

    updateTreeInfo('Traversal Complete', '', '');
 }

async function inOrderTraversal(node, visitedNodes) { 
    if (node === null) {
        return; 
    }
    inOrderTraversal(node.left, visitedNodes);
    visitedNodes.push(node);  
    inOrderTraversal(node.right, visitedNodes);
}    
 async function preOrderTraversal(node, visitedNodes) { 
     if (node === null) return;
    visitedNodes.push(node); 
    preOrderTraversal(node.left, visitedNodes);
    preOrderTraversal(node.right, visitedNodes);
 }
 async function postOrderTraversal(node, visitedNodes) { 
    if (node === null) return;
    postOrderTraversal(node.left, visitedNodes);
    postOrderTraversal(node.right, visitedNodes);
    visitedNodes.push(node);
 }


