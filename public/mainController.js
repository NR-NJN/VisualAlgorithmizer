import {
    initAOS,
    setupNavigation,
    initTypewriter,
    initParticleAnimation,
    setupFormHighlights,
    setupSmoothScrolling
} from './commonUI.js';

import {
    generateRandomArray,
    animateArrayTraversal,
    animateArraySearch,
    animateBubbleSort,
    animateSelectionSort,
    animateInsertionSort,
    animateMergeSort,
    animateQuickSort 
} from './array/arrayVisualizer.js';

import {
    generateRandomLinkedList,
    animateListTraversal,
    animateListInsertion,
    animateListDeletion
} from './linked-list/linkedListVisualizer.js';

import {
    generateRandomTree,
    animateTreeInsertion,
    animateTreeDeletion,
    animateTreeTraversal
} from './bst/treeVisualizer.js';

import {
    setupGraphControls,
    animateBfs,
    animateDfs
} from './graph/graphVisualizer.js';


document.addEventListener('DOMContentLoaded', function() {
     
    initAOS();
    if (typeof gsap !== 'undefined') {  
        gsap.registerPlugin(ScrollTrigger);
    }
    setupNavigation();  
    initParticleAnimation('particle-canvas');
    setupFormHighlights();
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
                else if (sortType === 'merge') animateMergeSort();
                else if (sortType === 'quick') animateQuickSort();
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
        setupGraphControls();
        document.getElementById('graph-reset-btn')?.addEventListener('click', setupGraphControls);
        document.getElementById('graph-bfs-btn')?.addEventListener('click', animateBfs);
        document.getElementById('graph-dfs-btn')?.addEventListener('click', animateDfs);
    }

     
});
