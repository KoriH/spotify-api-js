require('dotenv').config();

const express = require('express');
const request = require('request');
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL


app.use(express.static(path.join(__dirname, 'view')))

app.get('/', (req, res) => {
  console.log(req.url)
  if (req.url === './index.css') {
    res.setHeader('Content-type', 'text/css')
    const file = fs.readFileSync('./view/index.css')
    res.write(file)
    res.end()
  } else {
    res.setHeader('Content-type', 'text/html')
    const file = fs.readFileSync('./view/index.html')
    res.write(file)
    res.end()
  }
})

app.get('/login', (req, res, next) => {
  let state = '8794519728302800';
  let scope = 'user-read-private user-read-email user-top-read playlist-read-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: CALLBACK_URL,
      state: state
    }))
})

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: CALLBACK_URL,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    // TODO: don't use request module, do it with node https module
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        let refresh_token = body.refresh_token;

        res.redirect('http://localhost:3000/home?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

      } else {
        res.status(response.statusCode).send(body);
      }
    });
  }
});


app.get('/home', (req, res) => {
  if (res.url === './home.css') {
    res.setHeader('content-type', 'text/css')
    const file = fs.readFileSync('./view/home.css')
    res.write(file)
    res.end()
  } else {
    res.setHeader('content-type', 'text/html')
    const file = fs.readFileSync('./view/home.html')
    res.write(file)
    res.end()
  }
})

app.get('/playlists', (req, res) => {
  const token = req.get('Authorization')
  const playlistsRequest = {
    url: 'https://api.spotify.com/v1/me/playlists?limit=1&offset=0',
    headers: {
      'Authorization': token
    }
  }

  let href = "";
  request.get(playlistsRequest, function(error, response, body) {
    if (error) {
      console.log('error' + error)
      return;
    }

    const responseJson = response.toJSON();
    const json = JSON.parse(responseJson.body);
    const items = json.items
    const item = items[0]
    href = JSON.stringify(item.href)
    console.log(href)
  })
})

app.get('/playlist', (req, res) => {
  console.log("should handle the looking at individual plaaylists from a url that the playlists route sends to this one")
})

app.get('/shuffle', (req, res) => {
  console.log('get shuffled playlist')
})

app.get('/generate', (req, res) => {
  console.log('get generated playlist')
})

app.listen(PORT, () => {
  console.log('running')
})
