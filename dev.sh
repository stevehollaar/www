echo 'Running npm install...'
npm install

echo 'Setting key environment variables...'
sh ./set_keys.sh

echo 'Starting local dev server...'
NODE_ENV=development MONGO_URL=mongodb://localhost/www node --harmony server/app.js