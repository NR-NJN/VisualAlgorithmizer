import {
    initAOS,
    setupCursor,
    setupNavigation,
    initTypewriter,
    initMatrixAnimation,
    setupFormHighlights,
    setupContactForm,
    setupSmoothScrolling
} from './commonUI.js';

import {
    generateRandomArray,
    animateArrayTraversal,
    animateArraySearch,
    animateBubbleSort,
    animateSelectionSort,
    animateInsertionSort
} from './arrayVisualizer.js';

import {
    generateRandomLinkedList,
    animateListTraversal,
    animateListInsertion,
    animateListDeletion
} from './linkedListVisualizer.js';

import {
    generateRandomTree,
    animateTreeInsertion,
    animateTreeDeletion,
    animateTreeTraversal
} from './treeVisualizer.js';


document.addEventListener('DOMContentLoaded', function() {
    // Initialize common UI elements
    initAOS();
    if (typeof gsap !== 'undefined') { // GSAP is global via CDN
        gsap.registerPlugin(ScrollTrigger);
    }
    setupCursor();
    setupNavigation();
    initTypewriter('.typing-text', "BUT DSA ALWAYS CATCHES UP"); // Pass your actual text
    initMatrixAnimation('matrix-canvas');
    setupFormHighlights();
    setupContactForm('contactForm');
    setupSmoothScrolling();

    // Array Visualization Setup
    const arraySection = document.getElementById('arrays');
    if (arraySection) {
        generateRandomArray(); // Initial array
        document.getElementById('array-traverse-btn')?.addEventListener('click', animateArrayTraversal);
        document.getElementById('array-search-btn')?.addEventListener('click', () => {
            const searchInput = document.getElementById('array-search-input');
            if (searchInput) animateArraySearch(searchInput.value);
        });
        document.getElementById('array-sort-btn')?.addEventListener('click', () => {
            const sortSelect = document.getElementById('array-sort-select');
            if (sortSelect) {
                const sortType = sortSelect.value;
                if (sortType === 'bubble') animateBubbleSort();
                else if (sortType === 'selection') animateSelectionSort();
                else if (sortType === 'insertion') animateInsertionSort();
            }
        });
        document.getElementById('array-reset-btn')?.addEventListener('click', generateRandomArray);
    }

    // Linked List Visualization Setup
    const linkedListSection = document.getElementById('linked-lists');
    if (linkedListSection) {
        generateRandomLinkedList(); // Initial list
        document.getElementById('list-traverse-btn')?.addEventListener('click', animateListTraversal);
        document.getElementById('list-insert-btn')?.addEventListener('click', animateListInsertion);
        document.getElementById('list-delete-btn')?.addEventListener('click', animateListDeletion);
        document.getElementById('list-reset-btn')?.addEventListener('click', generateRandomLinkedList);
    }

    // Binary Tree Visualization Setup
    const treeSection = document.getElementById('trees');
    if (treeSection) {
        generateRandomTree(); // Initial tree
        document.getElementById('tree-insert-btn')?.addEventListener('click', animateTreeInsertion);
        document.getElementById('tree-delete-btn')?.addEventListener('click', animateTreeDeletion);
        document.getElementById('tree-traverse-btn')?.addEventListener('click', animateTreeTraversal);
        document.getElementById('tree-reset-btn')?.addEventListener('click', generateRandomTree);
    }

    // Graph Setup
});
