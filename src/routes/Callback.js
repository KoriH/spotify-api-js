import https from 'https';
import querystring from 'querystring';

function Callback(req, res) {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/callback';

  if (!clientId || !clientSecret) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Server configuration error.');
  }

  const url = new URL(req.url, 'http://localhost:3000');
  const code = url.searchParams.get('code');

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Authorization code not found');
  }

  const postData = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const options = {
    hostname: 'accounts.spotify.com',
    path: '/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const tokenReq = https.request(options, (tokenRes) => {
    let data = '';

    tokenRes.on('data', (chunk) => {
      data += chunk;
    });

    tokenRes.on('end', () => {
      if (tokenRes.statusCode === 200) {
        const tokenData = JSON.parse(data);
        const accessToken = tokenData.access_token;

        // Send the access token to the client
        if (!res.headersSent) {
          localStorage.setItem('authToken', accessToken)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`Access Token: ${accessToken}`);
        }
      } else {
        // Handle error in the token exchange
        console.error(`Failed to exchange code for token: ${tokenRes.statusCode} ${data}`);
        if (!res.headersSent) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Failed to exchange code for token.');
        }
      }
    });
  });

  tokenReq.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });

  tokenReq.write(postData);
  tokenReq.end();
}

export default Callback;
