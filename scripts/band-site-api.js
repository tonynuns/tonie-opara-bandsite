const apiKey = "980a73a9-10b8-48ab-a4db-6198b6c8c4c2";

class BandSiteApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = "https://project-1-api.herokuapp.com/";
	}

	async postComment(newComment) {
		const apiUrl = this.baseUrl + "comments" + "?api_key=" + this.apiKey;
		try {
			const response = await axios.post(apiUrl, newComment);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async getComments() {
		const apiUrl = this.baseUrl + "comments" + "?api_key=" + this.apiKey;
		try {
			const response = await axios.get(apiUrl);
			response.data.sort((a, b) => {
				return a.timestamp - b.timestamp;
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async getShows() {
		const apiUrl = this.baseUrl + "showdates" + "?api_key=" + this.apiKey;
		try {
			const response = await axios.get(apiUrl);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	//Diving Deeper Codes
	async likeComment(commentId) {
		const apiUrl =
			this.baseUrl +
			"comments/" +
			commentId +
			"/like" +
			"?api_key=" +
			this.apiKey;
		try {
			const response = await axios.put(apiUrl);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async deleteComment(commentId) {
		const apiUrl =
			this.baseUrl + "comments/" + commentId + "?api_key=" + this.apiKey;
		try {
			const response = await axios.delete(apiUrl);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
}
