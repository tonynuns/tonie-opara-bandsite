const bioPageApi = new BandSiteApi(apiKey);

// function to add event listener for form 'Submit' button
function formBtnListener() {
	const cForm = document.querySelector(".comments__form");
	cForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const cFormName = e.target.name.value;
		const cFormComment = e.target.comment.value;
		e.target.reset();

		// construct new comment object from form inputs
		const newCommentObj = {
			name: cFormName,
			comment: cFormComment,
		};
		// post the new comment object to the server
		await bioPageApi.postComment(newCommentObj);

		// display new comment on page
		displayComments();
	});
}

// DIVING DEEPER CODE - function to add event listener for 'Like' button
function likeBtnListener(btn) {
	btn.addEventListener("click", async (e) => {
		await bioPageApi.likeComment(e.target.name);
		displayComments();
	});
}

// DIVING DEEPER CODE - function to add event listener for 'Delete' button
function deleteBtnListener(btn) {
	btn.addEventListener("click", async (e) => {
		await bioPageApi.deleteComment(e.target.name);
		displayComments();
	});
}

// function to convert date format to dynamic timestamp for comments
function timeDiff(date) {
	const yrInSec = 365 * 24 * 60 * 60;
	const mthInSec = 30 * 24 * 60 * 60;
	const wkInSec = 7 * 24 * 60 * 60;
	const dayInSec = 24 * 60 * 60;
	const hrInSec = 60 * 60;
	const minInSec = 60;
	const diff = new Date() - new Date(date);
	let diffDays = Math.floor(diff / 1000);
	let tformat = "seconds";

	if (diffDays > yrInSec) {
		diffDays = Math.floor(diffDays / yrInSec);
		tformat = "years";
	} else if (diffDays > mthInSec) {
		diffDays = Math.floor(diffDays / mthInSec);
		tformat = "months";
	} else if (diffDays > wkInSec) {
		diffDays = Math.floor(diffDays / wkInSec);
		tformat = "weeks";
	} else if (diffDays > dayInSec) {
		diffDays = Math.floor(diffDays / dayInSec);
		tformat = "days";
	} else if (diffDays > hrInSec) {
		diffDays = Math.floor(diffDays / hrInSec);
		tformat = "hours";
	} else if (diffDays > minInSec) {
		diffDays = Math.floor(diffDays / minInSec);
		tformat = "minutes";
	}
	const dateF = new Intl.RelativeTimeFormat("en-us", { numeric: "always" });
	const tAgo = dateF.format(-diffDays, tformat);
	return tAgo;
}

// function to add comment elements to the DOM
function addComment(commentsContainer, comment) {
	const newDivOne = document.createElement("div");
	newDivOne.classList.add("comments__display");

	const newDivTwo = document.createElement("div");
	newDivTwo.classList.add("comments__display-avatar", "avatar");

	const newDivThree = document.createElement("div");
	newDivThree.classList.add("comments__display-text");

	const cName = document.createElement("h3");
	cName.classList.add("comments__display-name");
	cName.innerText = comment.name;
	newDivThree.appendChild(cName);

	const cDate = document.createElement("h3");
	cDate.classList.add("comments__display-date");
	cDate.innerText = timeDiff(comment.timestamp);
	newDivThree.appendChild(cDate);

	const cParagraph = document.createElement("p");
	cParagraph.classList.add("comments__display-paragraph");
	cParagraph.innerText = comment.comment;
	newDivThree.appendChild(cParagraph);

	// DIVING DEEPER CODE - add wrapper for 'Like' and 'Delete' buttons
	const newDivFour = document.createElement("div");
	newDivFour.classList.add("comments__display-btn-wrapper");

	// DIVING DEEPER CODE - create 'Like' button
	const cLikeBtn = document.createElement("button");
	cLikeBtn.classList.add(
		"comments__display-btn",
		"comments__display-btn--like",
		"btn"
	);
	cLikeBtn.innerText = "Like: " + comment.likes;
	cLikeBtn.setAttribute("name", comment.id);
	newDivFour.appendChild(cLikeBtn);

	// DIVING DEEPER CODE - add event listener for 'Like' button
	likeBtnListener(cLikeBtn);

	// DIVING DEEPER CODE - create 'Delete' button
	const cDeleteBtn = document.createElement("button");
	cDeleteBtn.classList.add(
		"comments__display-btn",
		"comments__display-btn--delete",
		"btn"
	);
	cDeleteBtn.innerText = "Delete";
	cDeleteBtn.setAttribute("name", comment.id);
	newDivFour.appendChild(cDeleteBtn);

	// DIVING DEEPER CODE - adding event listener for 'Delete' button
	deleteBtnListener(cDeleteBtn);

	newDivThree.appendChild(newDivFour);
	newDivOne.appendChild(newDivTwo);
	newDivOne.appendChild(newDivThree);
	commentsContainer.appendChild(newDivOne);
}

// function to display retrieve comments from API and display on page
async function displayComments() {
	// retrieve commentList array from server
	const commentList = await bioPageApi.getComments();

	// empty the DOM comment container to avoid displaying duplicates
	const cContainer = document.querySelector(".comments__display-wrapper");
	cContainer.innerHTML = "";

	// create new elements and add to the DOM
	commentList.forEach((comment) => {
		addComment(cContainer, comment);
	});
}

// add click event listener to form
formBtnListener();

// display comments on page
displayComments();
