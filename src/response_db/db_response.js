import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";
import { CommandInteraction } from "discord.js";
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
    CREATE TABLE IF NOT EXISTS tbl (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      col TEXT NOT NULL
    );
  `);

  await db.close();
}

initializeDatabase();

async function createRecord(db, value) {
  await db.run(`INSERT INTO tbl (col) VALUES ("${value}")`);
}

async function readRecords(db) {
  return await db.all("SELECT col FROM tbl");
}

async function deleteRecord(db, value) {
  await db.exec(`DELETE FROM tbl WHERE col = "${value}"`);
}

export async function manageRecords(purpose, value = null, userID = null) {
  const db = await open({
    filename: "./temp/database.db",
    driver: sqlite3.Database,
  });

  if (purpose === "read") {
    const records = await readRecords(db);
    console.log(records);
    await db.close();
    return records;
  }

  //   await createRecord(db, "exampleValue");

  //   await updateRecord(db, "exampleValue", "newValue");
  //   await deleteRecord(db, "newValue");
}
