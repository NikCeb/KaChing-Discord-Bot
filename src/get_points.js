import admin from "firebase-admin";
import { readFileSync } from "fs";
const serviceAccount = JSON.parse(
  readFileSync("./serviceConnection.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("Firebase connected");
