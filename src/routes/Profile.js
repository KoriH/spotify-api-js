import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from "url";
import fs from "fs"

function Profile(req, res) {
  const __filename = fileURLToPath(import.meta.url)
  const filePath = path.join(dirname(__filename), '../pages/profile.html')
  const accessToken = localStorage.getItem('authToken')

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');

  fs.readFile(filePath, function(err, html) {
    if (err) {
      throw err;
    }
    res.write(html);
    return res.end();
  })
}

export default Profile;
