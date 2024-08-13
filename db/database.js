import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

const connectCallback = (err) => {
  if (err) {
    console.error("Connection error: ", err.message);
    return;
  }
  console.log("Connected to the app database.");
};
const DB = new sqlite.Database(
  "./app.db",
  sqlite3.OPEN_READWRITE,
  connectCallback
);

export const closeCallback = (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
};

export default DB;
