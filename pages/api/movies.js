import googleDrive from '../../src/apiTools/googleDrive';

export default function handler(req, res) {

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
        'videoMediaMetadata'
    ];
    googleDrive.files.list({
        fields: `files(${fields})`,
        orderBy: 'createdTime desc',
    }, (error, driveResponse) => {
        if (error) {
            throw 'The API returned an error: ' + error;
        }

        const mimeTypeKeepers = [
            'video/mp4',
            'text/plain',
            //   'application/vnd.google-apps.folder'
        ];

        res.status(200).json(
            (driveResponse.data.files || [])
                .filter(movie => mimeTypeKeepers.includes(movie.mimeType))
        );
    });
}
/*
{
  kind: 'drive#file',
  id: '1iFYdcmVz6B3QDTYC34f3Ve2I3itQKByp',
  name: 'Google Serverless Cloud Native Web Development Guild (2021-07-28 at 12:13 GMT-7)',
  mimeType: 'video/mp4',
  starred: false,
  trashed: false,
  explicitlyTrashed: false,
  parents: [
    '0B1HpjuNZSMFnfk16eHVvRWRIVktYNlMwRlVJU1dIZHQ1VTROWXh3ODBPSmh3VkdqMEVoZFU'
  ],
  spaces: [ 'drive' ],
  version: '7',
  webContentLink: 'https://drive.google.com/uc?id=1iFYdcmVz6B3QDTYC34f3Ve2I3itQKByp&export=download',
  webViewLink: 'https://drive.google.com/file/d/1iFYdcmVz6B3QDTYC34f3Ve2I3itQKByp/view?usp=drivesdk',
  iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/video/mp4',
  hasThumbnail: true,
  thumbnailLink: 'https://lh3.googleusercontent.com/VL9pg_XMOgJsvbT5VpvfKmoFtG2tIWoVQwrpAg3FjbulY2ihjTEKb2obWT1ErWPGrmGFXiSmNZGGz1c=s220',
  thumbnailVersion: '1',
  viewedByMe: false,
  createdTime: '2021-07-28T20:15:36.375Z',
  modifiedTime: '2021-07-28T20:15:38.874Z',
  modifiedByMe: false,
  owners: [
    {
      kind: 'drive#user',
      displayName: 'Austin Haws',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjkMK4Lm8JJqHLaaZKS-nd6MsoCieXFuOsAnBKnOQ=s64',
      me: false,
      permissionId: '15451908614380926786',
      emailAddress: 'ahaws@utah.gov'
    }
  ],
  lastModifyingUser: {
    kind: 'drive#user',
    displayName: 'Austin Haws',
    photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjkMK4Lm8JJqHLaaZKS-nd6MsoCieXFuOsAnBKnOQ=s64',
    me: false,
    permissionId: '15451908614380926786',
    emailAddress: 'ahaws@utah.gov'
  },
  shared: true,
  ownedByMe: false,
  capabilities: {
    canAddChildren: false,
    canAddMyDriveParent: false,
    canChangeCopyRequiresWriterPermission: false,
    canChangeSecurityUpdateEnabled: false,
    canChangeViewersCanCopyContent: false,
    canComment: true,
    canCopy: true,
    canDelete: false,
    canDownload: true,
    canEdit: true,
    canListChildren: false,
    canModifyContent: true,
    canMoveChildrenWithinDrive: false,
    canMoveItemIntoTeamDrive: false,
    canMoveItemOutOfDrive: false,
    canMoveItemWithinDrive: true,
    canReadRevisions: true,
    canRemoveChildren: false,
    canRemoveMyDriveParent: true,
    canRename: true,
    canShare: true,
    canTrash: false,
    canUntrash: false
  },
  viewersCanCopyContent: false,
  copyRequiresWriterPermission: true,
  writersCanShare: true,
  permissions: [
    {
      kind: 'drive#permission',
      id: '12389626598898560627',
      type: 'user',
      emailAddress: 'react-guild-recordings@ut-dts-fantasy-bracket-at.iam.gserviceaccount.com',
      role: 'writer',
      displayName: 'react-guild-recordings@ut-dts-fantasy-bracket-at.iam.gserviceaccount.com',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '08683944144435591471',
      type: 'user',
      emailAddress: 'bemeibos@utah.gov',
      role: 'writer',
      displayName: 'Ben Meibos',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjgBNMLd7s_qtNZgvHfv0ixMo0_E4ba0nlO-uUa=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '07939118792444215535',
      type: 'user',
      emailAddress: 'mblake@utah.gov',
      role: 'reader',
      displayName: 'Mike Blake',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjQJ1yF-wr38joHXgsTeTpnb2XitA17q8epUm2D=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '11769785504316121052',
      type: 'user',
      emailAddress: 'ggerber@utah.gov',
      role: 'reader',
      displayName: 'Gary Gerber',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gj_yq493q_p01wZK-hXEnyuz2IGcMQ3sytwZsJalw=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '06488845272860477724',
      type: 'user',
      emailAddress: 'fteklemedhin@utah.gov',
      role: 'reader',
      displayName: 'Fifi Teklemedhin',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '02372792403520608748',
      type: 'user',
      emailAddress: 'bbills@utah.gov',
      role: 'reader',
      displayName: 'Byron Bills',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Ghfa5pf4mJj7Y1wLAe7KQTNdjxhr1WlWNxCSM4B=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '15933752310705642199',
      type: 'user',
      emailAddress: 'mreinicke@utah.gov',
      role: 'reader',
      displayName: 'Mike Reinicke',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '16467237436055863022',
      type: 'user',
      emailAddress: 'kwalker@utah.gov',
      role: 'reader',
      displayName: 'Keaton Walker',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjVZuu37tK0o5Ar3FZfIJr13ec0mIcqiuwZXPxJsQ=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '12161207442659853650',
      type: 'user',
      emailAddress: 'jumiller@utah.gov',
      role: 'reader',
      displayName: 'Justin Miller',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gh8FLmgyIRjuAeE1C4RlsOUZK1dnE2tgtw5NwSFmA=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '17110317324837552038',
      type: 'user',
      emailAddress: 'chwardle@utah.gov',
      role: 'reader',
      displayName: 'Casey Wardle',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '08458375017644565980',
      type: 'user',
      emailAddress: 'alexnielson@utah.gov',
      role: 'reader',
      displayName: 'Alex Nielson',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '00109960766157081550',
      type: 'user',
      emailAddress: 'dpaske@utah.gov',
      role: 'reader',
      displayName: 'Daniel Paske',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '00085632194280221496',
      type: 'user',
      emailAddress: 'dbirch@utah.gov',
      role: 'reader',
      displayName: 'Daniella Birch',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gid69qEU6wMdQbKY5oZQ9p1tmF4OVPxizY895yj=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '16285583013751754953',
      type: 'user',
      emailAddress: 'toddvolkening@utah.gov',
      role: 'reader',
      displayName: 'Todd Volkening',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gg-9SG89oU17cw3_In-kDyD1-ADiKCUBcG_JpIu6Q=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '09554792044062385083',
      type: 'user',
      emailAddress: 'choover@utah.gov',
      role: 'reader',
      displayName: 'Clarke Hoover',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GhT06Yoq0jsdLaf3A1tz0QFz636fJwmCifzf1vV=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '04171135717552517252',
      type: 'user',
      emailAddress: 'sgourley@utah.gov',
      role: 'reader',
      displayName: 'Steve Gourley',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjP03oiDsHPuPDQ4w_j8sewnLzD62B_Xocobe0y0Q=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '13821505639342579746',
      type: 'user',
      emailAddress: 'ctomlinson@utah.gov',
      role: 'reader',
      displayName: 'Clifford Tomlinson',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gji5xySX40YP1x7vDAqdWIhKlwUj5qKJquA-bDAMg=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '04948737317920475841',
      type: 'user',
      emailAddress: 'ryant@utah.gov',
      role: 'reader',
      displayName: 'Ryan Thorstensen',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gigtl1qgdOaD2AIYOc80rzNuoGHsD2wPeYKGXXAOQ=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '15281102935147702763',
      type: 'user',
      emailAddress: 'rachelstone@utah.gov',
      role: 'reader',
      displayName: 'Rachel Stone',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GiwkXdjb_8o820qNQbZF2ACl1VnDwZAmchFQTfhEA=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '07677545805662112608',
      type: 'user',
      emailAddress: 'jmurtha@utah.gov',
      role: 'reader',
      displayName: 'Jim Murtha',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GhyjVPjHGNYA1KBBde_kO_neCaXwmb0GcUGF4gK=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '18154444273201384455',
      type: 'user',
      emailAddress: 'lotteson@utah.gov',
      role: 'reader',
      displayName: 'Lynn Otteson',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '10493508195831203883',
      type: 'user',
      emailAddress: 'jfoster@utah.gov',
      role: 'reader',
      displayName: 'Jonathan Foster',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gjy8LM4IyUemAGD3v4S9RgWHgSSq8AqwkdwWIETQw=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '13356066318123684531',
      type: 'user',
      emailAddress: 'jjohnson2@utah.gov',
      role: 'reader',
      displayName: 'Justin Johnson',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gif1131ajuDuTXFKW4K8fNF-aMNj6Ps9Fqx-2r_DA=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '05196730906258274114',
      type: 'user',
      emailAddress: 'cmichaud@utah.gov',
      role: 'reader',
      displayName: 'Christopher Michaud',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GhasmqQQuFetqsFi-aSxh-xZSJ4DJKiGQpPPwufEA=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '17078834819025177111',
      type: 'user',
      emailAddress: 'garyray@utah.gov',
      role: 'reader',
      displayName: 'Gary Ray',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gif3oo_o5eHPqpYB8avf1C0yrE9cMiU3J3dnIcp=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '02240790118484287982',
      type: 'user',
      emailAddress: 'buckehler@utah.gov',
      role: 'reader',
      displayName: 'Buck Ehler',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GiPXFtAbgXZcRdFnVNCKRF9W7dvekl3hqg7kA2uyQ=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '16616865962586966699',
      type: 'user',
      emailAddress: 'shondas@utah.gov',
      role: 'reader',
      displayName: 'Proshonjit Das',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '07150800196509613194',
      type: 'user',
      emailAddress: 'tyburton@utah.gov',
      role: 'reader',
      displayName: 'Ty Burton',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gg_QDxCYLqAFGMkr55IuoORR347v8BM55qtBep7Xw=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '16003995165853511863',
      type: 'user',
      emailAddress: 'mverucchi@utah.gov',
      role: 'reader',
      displayName: 'Michelle Verucchi',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GhF9a9n5kvBiB17Zbwkpl96WjJ18gWioNJUNyJQdw=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '15628301553747007364',
      type: 'user',
      emailAddress: 'lizmoore@utah.gov',
      role: 'reader',
      displayName: 'Liz Moore',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gj8XptPahN3isTf2NXYD8-1kHWBZChRetHE2F_L5w=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '16650036690167243877',
      type: 'user',
      emailAddress: 'gheath@utah.gov',
      role: 'reader',
      displayName: 'Grant Heath',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '08741125090944510895',
      type: 'user',
      emailAddress: 'adalisay@utah.gov',
      role: 'reader',
      displayName: 'Angelo Dalisay',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '10692461408185565922',
      type: 'user',
      emailAddress: 'pmilyavskiy@utah.gov',
      role: 'reader',
      displayName: 'Pavel Milyavskiy',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gj4lzVkpkieY-xccg5X2v8YIEUofUjyZgo12tkw=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '06683422997569310689',
      type: 'user',
      emailAddress: 'jshapiro@utah.gov',
      role: 'reader',
      displayName: 'Jessie Shapiro',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GhxN90wyveoTd6_8LQQYCJZ1hsWYoCEoFMvOeUf=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '03064166339862927072',
      type: 'user',
      emailAddress: 'jmsharp@utah.gov',
      role: 'reader',
      displayName: 'Joseph Sharp',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14Gg6wsb4_nDe0GoI7n8PTPLy3veQ8Eia4vEH7xfr2g=s64',
      deleted: false
    },
    {
      kind: 'drive#permission',
      id: '15451908614380926786',
      type: 'user',
      emailAddress: 'ahaws@utah.gov',
      role: 'owner',
      displayName: 'Austin Haws',
      photoLink: 'https://lh3.googleusercontent.com/a-/AOh14GjkMK4Lm8JJqHLaaZKS-nd6MsoCieXFuOsAnBKnOQ=s64',
      deleted: false
    }
  ],
  permissionIds: [
    '12389626598898560627', '08683944144435591471',
    '07939118792444215535', '11769785504316121052',
    '06488845272860477724', '02372792403520608748',
    '15933752310705642199', '16467237436055863022',
    '12161207442659853650', '17110317324837552038',
    '08458375017644565980', '00109960766157081550',
    '00085632194280221496', '16285583013751754953',
    '09554792044062385083', '04171135717552517252',
    '13821505639342579746', '04948737317920475841',
    '15281102935147702763', '07677545805662112608',
    '18154444273201384455', '10493508195831203883',
    '13356066318123684531', '05196730906258274114',
    '17078834819025177111', '02240790118484287982',
    '16616865962586966699', '07150800196509613194',
    '16003995165853511863', '15628301553747007364',
    '16650036690167243877', '08741125090944510895',
    '10692461408185565922', '06683422997569310689',
    '03064166339862927072', '15451908614380926786'
  ],
  originalFilename: 'Google Serverless Cloud Native Web Development Guild (2021-07-28 at 12:13 GMT-7).mp4',
  fullFileExtension: 'mp4',
  fileExtension: '',
  md5Checksum: 'aec18d6f8cfe2ebfbc12a52d5f797580',
  size: '243897737',
  quotaBytesUsed: '243897737',
  headRevisionId: '0B1HpjuNZSMFnR1Q3VUs2QVIraSsyVkI5YWhvNXQ0Zk40ZjM0PQ',
  videoMediaMetadata: { width: 1280, height: 720, durationMillis: '2757749' },
  isAppAuthorized: false,
  linkShareMetadata: { securityUpdateEligible: false, securityUpdateEnabled: false }
  */