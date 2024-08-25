import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';

function Home(req, res) {
  const __filename = fileURLToPath(import.meta.url);
  let filePath = "";

  // Set the headers before attempting to read the file or send any data
  if (req.url === '/styles.css') {
    filePath = path.join(dirname(__filename), '../styles.css');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css')
  } else {
    filePath = path.join(dirname(__filename), '../index.html');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
  }

  // Read the file and send the response
  fs.readFile(filePath, function(err, html) {
    if (err) {
      res.statusCode = 500;
      res.end('Server error');
      return; // Make sure to return here to prevent further processing
    }
    // Write the content to the response
    res.write(html);
    res.end(); // End the response to close the connection
  });
}

export default Home;
