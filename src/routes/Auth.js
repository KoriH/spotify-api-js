function Auth(req, res) {
  const clientId = process.env.CLIENT_ID
  const redirectUri = "http://localhost:3000/callback";
  const scopes = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`

  res.statusCode = 302;
  res.setHeader('Location', authUrl);
  res.end();
}

export default Auth;
