// commentList array --> initially contains the default comments that are displayed
const commentList = [
	{
		name: "Connor Walton",
		date: "02/17/2021",
		paragraph:
			"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
	},
	{
		name: "Emilie Beach",
		date: "01/09/2021",
		paragraph:
			"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
	},
	{
		name: "Miles Acosta",
		date: "12/20/2020",
		paragraph:
			"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
	},
];

// displays commentList array on page
displayComments();

// when the form submit button is pressed --> (a) constructs a new comment object,
// (b) runs the addComment function, and (c) resets the form
const cForm = document.querySelector(".comments__form");

cForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const cFormName = e.target.name.value;
	const cFormComment = e.target.comment.value;
	const currentDate = new Date();

	// construct new comment object
	const newComment = {
		name: cFormName,
		date: currentDate,
		paragraph: cFormComment,
	};

	addComment(newComment);
	e.target.reset();
});

function addComment(newComment) {
	// add the new comment to the commentList array
	commentList.push(newComment);

	// sort the commentList array in descending order of date
	commentList.sort(sortCommentList);

	// display the updated commentList array on the page
	displayComments();
}

function displayComments() {
	const cContainer = document.querySelector(".comments__display-wrapper");

	// empty the comment container to avoid displaying duplicates
	cContainer.innerHTML = "";

	// create new elements, add html classes for styling, and display comments on page
	commentList.forEach((comment) => {
		const displayDate = timeDiff(comment.date); //Diving Deeper Code

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
		cDate.innerText = displayDate; // Diving Deeper Code
		newDivThree.appendChild(cDate);

		const cParagraph = document.createElement("p");
		cParagraph.classList.add("comments__display-paragraph");
		cParagraph.innerText = comment.paragraph;
		newDivThree.appendChild(cParagraph);

		newDivOne.appendChild(newDivTwo);
		newDivOne.appendChild(newDivThree);
		cContainer.appendChild(newDivOne);
	});
}

function sortCommentList(a, b) {
	return (
		// sort comments in descending order by date or index value in the commentList array
		new Date(b.date) - new Date(a.date) ||
		commentList.indexOf(b) - commentList.indexOf(a)
	);
}

// DIVING DEEPER CODE
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
