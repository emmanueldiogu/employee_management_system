import DB, { closeCallback } from "../db/database.js";
import bcryptjs from "bcryptjs";

// SQL queries
let users = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT
    )`;

// users table
DB.run(users, [], (err) => {
  if (err) console.error("Error creating user table");
  console.log("User table created or already exist");
  return;
});

const getUsers = async () => {
  const sql = `SELECT * FROM users ORDER BY id DESC`;
  try {
    const rows = await new Promise((resolve, reject) => {
      DB.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
    process.on("exit", () => {
      DB.close(closeCallback);
    });
    return rows;
  } catch (err) {
    console.error(err.message);
    throw err; // rethrow the error to be handled by the caller
  }
};

const getUser = async (user_id) => {
  const sql = `SELECT * FROM users WHERE id = ? `;
  try {
    const row = await new Promise((resolve, reject) => {
      DB.all(sql, [user_id], (err, row) => {
        if (err) {
          throw reject(err); // let the catch handle it
        }
        resolve(row);
      });
    });
    process.on("exit", () => {
      DB.close(closeCallback);
    });
    return row;
  } catch (err) {
    console.error(err.message);
    return;
  }
};

const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ? `;
  try {
    const rows = await new Promise((resolve, reject) => {
      DB.all(sql, [email], (err, rows) => {
        if (err) {
          throw reject({ status: 409, error: "Invalid email or password" }); // let the catch handle it
        }
        resolve(rows);
      });
    });
    process.on("exit", () => {
      DB.close(closeCallback);
    });
    return rows;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const createUser = async (user) => {
  const { name, email, password } = user;
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser.length > 0) {
      throw { error: "Email already exists" };
    }
    await new Promise((resolve, reject) => {
      DB.run(sql, [name, email, password], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
    process.on("exit", () => {
      DB.close(closeCallback);
    });
  } catch (err) {
    throw err;
  }
};

const updateUser = async (user_id, user) => {
  const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  try {
    await new Promise((resolve, reject) => {
      DB.run(sql, [user.name, user.email, user.password, user_id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    process.on("exit", () => {
      process.on("exit", () => {
        DB.close(closeCallback);
      });
    });
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const deleteUser = async (user_id) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  try {
    await new Promise((resolve, reject) => {
      DB.run(sql, [user_id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    process.on("exit", () => {
      process.on("exit", () => {
        DB.close(closeCallback);
      });
    });
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const getUserCount = async () => {
  const sql = `SELECT COUNT(*) AS count FROM users`;
  try {
    const count = await new Promise((resolve, reject) => {
      DB.get(sql, [], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row.count);
      });
    });
    process.on("exit", () => {
      DB.close(closeCallback);
    });
    return count;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserCount,
};
