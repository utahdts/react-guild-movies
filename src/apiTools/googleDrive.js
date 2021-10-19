const fs = require('fs');
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: '/Users/austinhaws/htdocs/dts/react-guild/react-guild-movies/react-guild-recordings | ut-dts-fantasy-bracket-at-0d5f47b26592.json',
    scopes: [
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.readonly',
    ],
});

export default google.drive({ version: 'v3', auth });
