import googleDrive from "../../../src/apiTools/googleDrive";

export default async function handler({ method, query, body }, res) {
  if (method === 'POST') {
    console.log(body)
    return new Promise((resolve, reject) => {
      googleDrive.files.update({
        fileId: body.id,
        resource: {
          properties: body.properties,
        },
        fields: 'id, properties',
      })
        .then(() => {
          res.status(200).json('Success');
          resolve('Success')
        })
        .catch(reject);
    });

  } else {
    return new Promise(resolve => {
      const fields = [
        'id',
        'name',
        'mimeType',
        'webContentLink',
        'webViewLink',
        'iconLink',
        'hasThumbnail',
        'thumbnailLink',
        'createdTime',
        'originalFilename',
        'fullFileExtension',
        'size',
        'videoMediaMetadata',
        'properties',
        'appProperties',
      ];
      googleDrive.files.get({
        fields: `${fields}`,
        fileId: query.id,
      }, (error, driveResponse) => {
        if (error) {
          throw 'The API returned an error: ' + error;
        }

        const mimeTypeKeepers = [
          'video/mp4',
          'text/plain',
          //   'application/vnd.google-apps.folder'
        ];

        console.log(driveResponse.data);
        res.status(200).json(driveResponse.data);
        resolve(driveResponse.data);
      });
    });

    // const movieIdNumber = parseInt(movieId, 10);
    // res.status(200).json(movies.find(movie => movie.id === movieIdNumber));
  }
};
