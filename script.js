// uses json methods to store items in local storage
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
let edit = false;

// adding event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItemDom);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

// functions
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    for(let item of itemsFromStorage) {
        addItemDom(item);
    }
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function addItem(event) {
    event.preventDefault();

    let item = itemInput.value;

    if(item === "") {
        alert("Please add an item!");
        return;
    }
    
    addItemStorage();
    addItemDom(itemInput.value);
}

function addItemStorage() {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(itemInput.value);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addItemDom(item) {
    // adds to dom
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";

    const button = document.createElement("button");
    button.className = "remove-item btn-link text-red";

    const li = document.createElement("li");
    li.innerText = item;

    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);

    itemInput.value = "";
}

function removeItemDom(event) {
    if(event.target.className === "fa-solid fa-xmark") {
        event.target.parentElement.parentElement.remove();
        removeItemStorage(event.target.parentElement.parentElement.textContent);
        return true;
    }
}

function removeItemStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    itemsFromStorage = [];
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function filterItems(event) {
    const text = itemFilter.value.toLowerCase();
    const items = itemList.querySelectorAll("li");

    for(let item of items) {
        const itemName = item.innerText.toLowerCase();

        if(itemName.indexOf(text) === -1) {
            item.style.display = "none";
        } else {
            item.style.display = "flex";
        }
    }
}