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
      amount FLOAT NOT NULL,
      lenderID TEXT NOT NULL,
      lenderName TEXT NOT NULL,
      borrowerID TEXT NOT NULL,
      borrowerName TEXT NOT NULL
  )`);

  await db.exec(`
     CREATE TABLE IF NOT EXISTS UserData (
      borrowerID INTEGER,
      borrowerName TEXT NOT NULL,
      amount INTEGER NOT NULL,
      FOREIGN KEY (borrowerID) REFERENCES LoanData(borrowerID)
    )
  `);

  await db.close();
}

initializeDatabase();

async function createRecord(db, userDetails) {
  await db.run(
    `INSERT INTO LoanData (amount, lenderID, lenderName, borrowerID, borrowerName) VALUES (?, ?, ?, ?, ?)`,
    [
      userDetails.amount,
      userDetails.lenderID,
      userDetails.lenderName,
      userDetails.borrowerID,
      userDetails.borrowerName,
    ]
  );
  await db.run(
    `UPDATE UserData SET amount = ? WHERE borrowerID = ? AND borrowerName = ?`,
    [userDetails.amount, userDetails.borrowerID, userDetails.borrowerName]
  );
}

async function readRecords(db, userDetails) {
  let query = `SELECT LD.id, LD.amount, LD.lenderID, LD.lenderName, LD.borrowerID, LD.borrowerName, UD.amount as balance
              FROM LoanData as LD
              LEFT JOIN UserData as UD ON LD.borrowerID = UD.borrowerID
              WHERE borrowerID = ?`;
  let params = [userDetails.borrowerID];

  if (userDetails.lenderID) {
    query += ` AND lenderID = ?`;
    params.push(userDetails.lenderID);
  }

  const records = await db.all(query, params);
  return records;
}

async function deleteRecord(db, userDetails) {
  await db.run(
    `DELETE FROM LoanData WHERE lenderID = ? AND borrowerID = ? AND amount = ?`,
    [userDetails.lenderID, userDetails.borrowerID, userDetails.amount]
  );
  await db.run(
    `UPDATE UserData SET amount = amount - ? WHERE borrowerID = ? AND borrowerName = ?`,
    [userDetails.amount, userDetails.borrowerID, userDetails.borrowerName]
  );
}

export async function manageRecords(purpose, userDetails) {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  if (purpose === "read") {
    const records = await readRecords(db, userDetails);
    await db.close();
    if (!records) {
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
