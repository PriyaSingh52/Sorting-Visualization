// script.js

let array = [];
let animationSpeed = 50;
let arrayColor = "steelblue";

// Define sound effects
const moveSound = new Audio('move_sound.mp3');
const swapSound = new Audio('move_sound.mp3');

function generateArray() {
    console.log("Generating array..."); // Add this line for debugging
    const arrayOption = document.getElementById("array-option").value;
    const arraySize = document.getElementById("array-size").value;
    const range = document.getElementById("range").value;
    array = [];

    if (arrayOption === "random") {
        generateRandomArray(arraySize, range);
    } else {
        const customArrayInput = document.getElementById("custom-array").value;
        const customArray = customArrayInput.split(',').map(num => parseInt(num.trim()));
        if (isValidArray(customArray)) {
            array = customArray;
            displayArray();
        } else {
            alert("Please enter valid comma-separated numbers.");
        }
    }
}


function generateRandomArray(size, range) {
    console.log("Generating random array with size: " + size + ", range: " + range);

    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    for (let i = 0; i < size; i++) {
        const num = Math.floor(Math.random() * range) + 1;
        array.push(num);
        const arrayBar = document.createElement("div");
        arrayBar.style.height = `${num * 2}px`;
        arrayBar.style.backgroundColor = arrayColor;
        arrayBar.classList.add("array-bar");
        const numNode = document.createElement("span");
        numNode.textContent = num;
        arrayBar.appendChild(numNode);
        arrayContainer.appendChild(arrayBar);
    }
    console.log("Generated array:", array); // Add this line for debugging

}


// Add an event listener to the dropdown menu
document.getElementById("array-option").addEventListener("change", function () {
    const selectedOption = this.value;
    if (selectedOption === "custom") {
        document.getElementById("custom-array-input").style.display = "block";
        generateArray(); // Call generateArray() when option changes to "custom"
    } else {
        document.getElementById("custom-array-input").style.display = "none";
        generateArray(); // Call generateArray() when option changes to "random"
    }
});






function createCustomArray() {
    const customArrayInput = document.getElementById("custom-array").value;
    const customArray = customArrayInput.split(',').map(num => parseInt(num.trim()));
    if (isValidArray(customArray)) {
        array = customArray;
        displayArray();
    } else {
        alert("Please enter valid comma-separated numbers.");
    }
}

function isValidArray(arr) {
    return Array.isArray(arr) && arr.every(num => !isNaN(num));
}


async function sortArray(algorithm) {
    switch (algorithm) {
        case 'quick':
            await quickSort(array, 0, array.length - 1);
            break;
        case 'bubble':
            await bubbleSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        default:
            break;
    }
}

async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);
        }
    }

    await swap(arr, i + 1, high);
    return i + 1;
}

async function bubbleSort() {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
            }
        }
    }
}

async function insertionSort() {
    const len = array.length;
    for (let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
        displayArray();
        await sleep(animationSpeed);
    }
}

async function selectionSort() {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        await swap(array, i, minIdx);
    }
}

async function swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
    displayArray();
    swapSound.play(); // Play swap sound effect
    await sleep(animationSpeed);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayArray() {
    console.log("Displaying array:", array); // Add this line for debugging
    // Rest of your code...


    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const arrayBar = document.createElement("div");
        arrayBar.style.height = `${array[i] * 2}px`;
        arrayBar.style.backgroundColor = arrayColor;
        arrayBar.classList.add("array-bar");
        const numNode = document.createElement("span");
        numNode.textContent = array[i];
        arrayBar.appendChild(numNode);
        arrayContainer.appendChild(arrayBar);
    }
}


document.getElementById("speed").addEventListener("input", function () {
    animationSpeed = 100 - this.value;
});

document.getElementById("color").addEventListener("change", function () {
    arrayColor = this.value;
    displayArray();
});

// Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    if (body.classList.contains("light-mode")) {
        setMode("dark");
    } else {
        setMode("light");
    }
}

// Function to set the mode (light/dark)
function setMode(mode) {
    const body = document.body;
    body.classList.remove("light-mode", "dark-mode");
    if (mode === "light") {
        body.classList.add("light-mode");
    } else if (mode === "dark") {
        body.classList.add("dark-mode");
    }
    // Store the current mode preference in localStorage
    localStorage.setItem("mode", mode);
}

// Check for stored mode preference on page load
document.addEventListener("DOMContentLoaded", function () {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
        setMode(storedMode);
    }
});


// Add event listener to toggle dropdown content visibility
document.querySelector('.dropbtn').addEventListener('click', function() {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

// Close the dropdown content when clicking outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdown = document.querySelector('.dropdown-content');
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});

