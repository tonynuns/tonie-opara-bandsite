// this array initially contains the default comments that are displayed
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

const cContainer = document.querySelector(".comments__display-wrapper");
const cForm = document.querySelector(".comments__form");

// when submit button is pressed -> adds new form entries to the commentList array and resets the form
cForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const cFormName = e.target.name.value;
	const cFormComment = e.target.comment.value;
	const currentDate = new Date().toLocaleDateString();

	// const newComment = {
	// 	name: cFormName,
	// 	date: currentDate,
	// 	paragraph: cFormComment,
	// };
	commentList.push({
		name: cFormName,
		date: currentDate,
		paragraph: cFormComment,
	});
	displayComments();
	e.target.reset();
});

// loads and displays default comments on page
displayComments();

function displayComments() {
	//commentList.push(newComment);

	//empty the comment container to avoid displaying duplicates
	cContainer.innerHTML = "";

	//sort the commentList array in descending order of date
	commentList.sort(sortCommentList);

	// creates new elements and adds classes for styling
	commentList.forEach((comment) => {
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
		cDate.innerText = comment.date;
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
// function for sorting comment list in descending order by date.
// if same date, sort by index value of comment object in the array
function sortCommentList(a, b) {
	return (
		new Date(b.date) - new Date(a.date) ||
		commentList.indexOf(b) - commentList.indexOf(a)
	);
}
// loads and displays default comments on page
displayComments();
