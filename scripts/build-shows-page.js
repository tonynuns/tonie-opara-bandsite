showsPageApi = new BandSiteApi(apiKey);

// loads and displays shows section on page
showsPageApi.getShows().then((result) => {
	const showList = result;

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
		if (show === showList[0]) {
			dateLabel.classList.add("shows__info-label--first");
		}
		dateLabel.innerText = "DATE";
		dateDiv.appendChild(dateLabel);

		const dateDetail = document.createElement("p");
		dateDetail.classList.add("shows__info-detail", "shows__info-detail--date");
		dateDetail.innerText = new Date(show.date).toDateString();
		dateDiv.appendChild(dateDetail);

		// show venue detail
		const venueDiv = document.createElement("div");
		venueDiv.classList.add("shows__info");

		const venueLabel = document.createElement("p");
		venueLabel.classList.add("shows__info-label");
		if (show === showList[0]) {
			venueLabel.classList.add("shows__info-label--first");
		}
		venueLabel.innerText = "VENUE";
		venueDiv.appendChild(venueLabel);

		const venueDetail = document.createElement("p");
		venueDetail.classList.add("shows__info-detail");
		venueDetail.innerText = show.place;
		venueDiv.appendChild(venueDetail);

		// show location detail
		const locationDiv = document.createElement("div");
		locationDiv.classList.add("shows__info");

		const locationLabel = document.createElement("p");
		locationLabel.classList.add("shows__info-label");
		if (show === showList[0]) {
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

	// change 'show' background colour when clicked
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
		e.stopPropagation();
	});

	// remove 'show' background colour when anywhere else on page is clicked
	document.addEventListener("click", (e) => {
		listOfShows.forEach((show) => {
			show.classList.remove("shows__info-wrapper--clicked");
		});
	});
});
