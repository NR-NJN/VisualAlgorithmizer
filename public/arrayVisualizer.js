let arrayData = [];
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
    arrayData = [];
    for (let i = 0; i < size; i++) {
        arrayData.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    console.log("Generated array:", arrayData);
    renderArray();
    updateArrayInfo('Array initialized', 'O(1)', 'O(n)');
}

export async function animateArrayTraversal() {
    updateArrayInfo('Array Traversal', 'O(n)', 'O(1)');
    if (!arrayContainer) return;
    const elements = arrayContainer.querySelectorAll('.array-element');
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
