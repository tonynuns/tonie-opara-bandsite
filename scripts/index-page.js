bioPageApi = new BandSiteApi(apiKey);

// retrieves commentList array from server and display on page sorted by newest date
displayComments();

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
	bioPageApi.postComment(newComment).then(() => {
		displayComments();
	});

	e.target.reset();
});

function displayComments() {
	// retrieves commentList array from server
	bioPageApi.getComments().then((result) => {
		const commentList = result;
		// console.log(commentList);
		const cContainer = document.querySelector(".comments__display-wrapper");

		// empty the comment container to avoid displaying duplicates
		cContainer.innerHTML = "";

		// create new elements, add html classes for styling, and display comments on page
		commentList.forEach((comment) => {
			// const date = new Intl.DateTimeFormat("en-US", {
			// 	year: "numeric",
			// 	month: "2-digit",
			// 	day: "2-digit",
			// }).format(comment.timestamp);

			const date = timeDiff(comment.timestamp);

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
			cDate.innerText = date; // Diving Deeper Code (displayDate)
			newDivThree.appendChild(cDate);

			const cParagraph = document.createElement("p");
			cParagraph.classList.add("comments__display-paragraph");
			cParagraph.innerText = comment.comment;
			newDivThree.appendChild(cParagraph);

			newDivOne.appendChild(newDivTwo);
			newDivOne.appendChild(newDivThree);
			cContainer.appendChild(newDivOne);
		});
	});
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
