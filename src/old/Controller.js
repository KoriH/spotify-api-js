class Controller {
  constructor() {
    this.clientId = "";
    this.clientSecret = "";
    this.url = "https://accounts.spotify.com/api/token";
    document.getElementById('getProfile').addEventListener('click', () => this.getToken());
  }

  async getToken() {
    console.log("htllow world")
    const result = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic' + btoa(this.clientId + ':' + this.clientSecret)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }


  async getGenres(token) {
    const result = await fetch(this.url, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer' + token },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.categories.items;
  }
}

export default Controller;
