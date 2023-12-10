const showList = [
	{
		date: "Mon Sept 06 2021",
		venue: "Ronald Lane",
		location: "San Francisco, CA",
	},
	{
		date: "Tue Sept 21 2021",
		venue: "Pier 3 East",
		location: "San Francisco, CA",
	},
	{
		date: "Fri Oct 15 2021",
		venue: "View Lounge",
		location: "San Francisco, CA",
	},
	{
		date: "Sat Nov 06 2021",
		venue: "Hyatt Agency",
		location: "San Francisco, CA",
	},
	{
		date: "Fri Nov 26 2021",
		venue: "Moscow Center",
		location: "San Francisco, CA",
	},
	{
		date: "Wed Dec 15 2021",
		venue: "Press Club",
		location: "San Francisco, CA",
	},
];

// loads and displays shows section on page
displayShows();

function displayShows() {
	const showSection = document.querySelector(".shows");

	// creates new elements for shows section and adds classes for styling
	const showHeader = document.createElement("h1");
	showHeader.classList.add("shows__heading");
	showHeader.innerText = "Shows";

	const divContainer = document.createElement("div");
	divContainer.classList.add("shows__container");

	showList.forEach((show) => {
		// show info wrapper
		const divWrapper = document.createElement("div");
		divWrapper.classList.add("shows__info-wrapper");

		// show date detail
		const dateDiv = document.createElement("div");
		dateDiv.classList.add("shows__info");

		const dateLabel = document.createElement("p");
		dateLabel.classList.add("shows__info-label");
		if (showList.indexOf(show) === 0) {
			dateLabel.classList.add("shows__info-label--first");
		}
		dateLabel.innerText = "DATE";
		dateDiv.appendChild(dateLabel);

		const dateDetail = document.createElement("p");
		dateDetail.classList.add("shows__info-detail");
		dateDetail.innerText = show.date;
		dateDiv.appendChild(dateDetail);

		// show venue detail
		const venueDiv = document.createElement("div");
		venueDiv.classList.add("shows__info");

		const venueLabel = document.createElement("p");
		venueLabel.classList.add("shows__info-label");
		if (showList.indexOf(show) === 0) {
			venueLabel.classList.add("shows__info-label--first");
		}
		venueLabel.innerText = "VENUE";
		venueDiv.appendChild(venueLabel);

		const venueDetail = document.createElement("p");
		venueDetail.classList.add("shows__info-detail");
		venueDetail.innerText = show.venue;
		venueDiv.appendChild(venueDetail);

		// show location detail
		const locationDiv = document.createElement("div");
		locationDiv.classList.add("shows__info");

		const locationLabel = document.createElement("p");
		locationLabel.classList.add("shows__info-label");
		if (showList.indexOf(show) === 0) {
			locationLabel.classList.add("shows__info-label--first");
		}
		locationLabel.innerText = "LOCATION";
		locationDiv.appendChild(locationLabel);

		const locationDetail = document.createElement("p");
		locationDetail.classList.add("shows__info-detail");
		locationDetail.innerText = show.location;
		locationDiv.appendChild(locationDetail);

		const btn = document.createElement("button");
		btn.classList.add("shows__btn", "btn");
		btn.innerText = "BUY TICKETS";

		divWrapper.appendChild(dateDiv);
		divWrapper.appendChild(venueDiv);
		divWrapper.appendChild(locationDiv);
		divWrapper.appendChild(btn);

		divContainer.appendChild(divWrapper);
	});

	showSection.appendChild(showHeader);
	showSection.appendChild(divContainer);
}

// Change 'show' background colour when clicked
const showsGroup = document.querySelector(".shows__container");
const listOfShows = document.querySelectorAll(".shows__info-wrapper");

showsGroup.addEventListener("click", (e) => {
	listOfShows.forEach((show) => {
		if (show === e.target || show.contains(e.target)) {
			show.classList.add("shows__info-wrapper--clicked");
		} else {
			show.classList.remove("shows__info-wrapper--clicked");
		}
	});
});
