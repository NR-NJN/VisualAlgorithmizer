 

let linkedList = [];
const listContainer = document.getElementById('list-container');

function updateListInfo(operation, timeComplexity, spaceComplexity) {
    const operationElement = document.getElementById('list-operation');
    const complexityElement = document.getElementById('list-complexity');
    const spaceElement = document.getElementById('list-space');

    if (operationElement) operationElement.textContent = operation;
    if (complexityElement) complexityElement.textContent = timeComplexity;
    if (spaceElement) spaceElement.textContent = spaceComplexity;
}

export function renderLinkedList() {
    if (!listContainer) {
        console.error("List container not found in linkedListVisualizer.js");
        return;
    }
    listContainer.innerHTML = '';
    linkedList.forEach((value, index) => {
        const nodeContainer = document.createElement('div');
        nodeContainer.className = 'list-node';
        nodeContainer.dataset.index = index;

        const dataElement = document.createElement('div');
        dataElement.className = 'node-data';
        dataElement.textContent = value;
        nodeContainer.appendChild(dataElement);

        if (index < linkedList.length - 1) {
            const pointer = document.createElement('div');
            pointer.className = 'node-pointer';
            nodeContainer.appendChild(pointer);
        }
        listContainer.appendChild(nodeContainer);
    });
}

export function generateRandomLinkedList(size = 5, min = 1, max = 99) {
    linkedList = [];
    for (let i = 0; i < size; i++) {
        linkedList.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    console.log("Generated linked list:", linkedList);
    renderLinkedList();
    updateListInfo('Linked List initialized', 'O(1)', 'O(n)');
}

export async function animateListTraversal() {
    updateListInfo('Linked List Traversal', 'O(n)', 'O(1)');
    if (!listContainer) return;
    const nodes = listContainer.querySelectorAll('.list-node');
    for (let i = 0; i < nodes.length; i++) {
        nodes.forEach(node => node.classList.remove('current'));
        if (nodes[i]) nodes[i].classList.add('current');
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    nodes.forEach(node => node.classList.remove('current'));
    updateListInfo('Traversal Complete', 'O(n)', 'O(1)');
}

export async function animateListInsertion() {
    const valueInput = document.getElementById('list-value-input');
    const positionInput = document.getElementById('list-position-input');
    if (!valueInput || !positionInput) return;

    const value = parseInt(valueInput.value);
    const position = parseInt(positionInput.value);

    if (isNaN(value)) {
        alert('Please enter a valid value');
        return;
    }
    if (isNaN(position) || position < 0 || position > linkedList.length) {
        alert(`Please enter a valid position between 0 and ${linkedList.length}`);
        return;
    }

    updateListInfo(`Inserting ${value} at position ${position}`, 'O(n)', 'O(1)');
    linkedList.splice(position, 0, value);
    renderLinkedList();
    if (!listContainer) return;

    const nodes = listContainer.querySelectorAll('.list-node');
    await new Promise(resolve => setTimeout(resolve, 300));
    if (nodes[position]) nodes[position].classList.add('inserting');
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (nodes[position]) nodes[position].classList.remove('inserting');
    updateListInfo(`Inserted ${value} at position ${position}`, 'O(n)', 'O(1)');
}

export async function animateListDeletion() {
    const positionInput = document.getElementById('list-position-input');
    if (!positionInput) return;
    const position = parseInt(positionInput.value);

    if (isNaN(position) || position < 0 || position >= linkedList.length) {
        alert(`Please enter a valid position between 0 and ${linkedList.length - 1}`);
        return;
    }

    updateListInfo(`Deleting node at position ${position}`, 'O(n)', 'O(1)');
    if (!listContainer) return;
    const nodes = listContainer.querySelectorAll('.list-node');
    if (nodes[position]) nodes[position].classList.add('deleting');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const deletedValue = linkedList.splice(position, 1)[0];
    renderLinkedList();
    updateListInfo(`Deleted node with value ${deletedValue} from position ${position}`, 'O(n)', 'O(1)');
}
