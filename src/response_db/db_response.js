import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
const dbFilePath = path.resolve("./temp/database.db");
sqlite3.verbose();

if (!fs.existsSync(dbFilePath)) {
  const tempDir = path.dirname(dbFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  fs.writeFileSync(dbFilePath, "");
}

async function initializeDatabase() {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS LoanData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      lenderID TEXT NOT NULL,
      lenderName TEXT NOT NULL,
      borrowerID TEXT NOT NULL,
      borrowerName TEXT NOT NULL
    );
  `);

  await db.close();
}

initializeDatabase();

async function createRecord(db, userDetails) {
  await db.run(`INSERT INTO LoanData (amount,lenderID,lenderName,borrowerID,borrowerName) VALUES
     ("${
       (value,
       userDetails.lenderID,
       userDetails.lenderName,
       userDetails.borrowerID,
       userDetails.borrowerName)
     }")`);
}

async function readRecords(db, userDetails) {
  const records = await db.all(
    `SELECT amount, lenderID, lenderName, borrowerID, borrowerName FROM LoanData 
    WHERE borrowerID = '${userDetails.borrowerID}' AND lenderID = '${userDetails.lenderID}'`
  );
  return records;
}

async function deleteRecord(db, userDetails) {
  await db.exec(`DELETE FROM LoanData WHERE lenderID = "${userDetails.lenderID}"
     AND borrowerID = "${userDetails.borrowerID}" AND amount = "${userDetails.amount}"`);
}

export async function manageRecords(purpose, userDetails) {
  const db = await open({
    filename: "./temp/database.db",
    driver: sqlite3.Database,
  });

  if (purpose === "read") {
    const records = await readRecords(db, userDetails);
    await db.close();
    if (records.length === 0) {
      return "No records found";
    } else {
      return records;
    }
  } else if (purpose === "create") {
    await createRecord(db, userDetails);
    await db.close();
    return "Record created successfully";
  } else if (purpose === "delete") {
    await deleteRecord(db, userDetails);
    await db.close();
    return "Record deleted successfully";
  }
}
