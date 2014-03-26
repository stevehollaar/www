echo 'Running npm install...'
npm install

if [ -a ./set_keys.sh ]
    then
        echo 'Setting key environment variables...'
        source ./set_keys.sh
    else
        echo 'No "set_keys.sh" file found'
fi

echo 'Starting local dev server...'
NODE_ENV=development MONGO_URL=mongodb://localhost/www node --harmony server/app.js