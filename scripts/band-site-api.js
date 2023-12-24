const apiKey = "980a73a9-10b8-48ab-a4db-6198b6c8c4c2";

class BandSiteApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = "https://project-1-api.herokuapp.com/";
	}

	async postComment(newComment) {
		const apiUrl = this.baseUrl + "comments" + "?api_key=" + this.apiKey;
		const response = await axios.post(apiUrl, newComment);
		return response.data;
	}

	async getComments() {
		const apiUrl = this.baseUrl + "comments" + "?api_key=" + this.apiKey;
		const response = await axios.get(apiUrl);
		response.data.sort((a, b) => {
			return b.timestamp - a.timestamp;
		});
		return response.data;
	}

	async getShows() {
		const apiUrl = this.baseUrl + "showdates" + "?api_key=" + this.apiKey;
		const response = await axios.get(apiUrl);
		return response.data;
	}
}

// bioPageApi = new BandSiteApi(apiKey);
// bioPageApi.getComments().then((result) => {
// 	const commentList = result;
// 	console.log(commentList);
// });

// showsPageApi = new BandSiteApi(apiKey);
// showsPageApi.getShows().then((result) => {
// 	const showList = result;
// 	console.log(showList);
// });
