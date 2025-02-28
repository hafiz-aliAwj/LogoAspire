import {google} from 'googleapis'
import readline from 'readline'
import open from 'open'

const CLIENT_ID = "858971027923-vkukdco1uahocpe9bn8hkgebc3g31ujf.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export function getAccessToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);
  open(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from the page: ", (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error("Error retrieving access token", err);
        return;
      }
      console.log("Refresh Token:", token.refresh_token);
    });
  });
}


