const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");

// adding event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

// functions
function addItem(event) {
    event.preventDefault();

    // validate input
    if(itemInput.value === "") {
        alert("Please add an item!");
        return;
    }

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";

    const button = document.createElement("button");
    button.className = "remove-item btn-link text-red";

    const li = document.createElement("li");
    li.innerText = itemInput.value;

    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);

   itemInput.value = "";
}

function removeItem(event) {
    if(event.target.className === "fa-solid fa-xmark") {
        event.target.parentElement.parentElement.remove();
    }
}

function clearItems() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}