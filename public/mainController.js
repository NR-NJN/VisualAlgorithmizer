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

import {
    generateRandomGraph,
    animateBfs,
    animateDfs
} from './graphVisualizer.js';


document.addEventListener('DOMContentLoaded', function() {
     
    initAOS();
    if (typeof gsap !== 'undefined') {  
        gsap.registerPlugin(ScrollTrigger);
    }
    setupCursor();
    setupNavigation();
    initTypewriter('.typing-text', "BUT DSA ALWAYS CATCHES UP");  
    initMatrixAnimation('matrix-canvas');
    setupFormHighlights();
    setupContactForm('contactForm');
    setupSmoothScrolling();

     
    const arraySection = document.getElementById('arrays');
    if (arraySection) {
        generateRandomArray();  
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
        document.getElementById('array-reset-btn')?.addEventListener('click', () => generateRandomArray());
    }

     
    const linkedListSection = document.getElementById('linked-lists');
    if (linkedListSection) {
        generateRandomLinkedList();  
        document.getElementById('list-traverse-btn')?.addEventListener('click', animateListTraversal);
        document.getElementById('list-insert-btn')?.addEventListener('click', animateListInsertion);
        document.getElementById('list-delete-btn')?.addEventListener('click', animateListDeletion);
        document.getElementById('list-reset-btn')?.addEventListener('click', () => generateRandomLinkedList());
    }

     
    const treeSection = document.getElementById('trees');
    if (treeSection) {
        generateRandomTree();  
        document.getElementById('tree-insert-btn')?.addEventListener('click', animateTreeInsertion);
        document.getElementById('tree-delete-btn')?.addEventListener('click', animateTreeDeletion);
        document.getElementById('tree-traverse-btn')?.addEventListener('click', animateTreeTraversal);
        document.getElementById('tree-reset-btn')?.addEventListener('click', generateRandomTree);
    }

    const graphSection = document.getElementById('graphs');
    if (graphSection) {
        generateRandomGraph();
        document.getElementById('graph-reset-btn')?.addEventListener('click', generateRandomGraph);
        document.getElementById('graph-bfs-btn')?.addEventListener('click', animateBfs);
        document.getElementById('graph-dfs-btn')?.addEventListener('click', animateDfs);
    }

     
});
