require('dotenv').config();

const express = require('express');
const request = require('request');
const path = require('path')
const querystring = require('querystring')
const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL

let access_token = ""
let refresh_token = ""

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'))
})

app.get('/login', (req, res, next) => {
  let state = '8794519728302800';
  let scope = 'user-read-private user-read-email';

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
    var authOptions = {
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

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        refresh_token = body.refresh_token;

        res.send(body);

      } else {
        res.status(response.statusCode).send(body);
      }
    });
  }
});


app.get('/home', (req, res) => {
  console.log('home after login should be a dashboard')
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
