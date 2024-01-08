const showsPageApi = new BandSiteApi(apiKey);

// function to change 'show' background colour when clicked
function bgColorAddListener(showsContainer, show) {
	showsContainer.addEventListener("click", (e) => {
		if (show === e.target || show.contains(e.target)) {
			show.classList.add("shows__info-wrapper--clicked");
		} else {
			show.classList.remove("shows__info-wrapper--clicked");
		}
		e.stopPropagation();
	});
}

// function to remove 'show' background colour when anywhere else on page is clicked
function bgColorRemoveListener(show) {
	document.addEventListener("click", (e) => {
		show.classList.remove("shows__info-wrapper--clicked");
	});
}

// function to create show elements and add to the DOM
function addShow(showListArr, showObj, showsContainerEl) {
	// show info wrapper
	const divWrapper = document.createElement("div");
	divWrapper.classList.add("shows__info-wrapper");

	// show date detail
	const dateDiv = document.createElement("div");
	dateDiv.classList.add("shows__info");

	const dateLabel = document.createElement("p");
	dateLabel.classList.add("shows__info-label");

	// add class to display only first show's date heading for tablet and desktop views
	if (showObj === showListArr[0]) {
		dateLabel.classList.add("shows__info-label--first");
	}
	dateLabel.innerText = "DATE";
	dateDiv.appendChild(dateLabel);

	const dateDetail = document.createElement("p");
	dateDetail.classList.add("shows__info-detail", "shows__info-detail--date");
	dateDetail.innerText = new Date(showObj.date).toDateString();
	dateDiv.appendChild(dateDetail);

	// show venue detail
	const venueDiv = document.createElement("div");
	venueDiv.classList.add("shows__info");

	const venueLabel = document.createElement("p");
	venueLabel.classList.add("shows__info-label");

	// add class to display only first show's venue heading for tablet and desktop views
	if (showObj === showListArr[0]) {
		venueLabel.classList.add("shows__info-label--first");
	}
	venueLabel.innerText = "VENUE";
	venueDiv.appendChild(venueLabel);

	const venueDetail = document.createElement("p");
	venueDetail.classList.add("shows__info-detail");
	venueDetail.innerText = showObj.place;
	venueDiv.appendChild(venueDetail);

	// show location detail
	const locationDiv = document.createElement("div");
	locationDiv.classList.add("shows__info");

	const locationLabel = document.createElement("p");
	locationLabel.classList.add("shows__info-label");

	// add class to display only first show's location heading for tablet and desktop views
	if (showObj === showListArr[0]) {
		locationLabel.classList.add("shows__info-label--first");
	}
	locationLabel.innerText = "LOCATION";
	locationDiv.appendChild(locationLabel);

	const locationDetail = document.createElement("p");
	locationDetail.classList.add("shows__info-detail");
	locationDetail.innerText = showObj.location;
	locationDiv.appendChild(locationDetail);

	const btn = document.createElement("button");
	btn.classList.add("shows__btn", "btn");
	btn.innerText = "BUY TICKETS";

	divWrapper.appendChild(dateDiv);
	divWrapper.appendChild(venueDiv);
	divWrapper.appendChild(locationDiv);
	divWrapper.appendChild(btn);
	showsContainerEl.appendChild(divWrapper);

	// add click event listeners to shows for background color changes
	bgColorAddListener(showsContainerEl, divWrapper);
	bgColorRemoveListener(divWrapper);
}

// function to retrieve shows from API and display on page
async function displayShows() {
	// create new elements for shows section and add classes for styling
	const showHeader = document.createElement("h1");
	showHeader.classList.add("shows__heading");
	showHeader.innerText = "Shows";

	const divContainer = document.createElement("div");
	divContainer.classList.add("shows__container");

	showList = await showsPageApi.getShows();
	showList.forEach((show) => {
		addShow(showList, show, divContainer);
	});

	// add show details to the DOM
	const showSection = document.querySelector(".shows");
	showSection.appendChild(showHeader);
	showSection.appendChild(divContainer);
}

// display shows on page
displayShows();
