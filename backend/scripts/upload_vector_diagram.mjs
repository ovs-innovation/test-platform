import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

async function upload() {
  const filePath = './backend/scripts/q142_diagram.png';
  console.log('Uploading q142_diagram.png to Cloudinary...');
  const res = await cloudinary.uploader.upload(filePath, {
    folder: 'edvedum_mathematics/vector_algebra',
    public_id: 'q142_hall_cube_diagram',
    overwrite: true,
    resource_type: 'image'
  });
  console.log('Uploaded secure_url:', res.secure_url);
  fs.writeFileSync('./backend/scripts/vector_diagram_urls.json', JSON.stringify({ 142: res.secure_url }, null, 2));
}

upload().catch(console.error);

