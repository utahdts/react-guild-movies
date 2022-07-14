import { google } from "googleapis";
import type { Auth, drive_v3 } from "googleapis";

let drive: drive_v3.Drive;

try {
  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    // keyFile: '/Users/austinhaws/htdocs/dts/react-guild/react-guild-movies/react-guild-recordings | ut-dts-fantasy-bracket-at-0d5f47b26592.json',
    scopes: [
      "https://www.googleapis.com/auth/drive.metadata",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  drive = google.drive({ version: "v3", auth });
} catch (error) {
  console.error(error);
}

export default drive;
