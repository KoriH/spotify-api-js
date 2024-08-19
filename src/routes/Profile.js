import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from "url";
import fs from "fs"

function Profile(req, res) {
  const __filename = fileURLToPath(import.meta.url)
  const filePath = path.join(dirname(__filename), '../index.html')

  fs.readFile(filePath, function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    console.log("hello")
    return res.end();
  })
}

export default Profile;
