 
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

     
    gsap.registerPlugin(ScrollTrigger);

     
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

     
    const links = document.querySelectorAll('a, button, .btn');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.mixBlendMode = 'screen';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.mixBlendMode = 'difference';
        });
    });

     
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
         
        nav.classList.toggle('nav-active');
        
         
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
         
        burger.classList.toggle('toggle');
    });

     
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

     
    const typingText = document.querySelector('.typing-text');
    const text = " BUT DSA ALWAYS CATCHES UP";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
            
    
        }
    }
    
    typeWriter();

     
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const binary = '01';
        
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        
        const rainDrops = [];
        
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0aefff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < rainDrops.length; i++) {
                const text = binary.charAt(Math.floor(Math.random() * binary.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        setInterval(draw, 30);
    }

     
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const highlight = input.nextElementSibling;
            if (highlight && highlight.classList.contains('form-highlight')) {
                highlight.style.width = '100%';
                highlight.style.left = '0';
            }
        });
        
        input.addEventListener('blur', () => {
            const highlight = input.nextElementSibling;
            if (highlight && highlight.classList.contains('form-highlight')) {
                highlight.style.width = '0';
                highlight.style.left = '50%';
            }
        });
    });

     
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
             
             
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].value = '';
                }
            }
            
            alert('Message sent successfully!');
        });
    }

     
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                 
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });

     
    window.addEventListener('resize', () => {
         
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });

     
    
     
    const arrayContainer = document.getElementById('array-container');
    let arrayData = [];
    
     
    function generateRandomArray(size = 10, min = 1, max = 99) {
        arrayData = [];
        for (let i = 0; i < size; i++) {
            arrayData.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        console.log("Generated array:", arrayData);
        renderArray();
        updateArrayInfo('Array initialized', 'O(1)', 'O(n)');

    }
    
     
    function renderArray() {
        if (!arrayContainer){
            console.log("Array container not found");
            return;
        } 
        console.log("Rendering array to container:", arrayContainer);
        arrayContainer.innerHTML = '';
        arrayData.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            element.dataset.index = index;
            arrayContainer.appendChild(element);
        });
        console.log("Array rendering complete");
    }
    
     
    function updateArrayInfo(operation, timeComplexity, spaceComplexity) {
        const operationElement = document.getElementById('array-operation');
        const complexityElement = document.getElementById('array-complexity');
        const spaceElement = document.getElementById('array-space');
        
        if (operationElement) operationElement.textContent = operation;
        if (complexityElement) complexityElement.textContent = timeComplexity;
        if (spaceElement) spaceElement.textContent = spaceComplexity;
    }
    
     
    async function animateArrayTraversal() {
        updateArrayInfo('Array Traversal', 'O(n)', 'O(1)');
        
        const elements = document.querySelectorAll('.array-element');
        for (let i = 0; i < elements.length; i++) {
            elements.forEach(el => el.classList.remove('current'));
            elements[i].classList.add('current');
            
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        elements.forEach(el => el.classList.remove('current'));
        updateArrayInfo('Traversal Complete', 'O(n)', 'O(1)');
    }
    
     
    async function animateArraySearch(value) {
        const searchValue = parseInt(value);
        if (isNaN(searchValue)) {
            alert('Please enter a valid number');
            return;
        }
        
        updateArrayInfo(`Searching for ${searchValue}`, 'O(n)', 'O(1)');
        
        const elements = document.querySelectorAll('.array-element');
        let found = false;
        
        for (let i = 0; i < elements.length; i++) {
            elements.forEach(el => el.classList.remove('current', 'found'));
            elements[i].classList.add('current');
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (parseInt(elements[i].textContent) === searchValue) {
                elements[i].classList.remove('current');
                elements[i].classList.add('found');
                found = true;
                break;
            }
        }
        
        if (!found) {
            elements.forEach(el => el.classList.remove('current'));
            updateArrayInfo(`Value ${searchValue} not found`, 'O(n)', 'O(1)');
        } else {
            updateArrayInfo(`Value ${searchValue} found`, 'O(n)', 'O(1)');
        }
    }
    
     
    async function animateBubbleSort() {
        updateArrayInfo('Bubble Sort', 'O(n²)', 'O(1)');
        
        const elements = document.querySelectorAll('.array-element');
        const n = elements.length;
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                elements.forEach(el => el.classList.remove('current', 'compared'));
                elements[j].classList.add('compared');
                elements[j + 1].classList.add('compared');
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const val1 = parseInt(elements[j].textContent);
                const val2 = parseInt(elements[j + 1].textContent);
                
                if (val1 > val2) {
                     
                    arrayData[j] = val2;
                    arrayData[j + 1] = val1;
                    
                     
                    elements[j].textContent = val2;
                    elements[j + 1].textContent = val1;
                    
                     
                    gsap.to(elements[j], { y: -30, duration: 0.2, ease: "power1.out" });
                    gsap.to(elements[j + 1], { y: 30, duration: 0.2, ease: "power1.out" });
                    await new Promise(resolve => setTimeout(resolve, 200));
                    gsap.to(elements[j], { y: 0, duration: 0.2, ease: "power1.in" });
                    gsap.to(elements[j + 1], { y: 0, duration: 0.2, ease: "power1.in" });
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
            
             
            elements[n - i - 1].classList.add('sorted');
        }
        
        updateArrayInfo('Bubble Sort Complete', 'O(n²)', 'O(1)');
    }
    
     
    async function animateSelectionSort() {
        updateArrayInfo('Selection Sort', 'O(n²)', 'O(1)');
        
        const elements = document.querySelectorAll('.array-element');
        const n = elements.length;
        
        for (let i = 0; i < n; i++) {
            let minIndex = i;
            elements[i].classList.add('current');
            
            for (let j = i + 1; j < n; j++) {
                elements.forEach((el, idx) => {
                    if (idx !== minIndex && idx !== i && idx >= i) {
                        el.classList.remove('compared');
                    }
                });
                
                elements[j].classList.add('compared');
                await new Promise(resolve => setTimeout(resolve, 300));
                
                const val1 = parseInt(elements[minIndex].textContent);
                const val2 = parseInt(elements[j].textContent);
                
                if (val2 < val1) {
                    elements[minIndex].classList.remove('compared');
                    minIndex = j;
                    elements[minIndex].classList.add('compared');
                }
            }
            
            if (minIndex !== i) {
                 
                const temp = arrayData[i];
                arrayData[i] = arrayData[minIndex];
                arrayData[minIndex] = temp;
                
                 
                elements[i].textContent = arrayData[i];
                elements[minIndex].textContent = arrayData[minIndex];
                
                 
                gsap.to(elements[i], { y: -30, duration: 0.2, ease: "power1.out" });
                gsap.to(elements[minIndex], { y: 30, duration: 0.2, ease: "power1.out" });
                await new Promise(resolve => setTimeout(resolve, 200));
                gsap.to(elements[i], { y: 0, duration: 0.2, ease: "power1.in" });
                gsap.to(elements[minIndex], { y: 0, duration: 0.2, ease: "power1.in" });
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            elements.forEach(el => el.classList.remove('current', 'compared'));
            elements[i].classList.add('sorted');
        }
        
        updateArrayInfo('Selection Sort Complete', 'O(n²)', 'O(1)');
    }
    
     
    async function animateInsertionSort() {
        updateArrayInfo('Insertion Sort', 'O(n²)', 'O(1)');
        
        const elements = document.querySelectorAll('.array-element');
        const n = elements.length;
        
        elements[0].classList.add('sorted');
        
        for (let i = 1; i < n; i++) {
            const key = arrayData[i];
            elements[i].classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            let j = i - 1;
            while (j >= 0 && arrayData[j] > key) {
                elements[j].classList.add('compared');
                await new Promise(resolve => setTimeout(resolve, 300));
                
                 
                arrayData[j + 1] = arrayData[j];
                elements[j + 1].textContent = arrayData[j];
                
                 
                gsap.to(elements[j + 1], { y: 30, duration: 0.3, ease: "power1.out" });
                gsap.to(elements[j], { y: -30, duration: 0.3, ease: "power1.out" });
                
                await new Promise(resolve => setTimeout(resolve, 300));
                
                gsap.to(elements[j + 1], { y: 0, duration: 0.3, ease: "power1.in" });
                gsap.to(elements[j], { y: 0, duration: 0.3, ease: "power1.in" });
                
                elements[j].classList.remove('compared');
                j--;
            }
            
             
            arrayData[j + 1] = key;
            elements[j + 1].textContent = key;
            elements[i].classList.remove('current');
            
             
            for (let k = 0; k <= i; k++) {
                elements[k].classList.add('sorted');
            }
        }
        
        updateArrayInfo('Insertion Sort Complete', 'O(n²)', 'O(1)');
    }
    if (arrayContainer) {
        generateRandomArray();
        
         
        document.getElementById('array-traverse-btn')?.addEventListener('click', animateArrayTraversal);
        document.getElementById('array-search-btn')?.addEventListener('click', () => {
            const value = document.getElementById('array-search-input').value;
            animateArraySearch(value);
        });
        document.getElementById('array-sort-btn')?.addEventListener('click', () => {
            const sortType = document.getElementById('array-sort-select').value;
            if (sortType === 'bubble') animateBubbleSort();
            else if (sortType === 'selection') animateSelectionSort();
            else if (sortType === 'insertion') animateInsertionSort();
        });
        document.getElementById('array-reset-btn')?.addEventListener('click', generateRandomArray);
    }

    const listContainer = document.getElementById('list-container');
let linkedList = [];

// Generate a random linked list
function generateRandomLinkedList(size = 5, min = 1, max = 99) {
    linkedList = [];
    for (let i = 0; i < size; i++) {
        linkedList.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    console.log("Generated linked list:", linkedList);
    renderLinkedList();
    updateListInfo('Linked List initialized', 'O(1)', 'O(n)');
}

// Render the linked list to the DOM
function renderLinkedList() {
    if (!listContainer) {
        console.log("List container not found");
        return;
    }
    
    listContainer.innerHTML = '';
    linkedList.forEach((value, index) => {
        // Create node container
        const nodeContainer = document.createElement('div');
        nodeContainer.className = 'list-node';
        nodeContainer.dataset.index = index;
        
        // Create data element
        const dataElement = document.createElement('div');
        dataElement.className = 'node-data';
        dataElement.textContent = value;
        nodeContainer.appendChild(dataElement);
        
        // Add pointer if not the last element
        if (index < linkedList.length - 1) {
            const pointer = document.createElement('div');
            pointer.className = 'node-pointer';
            nodeContainer.appendChild(pointer);
        }
        
        listContainer.appendChild(nodeContainer);
    });
}

// Update info panel
function updateListInfo(operation, timeComplexity, spaceComplexity) {
    const operationElement = document.getElementById('list-operation');
    const complexityElement = document.getElementById('list-complexity');
    const spaceElement = document.getElementById('list-space');
    
    if (operationElement) operationElement.textContent = operation;
    if (complexityElement) complexityElement.textContent = timeComplexity;
    if (spaceElement) spaceElement.textContent = spaceComplexity;
}

// Linked list traversal animation
async function animateListTraversal() {
    updateListInfo('Linked List Traversal', 'O(n)', 'O(1)');
    
    const nodes = document.querySelectorAll('.list-node');
    for (let i = 0; i < nodes.length; i++) {
        nodes.forEach(node => node.classList.remove('current'));
        nodes[i].classList.add('current');
        
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    nodes.forEach(node => node.classList.remove('current'));
    updateListInfo('Traversal Complete', 'O(n)', 'O(1)');
}

// Linked list insertion animation
async function animateListInsertion() {
    const value = parseInt(document.getElementById('list-value-input').value);
    const position = parseInt(document.getElementById('list-position-input').value);
    
    if (isNaN(value)) {
        alert('Please enter a valid value');
        return;
    }
    
    if (isNaN(position) || position < 0 || position > linkedList.length) {
        alert(`Please enter a valid position between 0 and ${linkedList.length}`);
        return;
    }
    
    updateListInfo(`Inserting ${value} at position ${position}`, 'O(n)', 'O(1)');
    
    // Insert into the array
    linkedList.splice(position, 0, value);
    
    // Re-render the list
    renderLinkedList();
    
    // Animate the insertion
    const nodes = document.querySelectorAll('.list-node');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    nodes[position].classList.add('inserting');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    nodes[position].classList.remove('inserting');
    
    updateListInfo(`Inserted ${value} at position ${position}`, 'O(n)', 'O(1)');
}

// Linked list deletion animation
async function animateListDeletion() {
    const position = parseInt(document.getElementById('list-position-input').value);
    
    if (isNaN(position) || position < 0 || position >= linkedList.length) {
        alert(`Please enter a valid position between 0 and ${linkedList.length - 1}`);
        return;
    }
    
    updateListInfo(`Deleting node at position ${position}`, 'O(n)', 'O(1)');
    
    const nodes = document.querySelectorAll('.list-node');
    nodes[position].classList.add('deleting');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remove from the array
    const deletedValue = linkedList.splice(position, 1)[0];
    
    // Re-render the list
    renderLinkedList();
    
    updateListInfo(`Deleted node with value ${deletedValue} from position ${position}`, 'O(n)', 'O(1)');
}
if (listContainer) {
    generateRandomLinkedList();
    
    // Add event listeners for linked list controls
    document.getElementById('list-traverse-btn')?.addEventListener('click', animateListTraversal);
    document.getElementById('list-insert-btn')?.addEventListener('click', animateListInsertion);
    document.getElementById('list-delete-btn')?.addEventListener('click', animateListDeletion);
    document.getElementById('list-reset-btn')?.addEventListener('click', generateRandomLinkedList);
}


// Binary Tree Implementation
const treeContainer = document.getElementById('tree-container');
let treeData = null;

// Node class for binary tree
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Create a binary search tree
function createBinarySearchTree(values) {
    if (!values || values.length === 0) return null;
    
    const root = new TreeNode(values[0]);
    
    for (let i = 1; i < values.length; i++) {
        insertNode(root, values[i]);
    }
    
    return root;
}

// Insert a node into the binary search tree
function insertNode(root, value) {
    if (value < root.value) {
        if (root.left === null) {
            root.left = new TreeNode(value);
        } else {
            insertNode(root.left, value);
        }
    } else {
        if (root.right === null) {
            root.right = new TreeNode(value);
        } else {
            insertNode(root.right, value);
        }
    }
}

// Generate a random binary search tree
function generateRandomTree(size = 7, min = 1, max = 99) {
    const values = [];
    // Generate unique random values
    while (values.length < size) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!values.includes(value)) {
            values.push(value);
        }
    }
    
    treeData = createBinarySearchTree(values);
    console.log("Generated tree:", treeData);
    renderTree();
    updateTreeInfo('Binary Tree initialized', 'O(log n)', 'O(n)');
}

// Calculate the height of the tree
function getTreeHeight(node) {
    if (node === null) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

// Render the binary tree to the DOM
function renderTree() {
    if (!treeContainer) {
        console.log("Tree container not found");
        return;
    }
    
    treeContainer.innerHTML = '';
    
    if (!treeData) {
        console.log("No tree data to render");
        return;
    }
    
    const height = getTreeHeight(treeData);
    console.log("Tree height:", height);
    
    // Create levels with proper spacing
    for (let i = 0; i < height; i++) {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'tree-level';
        levelDiv.dataset.level = i;
        treeContainer.appendChild(levelDiv);
    }
    
    // Calculate width based on the number of possible nodes at the deepest level
    const maxWidth = Math.pow(2, height - 1) * 80;
    treeContainer.style.width = `${maxWidth}px`;
    
    // Render nodes starting with the root
    renderNode(treeData, 0, maxWidth / 2, maxWidth / 4);
}

// Render a node and its children recursively
function renderNode(node, level, xPos, spacing) {
    if (!node) return;
    
    const levelDiv = document.querySelector(`.tree-level[data-level="${level}"]`);
    
    // Create node element
    const nodeElement = document.createElement('div');
    nodeElement.className = 'tree-node';
    if (level === 0) nodeElement.classList.add('root');
    nodeElement.textContent = node.value;
    
    // Position node with absolute positioning
    nodeElement.style.position = 'absolute';
    nodeElement.style.left = `${xPos - 30}px`; // Center the node (60px width / 2)
    
    levelDiv.appendChild(nodeElement);
    
    // Draw connecting lines
    if (level > 0) {
        const lineElement = document.createElement('div');
        lineElement.className = 'tree-line';
        lineElement.style.position = 'absolute';
        lineElement.style.width = `${spacing}px`;
        lineElement.style.height = '40px';
        lineElement.style.top = '-40px';
        lineElement.style.left = node.value < node.parent?.value ? 
            '30px' : `${-spacing + 30}px`;
        nodeElement.appendChild(lineElement);
    }
    
    // Store parent reference for line drawing
    if (node.left) node.left.parent = node;
    if (node.right) node.right.parent = node;
    
    // Render children with updated positions
    if (node.left) {
        renderNode(node.left, level + 1, xPos - spacing, spacing / 2);
    }
    
    if (node.right) {
        renderNode(node.right, level + 1, xPos + spacing, spacing / 2);
    }
}

// Update info panel
function updateTreeInfo(operation, timeComplexity, spaceComplexity) {
    const operationElement = document.getElementById('tree-operation');
    const complexityElement = document.getElementById('tree-complexity');
    const spaceElement = document.getElementById('tree-space');
    
    if (operationElement) operationElement.textContent = operation;
    if (complexityElement) complexityElement.textContent = timeComplexity;
    if (spaceElement) spaceElement.textContent = spaceComplexity;
}


// Insert a value into the tree with animation
async function animateTreeInsertion() {
    const value = parseInt(document.getElementById('tree-value-input').value);
    
    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }
    
    updateTreeInfo(`Inserting ${value}`, 'O(log n)', 'O(1)');
    
    if (!treeData) {
        treeData = new TreeNode(value);
        renderTree();
        updateTreeInfo(`Inserted ${value} as root`, 'O(1)', 'O(1)');
        return;
    }
    
    // Find the path to insertion point
    const path = [];
    let current = treeData;
    
    while (true) {
        path.push(current);
        
        if (value < current.value) {
            if (current.left === null) {
                current.left = new TreeNode(value);
                break;
            }
            current = current.left;
        } else {
            if (current.right === null) {
                current.right = new TreeNode(value);
                break;
            }
            current = current.right;
        }
    }
    
    // Render the updated tree
    renderTree();
    
    // Animate the insertion path
    const nodes = document.querySelectorAll('.tree-node');
    for (let i = 0; i < path.length; i++) {
        // Find the DOM node that corresponds to the current tree node
        const nodeElement = Array.from(nodes).find(el => parseInt(el.textContent) === path[i].value);
        
        if (nodeElement) {
            nodeElement.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 500));
            nodeElement.classList.remove('current');
        }
    }
    
    // Highlight the newly inserted node
    const insertedNode = Array.from(nodes).find(el => parseInt(el.textContent) === value);
    if (insertedNode) {
        insertedNode.classList.add('inserting');
        await new Promise(resolve => setTimeout(resolve, 800));
        insertedNode.classList.remove('inserting');
    }
    
    updateTreeInfo(`Inserted ${value}`, 'O(log n)', 'O(1)');
}

// Tree traversal animation
async function animateTreeTraversal() {
    const traversalType = document.getElementById('tree-traverse-select').value;
    const nodes = document.querySelectorAll('.tree-node');
    
    updateTreeInfo(`${traversalType} Traversal`, 'O(n)', 'O(n)');
    
    // Clear any previous highlighting
    nodes.forEach(node => node.classList.remove('current', 'visited'));
    
    const visitedNodes = [];
    
    // Perform the selected traversal
    switch (traversalType) {
        case 'inorder':
            await inOrderTraversal(treeData, visitedNodes);
            break;
        case 'preorder':
            await preOrderTraversal(treeData, visitedNodes);
            break;
        case 'postorder':
            await postOrderTraversal(treeData, visitedNodes);
            break;
        case 'levelorder':
            await levelOrderTraversal(treeData, visitedNodes);
            break;
    }
    
    // Animate the traversal
    for (let i = 0; i < visitedNodes.length; i++) {
        const nodeElement = Array.from(nodes).find(el => parseInt(el.textContent) === visitedNodes[i]);
        
        if (nodeElement) {
            nodeElement.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 800));
            nodeElement.classList.remove('current');
            nodeElement.classList.add('visited');
        }
    }
    
    // Reset after animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    nodes.forEach(node => node.classList.remove('visited'));
    
    updateTreeInfo(`${traversalType} Traversal Complete`, 'O(n)', 'O(n)');
}

// In-order traversal (Left, Root, Right)
async function inOrderTraversal(node, visitedNodes) {
    if (node === null) return;
    
    await inOrderTraversal(node.left, visitedNodes);
    visitedNodes.push(node.value);
    await inOrderTraversal(node.right, visitedNodes);
}

// Pre-order traversal (Root, Left, Right)
async function preOrderTraversal(node, visitedNodes) {
    if (node === null) return;
    
    visitedNodes.push(node.value);
    await preOrderTraversal(node.left, visitedNodes);
    await preOrderTraversal(node.right, visitedNodes);
}

// Post-order traversal (Left, Right, Root)
async function postOrderTraversal(node, visitedNodes) {
    if (node === null) return;
    
    await postOrderTraversal(node.left, visitedNodes);
    await postOrderTraversal(node.right, visitedNodes);
    visitedNodes.push(node.value);
}

// Level-order traversal (BFS)
async function levelOrderTraversal(node, visitedNodes) {
    if (node === null) return;
    
    const queue = [node];
    
    while (queue.length > 0) {
        const current = queue.shift();
        visitedNodes.push(current.value);
        
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
}

// Delete a node from the tree
async function animateTreeDeletion() {
    const value = parseInt(document.getElementById('tree-value-input').value);
    
    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }
    
    updateTreeInfo(`Deleting ${value}`, 'O(log n)', 'O(1)');
    
    if (!treeData) {
        alert('Tree is empty');
        return;
    }
    
    // Find the node to delete and its parent
    let current = treeData;
    let parent = null;
    let isLeftChild = false;
    
    // Search for the node
    while (current && current.value !== value) {
        parent = current;
        
        if (value < current.value) {
            current = current.left;
            isLeftChild = true;
        } else {
            current = current.right;
            isLeftChild = false;
        }
    }
    
    if (!current) {
        alert(`Value ${value} not found in the tree`);
        updateTreeInfo(`Value ${value} not found`, 'O(log n)', 'O(1)');
        return;
    }
    
    // Highlight the node to be deleted
    const nodes = document.querySelectorAll('.tree-node');
    const nodeToDelete = Array.from(nodes).find(el => parseInt(el.textContent) === value);
    
    if (nodeToDelete) {
        nodeToDelete.classList.add('deleting');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Case 1: Node has no children
    if (!current.left && !current.right) {
        if (current === treeData) {
            treeData = null;
        } else if (isLeftChild) {
            parent.left = null;
        } else {
            parent.right = null;
        }
    }
    // Case 2: Node has one child
    else if (!current.left) {
        if (current === treeData) {
            treeData = current.right;
        } else if (isLeftChild) {
            parent.left = current.right;
        } else {
            parent.right = current.right;
        }
    }
    else if (!current.right) {
        if (current === treeData) {
            treeData = current.left;
        } else if (isLeftChild) {
            parent.left = current.left;
        } else {
            parent.right = current.left;
        }
    }
    // Case 3: Node has two children
    else {
        // Find the successor (minimum value in right subtree)
        let successor = current.right;
        let successorParent = current;
        
        while (successor.left) {
            successorParent = successor;
            successor = successor.left;
        }
        
        // Highlight the successor
        const successorNode = Array.from(nodes).find(el => parseInt(el.textContent) === successor.value);
        if (successorNode) {
            successorNode.classList.add('current');
            await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        // Replace current with successor
        if (successor !== current.right) {
            successorParent.left = successor.right;
            successor.right = current.right;
        }
        
        if (current === treeData) {
            treeData = successor;
        } else if (isLeftChild) {
            parent.left = successor;
        } else {
            parent.right = successor;
        }
        
        successor.left = current.left;
    }
    
    // Render the updated tree
    renderTree();
    updateTreeInfo(`Deleted ${value}`, 'O(log n)', 'O(1)');
}

// Initialize binary tree when the page loads
if (treeContainer) {
    generateRandomTree();
    
    // Add event listeners for tree controls
    document.getElementById('tree-insert-btn')?.addEventListener('click', animateTreeInsertion);
    document.getElementById('tree-delete-btn')?.addEventListener('click', animateTreeDeletion);
    document.getElementById('tree-traverse-btn')?.addEventListener('click', animateTreeTraversal);
    document.getElementById('tree-reset-btn')?.addEventListener('click', generateRandomTree);
}

});