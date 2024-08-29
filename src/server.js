import dotenv from 'dotenv'
import http from 'http';
dotenv.config();

import Router from "./controllers/Router.js"
import Home from "./routes/Home.js";
import Profile from "./routes/Profile.js";
import Auth from "./routes/Auth.js"
import Callback from "./routes/Callback.js";
import Shuffle from "./routes/Shuffle.js";


const router = new Router();

// Homepage
router.createPath('/', Home);

// Authorization
router.createPath('/auth', Auth);

// Callback
router.createPath('/callback', Callback);

// Profile
router.createPath('/profile', Profile);

// Create Shuffled Playlist
router.createPath('/shuffle', Shuffle);


const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log("server running")
})
