"use strict";

let card = document.querySelectorAll(".card");
const removeCard = document.getElementById("card-remove");
const addCard = document.getElementById("card-add");
const cardContainer = document.getElementById("card-container");

addCard.addEventListener("click", function() {
	//set the max number of cards 16.
	if (card.length <= 15) {
		appendCard();
	} else {
		return;
	}
	updateCard();
	clickedCard();
});

removeCard.addEventListener("click", () => {
	//get the last index of card in node, and remove.
	let latestCard = [].slice.call(card).pop();
	latestCard.remove();
	
	updateCard();
});

//looking for clicked card.
function clickedCard() {
	//get the last index of card in node.
	let latestCard = [].slice.call(card).pop();
	
	//add event-listener to the latest card only,
	//to prevent multiple event-listener at once.
	latestCard.addEventListener("click", function() {
   	 cardState(this);
    });
}

//update card length.
function updateCard() {
	card = document.querySelectorAll(".card");
}

function appendCard() {
	/** result:
	 *
	 * <label class="card" data-current-bg="gray">
	 *	<p>1</p>
	 *	<p class="card-desc">unknown</p>
	 * </label>
	 */
	
	let createLabel = document.createElement("label");
	let label = cardContainer.appendChild(createLabel);
	label.setAttribute("class", "card");
	label.setAttribute("data-current-bg", "gray");
	
	let createNum = document.createElement("p");
	let cardNum = label.appendChild(createNum);
	//give the card number based on the order of index.
	for (let i = 1; i < card.length +2; i++) {
		cardNum.textContent = i.toString();
	}
	
	let createDesc = document.createElement("p");
	let cardDesc = label.appendChild(createDesc);
	cardDesc.setAttribute("class", "card-desc");
	cardDesc.textContent = "unknown";
}

function cardState(e) {
	//get current clicked card background color.
	const currentBg = e.getAttribute("data-current-bg");		
	//get current clicked card description.
	const cardDesc = e.querySelector(".card-desc");
		
	//change background color and description when being clicked.
	if (currentBg === "gray") {
		e.setAttribute("data-current-bg", "green");
		cardDesc.textContent = "good";    	
	} else if (currentBg === "green") {
		e.setAttribute("data-current-bg", "yellow");
		cardDesc.textContent = "suspect";
	} else if (currentBg === "yellow") {
		e.setAttribute("data-current-bg", "red");
		cardDesc.textContent = "evil";
	} else {
		e.setAttribute("data-current-bg", "gray");
		cardDesc.textContent = "unknown";
	}
}