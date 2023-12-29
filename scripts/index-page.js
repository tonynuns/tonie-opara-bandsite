const bioPageApi = new BandSiteApi(apiKey);
const cContainer = document.querySelector(".comments__display-wrapper");

// retrieves commentList array from server and display on page sorted by newest date
displayComments();

async function displayComments() {
	// retrieve commentList array from server
	const commentList = await bioPageApi.getComments();

	// empty the comment container to avoid displaying duplicates
	cContainer.innerHTML = "";

	// create new elements, add html classes for styling, and display comments on page
	commentList.forEach((comment) => {
		addComment(comment);
	});

	// when the form submit button is pressed --> (a) constructs a new comment object,
	// (b) posts the new comment object to the server, and (c) resets the form
	const cForm = document.querySelector(".comments__form");

	// Add event listener for form 'submit' button
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
		const newComment = await bioPageApi.postComment(newCommentObj);

		// add new comment to page
		addComment(newComment);

		// move new comment to top of comment list
		cContainer.prepend(cContainer.lastChild);
	});
}

function addComment(comment) {
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

	// DIVING DEEPER CODE - add new 'Like' and 'Delete' buttons wrapper
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
	cLikeBtn.setAttribute("id", comment.id);
	newDivFour.appendChild(cLikeBtn);

	// DIVING DEEPER CODE - add event listener for 'Like' button
	cLikeBtn.addEventListener("click", async (e) => {
		comment = await bioPageApi.likeComment(e.target.id);
		cLikeBtn.innerText = "Like: " + comment.likes;
	});

	// DIVING DEEPER CODE - create 'Delete' button
	const cDeleteBtn = document.createElement("button");
	cDeleteBtn.classList.add(
		"comments__display-btn",
		"comments__display-btn--delete",
		"btn"
	);
	cDeleteBtn.innerText = "Delete";
	cDeleteBtn.setAttribute("id", comment.id);
	newDivFour.appendChild(cDeleteBtn);

	// DIVING DEEPER CODE - adding event listener for 'Delete' button
	cDeleteBtn.addEventListener("click", async (e) => {
		await bioPageApi.deleteComment(e.target.id);
		cDeleteBtn.closest(".comments__display").remove();
	});

	newDivThree.appendChild(newDivFour);
	newDivOne.appendChild(newDivTwo);
	newDivOne.appendChild(newDivThree);
	cContainer.appendChild(newDivOne);
}

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

/* 

// retrieves commentList array from server and display on page sorted by newest date
displayComments().then(() => {
	// when the form submit button is pressed --> (a) constructs a new comment object,
	// (b) posts the new comment object to the server, and (c) resets the form
	const cForm = document.querySelector(".comments__form");

	cForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const cFormName = e.target.name.value;
		const cFormComment = e.target.comment.value;

		// construct new comment object from form inputs
		const newComment = {
			name: cFormName,
			comment: cFormComment,
		};

		// post the new comment object to the server
		bioPageApi.postComment(newComment).then((comment) => {
			addComment(comment);
		});

		e.target.reset();
	});
});

const cContainer = document.querySelector(".comments__display-wrapper");

async function displayComments() {
	// retrieve commentList array from server
	const commentList = await bioPageApi.getComments();

	// empty the comment container to avoid displaying duplicates
	cContainer.innerHTML = "";

	// create new elements, add html classes for styling, and display comments on page
	commentList.forEach((comment) => {
		addComment(comment);
	});
}

function addComment(comment) {
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

	// DIVING DEEPER CODE - adding new 'Like' and 'Delete' buttons wrapper
	const newDivFour = document.createElement("div");
	newDivFour.classList.add("comments__display-btn-wrapper");

	// DIVING DEEPER CODE - creating 'Like' button
	const cLikeBtn = document.createElement("button");
	cLikeBtn.classList.add(
		"comments__display-btn",
		"comments__display-btn--like",
		"btn"
	);
	cLikeBtn.innerText = "Like: " + comment.likes;
	cLikeBtn.setAttribute("id", comment.id);
	newDivFour.appendChild(cLikeBtn);

	// DIVING DEEPER CODE - adding event listener for 'Like' button
	cLikeBtn.addEventListener("click", (e) => {
		bioPageApi.likeComment(e.target.id).then((comment) => {
			cLikeBtn.innerText = "Like: " + comment.likes;
		});
	});

	// DIVING DEEPER CODE - creating 'Delete' button
	const cDeleteBtn = document.createElement("button");
	cDeleteBtn.classList.add(
		"comments__display-btn",
		"comments__display-btn--delete",
		"btn"
	);
	cDeleteBtn.innerText = "Delete";
	cDeleteBtn.setAttribute("id", comment.id);
	newDivFour.appendChild(cDeleteBtn);

	// DIVING DEEPER CODE - adding event listener for 'Delete' button
	cDeleteBtn.addEventListener("click", (e) => {
		bioPageApi.deleteComment(e.target.id).then(() => {
			cDeleteBtn.closest(".comments__display").remove();
		});
	});

	newDivThree.appendChild(newDivFour);
	newDivOne.appendChild(newDivTwo);
	newDivOne.appendChild(newDivThree);
	cContainer.prepend(newDivOne);
}

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
*/
