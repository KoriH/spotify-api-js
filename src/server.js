import dotenv from 'dotenv'
dotenv.config();

import Router from "./routes/Router.js"
import http from 'http';
import Home from "./routes/Home.js";
import Profile from "./routes/Profile.js";
import Auth from "./routes/Auth.js"
import Callback from "./routes/Callback.js";

const router = new Router();

// Homepage
router.createPath('/', Home)

// Profile
router.createPath('/profile', Profile)

// Authorization
router.createPath('/auth', Auth)

// Callback
router.createPath('/callback', Callback)

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log("server running")
})
