import DB, { closeCallback } from "../db/database.js";

const departments = `CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
    )`;

// Create Required tables
DB.run(departments, [], (err) => {
  if (err) console.error("Error creating department table");
  console.log("Department table created or already exist");
  return;
});

const getDepartments = async () => {
  const sql = `SELECT * FROM departments ORDER BY id DESC`;
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

const getDepartment = async (department_id) => {
  const sql = `SELECT * FROM departments WHERE id = ? `;
  try {
    const row = await new Promise((resolve, reject) => {
      DB.all(sql, [department_id], (err, row) => {
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

const addDepartment = async (department) => {
  const { name } = department;
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  try {
    DB.run(sql, [name], function (row, err) {
      if (err) throw err;
      const newID = this.lastID;
      console.log(`Department saved to ${newID}`);
      return row;
    });
  } catch (err) {
    console.error(err.message);
  }
};

const updateDepartment = async (department_id, department) => {
  /**
   * Destructure department object passed form req.body
   */
  const { name } = department;

  /**
   * Update SQL Query
   */
  const sql = `UPDATE departments SET name = ? WHERE id = ?`;
  try {
    const row = await new Promise((resolve, reject) => {
      DB.run(sql, [name, department_id], (err, row) => {
        if (err) {
          return reject(err);
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

const deleteDepartment = async (department_id) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  try {
    await new Promise((resolve, reject) => {
      DB.run(sql, [department_id], (err, row) => {
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
    console.error(err.message);
    throw err;
  }
};

const getDepartmentCount = async () => {
  const sql = `SELECT COUNT(*) AS count FROM departments`;
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
  getDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentCount,
};
