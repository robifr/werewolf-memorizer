"use strict";

const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const cardContainer = document.getElementById("card-container");
const cardBtn = document.querySelectorAll("[data-btn]");

let card = document.querySelectorAll(".card");

let pressTimer = null;

//append a new card.
addBtn.addEventListener("mousedown", pressEvent);
addBtn.addEventListener("touchstart", pressEvent);
addBtn.addEventListener("mouseup", cancelEvent);
addBtn.addEventListener("touchend", cancelEvent);
addBtn.addEventListener("click", clickAdd);

function clickAdd() {
	//change cardContainer state, from display flex to grid.
	if (!cardContainer.classList.contains("card-container-grid")) {
		gridContainer();
	}
	
	//set the max number of cards 16.
	if (card.length <= 15) {
		appendCard();
	}
	updateCard();
	clickedCard();
}

//looking for clicked card.
function clickedCard() {
	//get the last index of card in node.
	let lastCard = [].slice.call(card).pop();
	
	//add event-listener to the latest card only, 
	//to prevent multiple event-listener in single element.
	lastCard.addEventListener("mousedown", pressEvent);
	lastCard.addEventListener("touchstart", pressEvent);
	lastCard.addEventListener("mouseup", cancelEvent);
	lastCard.addEventListener("touchend", cancelEvent);
	lastCard.addEventListener("click", clickCard);
	
	function clickCard() {
		//get current clicked card background color.
		let currentBg = this.getAttribute("data-current-bg");
		//get current clicked card description.
		let cardDesc = this.querySelector(".card-desc");

		//change background color and description when being clicked.
		if (currentBg === "gray") {
			this.setAttribute("data-current-bg", "green");
			cardDesc.textContent = "good";	
		} else if (currentBg === "green") {
			this.setAttribute("data-current-bg", "yellow");
			cardDesc.textContent = "suspect";
		} else if (currentBg === "yellow") {
			this.setAttribute("data-current-bg", "red");
			cardDesc.textContent = "evil";
		} else {
			this.setAttribute("data-current-bg", "gray");
			cardDesc.textContent = "unknown";
		}
	}
}

//remove the latest card.
removeBtn.addEventListener("mousedown", pressEvent);
removeBtn.addEventListener("touchstart", pressEvent);
removeBtn.addEventListener("mouseup", cancelEvent);
removeBtn.addEventListener("touchend", cancelEvent);
removeBtn.addEventListener("click", clickRemove);

function clickRemove() {
	//get the last index of card in node, and remove them.
	let lastCard = [].slice.call(card).pop();
	lastCard.remove();
	
	updateCard();
	
	//when there's no more card to be removed.
	//change cardContainer state to display flex.
	if (card.length === 0) {
		initialContainer();
	}
}

//called whenever user presses add, remove, 
//or the card itself.
function pressEvent() {
	//get the clicked element type.
	let isCard = this.getAttribute("class");
	let btnType = this.getAttribute("id");

	if (pressTimer === null) {
		pressTimer = setTimeout(() => {
			//check if the pressed element is a button.
			if (isCard !== "card") {
				pressTimer = setInterval(() => {
					//add or remove card when being pressed.
					if (btnType === "add-btn") {
						clickAdd();
					} else {
						clickRemove();
					}
				}, 120);
			//otherwise the pressed element is a card.
			} else {
				//get current pressed card description.
				let cardDesc = this.querySelector(".card-desc");

				//hide background color and description.
				this.setAttribute("data-current-bg", "invis");
				cardDesc.textContent = "";
			}
		}, 100);
	}
	return false;
}

//called whenever user cancels to press add, remove,
//or the card itself.
function cancelEvent() {
	if (pressTimer !== null) {
		clearTimeout(pressTimer);
		clearInterval(pressTimer);
		pressTimer = null;
	}
}

//----- FUNCTION ORIGIN -----------------------------------------------------------------------------------------------

function updateCard() {
	card = document.querySelectorAll(".card");
}

//initial state of card container, display flex.
function initialContainer() {
	cardContainer.textContent = "Press + to add a new card, and - to remove them.";
	cardContainer.classList.remove("card-container-grid");
	cardContainer.classList.add("card-container-initial");
}
initialContainer();

function gridContainer() {
	cardContainer.textContent = "";
	cardContainer.classList.remove("card-container-initial");
	cardContainer.classList.add("card-container-grid");
}

//---- "CLICK ADD" FUNCTION ---- START

function appendCard() {
	/** result:
	 *
	 * <label class="card" data-current-bg="gray">
	 *	<p class="card-num">1</p>
	 *	<p class="card-desc">unknown</p>
	 * </label>
	 */
	
	let createLabel = document.createElement("label");
	let cardLabel = cardContainer.appendChild(createLabel);
	cardLabel.setAttribute("class", "card");
	cardLabel.setAttribute("data-current-bg", "gray");
	
	let createNum = document.createElement("p");
	let cardNum = cardLabel.appendChild(createNum);
	cardNum.setAttribute("class", "card-num");
	//give the card number based on the order of index.
	for (let i = 1; i < card.length +2; i++) {
		cardNum.textContent = i.toString();
	}
	
	let createDesc = document.createElement("p");
	let cardDesc = cardLabel.appendChild(createDesc);
	cardDesc.setAttribute("class", "card-desc");
	cardDesc.textContent = "unknown";
}

//--- "CLICK ADD" FUNCTION ---- END
