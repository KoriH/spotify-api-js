import https from 'https';
import querystring from 'querystring';

export default function Callback(req, res) {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/callback';

  if (!clientId || !clientSecret) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Server configuration error.');
  }

  // Extract the authorization code from the query parameters
  const url = new URL(req.url, 'http://localhost:3000');
  const code = url.searchParams.get('code');

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Authorization code not found.');
  }

  // Prepare the POST data for the token exchange request
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

  // Flag to ensure response is sent only once
  let responseSent = false;

  // Make the request to exchange the authorization code for a Bearer token
  const tokenReq = https.request(options, (tokenRes) => {
    let data = '';

    tokenRes.on('data', (chunk) => {
      data += chunk;
    });

    tokenRes.on('end', () => {
      if (responseSent) return; // Prevent multiple responses

      if (tokenRes.statusCode === 200) {
        try {
          const tokenData = JSON.parse(data);
          const accessToken = tokenData.access_token;
          // Return the access token to the client
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`Access Token: ${accessToken}`);
        } catch (err) {
          console.error('Error parsing token data:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      } else {
        console.error(`Failed to exchange code for token: ${tokenRes.statusCode} ${data}`);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Failed to exchange code for token.');
      }
      responseSent = true; // Mark the response as sent
    });
  });

  tokenReq.on('error', (e) => {
    if (responseSent) return; // Prevent multiple responses

    console.error(`Problem with request: ${e.message}`);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
    responseSent = true; // Mark the response as sent
  });

  // Handle request end in case of an error during request writing
  tokenReq.on('abort', () => {
    if (responseSent) return; // Prevent multiple responses
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Request aborted');
    responseSent = true;
  });

  tokenReq.write(postData);
  tokenReq.end();
}
