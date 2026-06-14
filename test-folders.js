require('dotenv').config();
const fetch = require('node-fetch');
async function run() {
  const apiKey = process.env.VITE_GOOGLE_DRIVE_API_KEY;
  const rootFolderId = process.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID;
  const query = `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name)`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.files.map(f => f.name));
}
run();
