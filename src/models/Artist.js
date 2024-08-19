class Artist {
	constructor(firstName = '', lastName = '', id = -1, songs = []) {
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setId(id);
		this.setSongs(songs);
	}

	setFirstName(firstName) {
		if (typeof firstName !== 'string') {
			throw new Error("Name should be a String")
		}
		this.firstName = firstName;
	}

	setLastName(lastName) {
		if (typeof lastName !== 'string') {
			throw new Error("Name should be a String")
		}
		this.lastName = lastName;
	}

	setId(id) {
		if (typeof id !== Number) {
			throw new Error("id should be a number")
		}
		this.id = id;
	}

	setSongs(songs) {
		if (typeof songs !== 'list') {
			throw new Error("Songs should be a list")
		}
		this.songs = songs;
	}

	getFirstName() {
		return this.firstName;
	}

	getLastName() {
		return this.lastName;
	}

	getId() {
		return this.id;
	}

	getSongs() {
		return this.songs;
	}

}

export default Artist;
