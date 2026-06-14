import fs from 'fs';

async function test() {
  const envFile = fs.readFileSync('.env', 'utf8');
  let apiKey = '';
  let rootFolderId = '';
  for (const line of envFile.split('\n')) {
    if (line.startsWith('VITE_GOOGLE_DRIVE_API_KEY=')) apiKey = line.split('=')[1].trim();
    if (line.startsWith('VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID=')) rootFolderId = line.split('=')[1].trim();
  }

  // Get first folder
  const query = `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name)`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.files || data.files.length === 0) return console.log("no folders");
  const folderId = data.files[0].id;
  
  // Get first image
  const q2 = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  const url2 = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q2)}&key=${apiKey}&fields=files(id,name,thumbnailLink)`;
  const res2 = await fetch(url2);
  const data2 = await res2.json();
  if (!data2.files || data2.files.length === 0) return console.log("no images");
  const img = data2.files[0];
  
  console.log("Image:", img.id, img.name);
  console.log("Thumbnail Link:", img.thumbnailLink);
  
  // Try to fetch modified URL
  if (img.thumbnailLink) {
    const lastEqualsIndex = img.thumbnailLink.lastIndexOf('=');
    const modified = img.thumbnailLink.substring(0, lastEqualsIndex) + '=w400';
    console.log("Modified:", modified);
    
    const r = await fetch(modified);
    console.log("Fetch modified status:", r.status);
    
    const orig = await fetch(img.thumbnailLink);
    console.log("Fetch original status:", orig.status);
  }
}
test();
