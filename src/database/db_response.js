import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

const dbFilePath = path.resolve("./temp/database.db");
sqlite3.verbose();

// Check is database file exists, if not create it
if (!fs.existsSync(dbFilePath)) {
  const tempDir = path.dirname(dbFilePath);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  fs.writeFileSync(dbFilePath, "");
  initializeDatabase().catch((error) => {
    console.error("Error initializing database:", error);
    throw error;
  });
}
// Database initialization
async function initializeDatabase() {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS LoanData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE DEFAULT (date('now')),
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
// Create a new record in the database check if user exists in UserData table
async function createRecord(db, userDetails) {
  const { amount, lenderID, lenderName, borrowerID, borrowerName } =
    userDetails;

  try {
    await db.run(
      `INSERT INTO LoanData (date, amount, lenderID, lenderName, borrowerID, borrowerName) VALUES (date('now'), ?, ?, ?, ?, ?)`,
      [amount, lenderID, lenderName, borrowerID, borrowerName]
    );

    const userExists = await db.get(
      `SELECT 1 FROM UserData WHERE borrowerID = ? AND borrowerName = ?`,
      [borrowerID, borrowerName]
    );

    if (userExists) {
      await db.run(
        `UPDATE UserData SET amount = amount + ? WHERE borrowerID = ? AND borrowerName = ?`,
        [amount, borrowerID, borrowerName]
      );
    } else {
      await db.run(
        `INSERT INTO UserData (borrowerID, borrowerName, amount) VALUES (?, ?, ?)`,
        [borrowerID, borrowerName, amount]
      );
    }
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
}

// Read records from the database based on the user details
async function readRecords(db, userDetails) {
  let baseQuery = `
    SELECT 
      LD.id, 
      LD.date,
      LD.amount, 
      LD.lenderID, 
      LD.lenderName, 
      LD.borrowerID, 
      LD.borrowerName, 
      UD.amount as balance
    FROM 
      LoanData as LD
    LEFT JOIN 
      UserData as UD 
    ON 
      LD.borrowerID = UD.borrowerID
    WHERE 
      LD.borrowerID = ?
    
  `;
  const params = [userDetails.borrowerID];
  if (userDetails.lenderID) {
    baseQuery += ` AND LD.lenderID = ?`;
    params.push(userDetails.lenderID);
  }

  baseQuery += `ORDER BY LD.id DESC`;

  try {
    const records = await db.all(baseQuery, params);
    return records;
  } catch (error) {
    console.error("Error reading records:", error);
    throw error;
  }
}

// Delete a record from the database and update the user balance
async function deleteRecord(db, userDetails) {
  const { date, lenderID, borrowerID, amount, borrowerName } = userDetails;
  // When Paying Lender Becomes Borrower because lender is the user who is ussuing the command
  try {
    const deleteQuery = date
      ? `DELETE FROM LoanData WHERE lenderID = ? AND borrowerID = ? AND amount = ? AND date = ?`
      : `DELETE FROM LoanData WHERE lenderID = ? AND borrowerID = ? AND amount = ?`;

    const deleteParams = date
      ? [
          lenderID,
          borrowerID,
          amount,
          new Date(date).toISOString().split("T")[0],
        ]
      : [lenderID, borrowerID, amount];

    await db.run(deleteQuery, deleteParams);

    await db.run(
      `UPDATE UserData SET amount = amount - ? WHERE borrowerID = ? AND borrowerName = ?`,
      [amount, lenderID, borrowerName]
    );
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
}

// Handle all database operations
export async function manageRecords(purpose, userDetails) {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    let result;
    switch (purpose) {
      case "read":
        result = await readRecords(db, userDetails);
        return result.length ? result : "No records found";
      case "create":
        await createRecord(db, userDetails);
        result = "Record created successfully";
        break;
      case "delete":
        await deleteRecord(db, userDetails);
        result = "Record deleted successfully";
        break;
      default:
        throw new Error("Invalid purpose");
    }
    return result;
  } catch (error) {
    console.error(`Error managing records for purpose ${purpose}:`, error);
    throw error;
  } finally {
    await db.close();
  }
}
