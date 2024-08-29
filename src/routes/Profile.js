import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from "url";
import fs from "fs"

export default function Profile(req, res) {
  const __filename = fileURLToPath(import.meta.url)
  const filePath = path.join(dirname(__filename), '../pages/profile.html')

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

