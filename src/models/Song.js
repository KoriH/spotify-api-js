class Song {
	constructor(id = -1, name = "", artist = "") {
		this.id = id;
		this.name = name;
		this.artist = artist;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getArtist() {
		return this.artist;
	}

	setArtist(artist) {
		this.artist = artist;
	}

	getId() {
		return this.id;
	}

	setId(id) {
		this.id = id;
	}
}

export default Song;
