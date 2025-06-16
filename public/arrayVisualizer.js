let arrayData = [];
let isSorting = false;
const arrayContainer = document.getElementById('array-container');  

function updateArrayInfo(operation, timeComplexity, spaceComplexity) {
    const operationElement = document.getElementById('array-operation');
    const complexityElement = document.getElementById('array-complexity');
    const spaceElement = document.getElementById('array-space');

    if (operationElement) operationElement.textContent = operation;
    if (complexityElement) complexityElement.textContent = timeComplexity;
    if (spaceElement) spaceElement.textContent = spaceComplexity;
}

export function renderArray() {
    if (!arrayContainer) {
        console.error("Array container not found in arrayVisualizer.js");
        return;
    }
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

export function generateRandomArray(size = 10, min = 1, max = 99) {
    isSorting = false;

    // Use a small timeout to allow any active async loops to read the flag
    // and terminate before we proceed with the reset.
    setTimeout(() => {
        // Stop any active GSAP animations to prevent them from finishing on new elements
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf('.array-element');
        }
        arrayData = [];
        for (let i = 0; i < size; i++) {
            arrayData.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        renderArray(); // Renders the new array and clears old styles
        updateArrayInfo('Array initialized', 'O(1)', 'O(n)');
    }, 100);
}

export async function animateArrayTraversal() {
    updateArrayInfo('Array Traversal', 'O(n)', 'O(1)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
    elements.forEach(el => el.classList.remove('found', 'sorted'));
    for (let i = 0; i < elements.length; i++) {
        elements.forEach(el => el.classList.remove('current'));
        elements[i].classList.add('current');
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    elements.forEach(el => el.classList.remove('current'));
    updateArrayInfo('Traversal Complete', 'O(n)', 'O(1)');
}

export async function animateArraySearch(valueToSearch) {
    const searchValue = parseInt(valueToSearch);
    if (isNaN(searchValue)) {
        alert('Please enter a valid number');
        return;
    }
    updateArrayInfo(`Searching for ${searchValue}`, 'O(n)', 'O(1)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
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

export async function animateBubbleSort() {
    updateArrayInfo('Bubble Sort', 'O(n²)', 'O(1)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
    elements.forEach(el => el.classList.remove('found', 'sorted', 'current', 'compared'));
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
        if (elements[n - i - 1]) elements[n - i - 1].classList.add('sorted');
    }
    updateArrayInfo('Bubble Sort Complete', 'O(n²)', 'O(1)');
}

export async function animateSelectionSort() {
    updateArrayInfo('Selection Sort', 'O(n²)', 'O(1)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
    elements.forEach(el => el.classList.remove('found', 'sorted', 'current', 'compared'));
    const n = elements.length;

    for (let i = 0; i < n; i++) {
        let minIndex = i;
        if (elements[i]) elements[i].classList.add('current');

        for (let j = i + 1; j < n; j++) {
            elements.forEach((el, idx) => {
                if (idx !== minIndex && idx !== i && idx >= i && el) {
                    el.classList.remove('compared');
                }
            });
            if (elements[j]) elements[j].classList.add('compared');
            await new Promise(resolve => setTimeout(resolve, 300));

            const val1 = parseInt(elements[minIndex].textContent);
            const val2 = parseInt(elements[j].textContent);

            if (val2 < val1) {
                if (elements[minIndex]) elements[minIndex].classList.remove('compared');
                minIndex = j;
                if (elements[minIndex]) elements[minIndex].classList.add('compared');
            }
        }

        if (minIndex !== i) {
            const temp = arrayData[i];
            arrayData[i] = arrayData[minIndex];
            arrayData[minIndex] = temp;

            if (elements[i]) elements[i].textContent = arrayData[i];
            if (elements[minIndex]) elements[minIndex].textContent = arrayData[minIndex];

            gsap.to(elements[i], { y: -30, duration: 0.2, ease: "power1.out" });
            gsap.to(elements[minIndex], { y: 30, duration: 0.2, ease: "power1.out" });
            await new Promise(resolve => setTimeout(resolve, 200));
            gsap.to(elements[i], { y: 0, duration: 0.2, ease: "power1.in" });
            gsap.to(elements[minIndex], { y: 0, duration: 0.2, ease: "power1.in" });
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        elements.forEach(el => el.classList.remove('current', 'compared'));
        if (elements[i]) elements[i].classList.add('sorted');
    }
    updateArrayInfo('Selection Sort Complete', 'O(n²)', 'O(1)');
}

export async function animateInsertionSort() {
    updateArrayInfo('Insertion Sort', 'O(n²)', 'O(1)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
    const n = elements.length;
    elements.forEach(el => el.classList.remove('found', 'sorted', 'current', 'compared'));

    if (elements[0]) elements[0].classList.add('sorted');

    for (let i = 1; i < n; i++) {
        const key = arrayData[i];
        if (elements[i]) elements[i].classList.add('current');
        await new Promise(resolve => setTimeout(resolve, 500));

        let j = i - 1;
        while (j >= 0 && arrayData[j] > key) {
            if (elements[j]) elements[j].classList.add('compared');
            await new Promise(resolve => setTimeout(resolve, 300));

            arrayData[j + 1] = arrayData[j];
            if (elements[j + 1]) elements[j + 1].textContent = arrayData[j];

            gsap.to(elements[j + 1], { y: 30, duration: 0.3, ease: "power1.out" });
            gsap.to(elements[j], { y: -30, duration: 0.3, ease: "power1.out" });
            await new Promise(resolve => setTimeout(resolve, 300));
            gsap.to(elements[j + 1], { y: 0, duration: 0.3, ease: "power1.in" });
            gsap.to(elements[j], { y: 0, duration: 0.3, ease: "power1.in" });
            
            if (elements[j]) elements[j].classList.remove('compared');
            j--;
        }
        arrayData[j + 1] = key;
        if (elements[j + 1]) elements[j + 1].textContent = key;
        if (elements[i]) elements[i].classList.remove('current');

        for (let k = 0; k <= i; k++) {
            if (elements[k]) elements[k].classList.add('sorted');
        }
    }
    updateArrayInfo('Insertion Sort Complete', 'O(n²)', 'O(1)');
}

 

 
async function merge(elements, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);

     
    for (let i = 0; i < n1; i++) {
        L[i] = arrayData[left + i];
        if (elements[left + i]) elements[left + i].classList.add('sub-array-left');
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arrayData[mid + 1 + j];
        if (elements[mid + 1 + j]) elements[mid + 1 + j].classList.add('sub-array-right');
    }
    await new Promise(resolve => setTimeout(resolve, 500));

    let i = 0, j = 0, k = left;

     
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
             
            if (elements[k]) elements[k].classList.add('merging');
            await new Promise(resolve => setTimeout(resolve, 400));
            
            arrayData[k] = L[i];
            if (elements[k]) elements[k].textContent = L[i];
            i++;
        } else {
            if (elements[k]) elements[k].classList.add('merging');
            await new Promise(resolve => setTimeout(resolve, 400));

            arrayData[k] = R[j];
            if (elements[k]) elements[k].textContent = R[j];
            j++;
        }
        if (elements[k]) elements[k].classList.remove('merging');
        k++;
    }

     
    while (i < n1) {
        if (elements[k]) elements[k].classList.add('merging');
        await new Promise(resolve => setTimeout(resolve, 400));
        arrayData[k] = L[i];
        if (elements[k]) elements[k].textContent = L[i];
        if (elements[k]) elements[k].classList.remove('merging');
        i++;
        k++;
    }
    while (j < n2) {
        if (elements[k]) elements[k].classList.add('merging');
        await new Promise(resolve => setTimeout(resolve, 400));
        arrayData[k] = R[j];
        if (elements[k]) elements[k].textContent = R[j];
        if (elements[k]) elements[k].classList.remove('merging');
        j++;
        k++;
    }

     
    for (let idx = left; idx <= right; idx++) {
        if (elements[idx]) {
            elements[idx].classList.remove('sub-array-left', 'sub-array-right');
            elements[idx].classList.add('sorted');
        }
    }
}

async function mergeSortRecursive(elements, left, right) {
    if (left >= right) {
        if(elements[left]) elements[left].classList.add('sorted');
        return;
    }
    const mid = left + Math.floor((right - left) / 2);
    await mergeSortRecursive(elements, left, mid);
    await mergeSortRecursive(elements, mid + 1, right);
    await merge(elements, left, mid, right);
}

export async function animateMergeSort() {
    updateArrayInfo('Merge Sort', 'O(n log n)', 'O(n)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
    elements.forEach(el => el.classList.remove('found', 'sorted', 'current', 'compared'));

    await mergeSortRecursive(elements, 0, arrayData.length - 1);
    
    updateArrayInfo('Merge Sort Complete', 'O(n log n)', 'O(n)');
}


async function partition(low, high) {
    let elements = arrayContainer.querySelectorAll('.array-element');
    const pivotValue = arrayData[high];
    if (elements[high]) elements[high].classList.add('pivot');
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (!isSorting) return -1;
        elements = arrayContainer.querySelectorAll('.array-element');
        if (elements[j]) elements[j].classList.add('compared');
        await new Promise(resolve => setTimeout(resolve, 400));

        if (arrayData[j] < pivotValue) {
            i++;
            if (i !== j) {
                const el_i = elements[i];
                const el_j = elements[j];

                if (el_i && el_j) {
                    await gsap.timeline()
                        .to([el_i, el_j], { y: -50, duration: 0.3, ease: 'circ.out' })
                        .to(el_i, { x: el_j.offsetLeft - el_i.offsetLeft, duration: 0.5, ease: 'power2.inOut' }, "<")
                        .to(el_j, { x: el_i.offsetLeft - el_j.offsetLeft, duration: 0.5, ease: 'power2.inOut' }, "<")
                        .to([el_i, el_j], { y: 0, duration: 0.3, ease: 'circ.in' });
                    
                    // Physically swap the DOM nodes instead of re-rendering
                    swapDOMElements(el_i, el_j);
                    // Reset GSAP transforms after physical swap
                    gsap.set([el_i, el_j], { clearProps: "transform" });

                    [arrayData[i], arrayData[j]] = [arrayData[j], arrayData[i]];
                }
            }
        }
        if (elements[j]) elements[j].classList.remove('compared');
    }

    const pivotNewIndex = i + 1;
    if (pivotNewIndex !== high) {
        elements = arrayContainer.querySelectorAll('.array-element');
        const el_pivot = elements[high];
        const el_swap = elements[pivotNewIndex];

        if (el_pivot && el_swap) {
            await gsap.timeline()
                .to([el_pivot, el_swap], { y: -50, duration: 0.3, ease: 'circ.out' })
                .to(el_pivot, { x: el_swap.offsetLeft - el_pivot.offsetLeft, duration: 0.5, ease: 'power2.inOut' }, "<")
                .to(el_swap, { x: el_swap.offsetLeft - el_pivot.offsetLeft, duration: 0.5, ease: 'power2.inOut' }, "<")
                .to([el_pivot, el_swap], { y: 0, duration: 0.3, ease: 'circ.in' });

            swapDOMElements(el_pivot, el_swap);
            gsap.set([el_pivot, el_swap], { clearProps: "transform" });

            [arrayData[pivotNewIndex], arrayData[high]] = [arrayData[high], arrayData[pivotNewIndex]];
        }
    }
    
    elements = arrayContainer.querySelectorAll('.array-element');
    elements.forEach(el => el.classList.remove('pivot', 'compared'));
    if (elements[pivotNewIndex]) elements[pivotNewIndex].classList.add('sorted');

    return pivotNewIndex;
}

async function quickSortRecursive(low, high, lowMarker, highMarker) {
    if (!isSorting) return;
    const elements = arrayContainer.querySelectorAll('.array-element');

    // Animate markers to their new positions
    if (lowMarker && elements[low]) {
        gsap.to(lowMarker, { left: elements[low].offsetLeft + (elements[low].offsetWidth / 2) - 10, duration: 0.4 });
    }
    if (highMarker && elements[high]) {
        gsap.to(highMarker, { left: elements[high].offsetLeft + (elements[high].offsetWidth / 2) - 10, duration: 0.4 });
    }
    await new Promise(resolve => setTimeout(resolve, 400));

    if (low < high) {
        let pi = await partition(low, high);
        if (!isSorting) return; // Check after partitioning
        await quickSortRecursive(low, pi - 1, lowMarker, highMarker);
        if (!isSorting) return; // Check after the left-side recursion
        await quickSortRecursive(pi + 1, high, lowMarker, highMarker);
    }
}

function swapDOMElements(el1, el2) {
    const parent = el1.parentNode;
    const next_el1 = el1.nextSibling;
    const next_el2 = el2.nextSibling;

    if (next_el1) parent.insertBefore(el2, next_el1);
    else parent.appendChild(el2);

    if (next_el2) parent.insertBefore(el1, next_el2);
    else parent.appendChild(el1);
}

export async function animateQuickSort() {
    if (isSorting) return; // Prevent starting a new sort if one is already running
    isSorting = true;

    updateArrayInfo('Quick Sort', 'O(n log n) avg', 'O(log n)');
    if (!arrayContainer) {
        isSorting = false;
        return;
    }
    
    // Clear previous highlights
    arrayContainer.querySelectorAll('.array-element').forEach(el => el.classList.remove('found', 'sorted', 'current', 'compared', 'pivot'));

    const lowMarker = document.createElement('div');
    lowMarker.className = 'marker marker-low';
    const highMarker = document.createElement('div');
    highMarker.className = 'marker marker-high';
    
    try {
        arrayContainer.appendChild(lowMarker);
        arrayContainer.appendChild(highMarker);

        // Start the recursive sort
        await quickSortRecursive(0, arrayData.length - 1, lowMarker, highMarker);
        
        if (isSorting) { // Only run completion logic if it wasn't interrupted
            const finalElements = arrayContainer.querySelectorAll('.array-element');
            finalElements.forEach(el => el.classList.add('sorted'));
            updateArrayInfo('Quick Sort Complete', 'O(n log n) avg', 'O(log n)');
        }
    } finally {
        // This block runs regardless of how the try block exits
        isSorting = false;
        if (lowMarker.parentNode) arrayContainer.removeChild(lowMarker);
        if (highMarker.parentNode) arrayContainer.removeChild(highMarker);
    }
}

