const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

export default function handler(req, res) {


    const auth = new google.auth.GoogleAuth({
        keyFile: '/Users/austinhaws/htdocs/dts/react-guild/react-guild-movies/react-guild-recordings | ut-dts-fantasy-bracket-at-0d5f47b26592.json',
        scopes: [
            'https://www.googleapis.com/auth/drive.metadata',
            'https://www.googleapis.com/auth/drive.readonly',
        ],
    });

    const drive = google.drive({ version: 'v3', auth });
    drive.files.list({
        fields: 'files(id, name, mimeType, webContentLink, webViewLink, hasThumbnail, thumbnailLink, createdTime, )',
    }, (error, driveResponse) => {
        if (error) {
            throw 'The API returned an error: ' + error;
        }
        console.log(driveResponse.data.files[0]);
        res.status(200).json((driveResponse.data.files || []).map(file => ({ id: file.id, title: file.name })));
    });
}
