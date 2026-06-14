import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf-8');
const env = Object.fromEntries(envContent.split('\n').filter(line => line && !line.startsWith('#')).map(line => {
  const parts = line.split('=');
  return [parts[0].trim(), parts.slice(1).join('=').trim()];
}));

async function run() {
  const apiKey = env['VITE_GOOGLE_DRIVE_API_KEY'];
  const rootFolderId = env['VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID'];
  const query = `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name)`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.files.map(f => f.name));
}
run();
