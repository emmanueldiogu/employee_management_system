import DB, { closeCallback } from "../db/database.js";
import multer from "multer";

const upload = multer({ dest: "public/uploads/" });

let employees = `CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    department TEXT,
    photo TEXT
    )`;

// Create Required tables

DB.run(employees, [], (err) => {
  if (err) console.error("Error creating employee table");
  console.log("Employee table created or already exist");
  return;
});

const getEmployees = async () => {
  const sql = `SELECT * FROM employees ORDER BY id DESC`;
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

const getEmployee = async (employee_id) => {
  const sql = `SELECT * FROM employees WHERE id = ? `;
  try {
    const row = await new Promise((resolve, reject) => {
      DB.all(sql, [employee_id], (err, row) => {
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

const addEmployee = async (employee) => {
  const { firstname, lastname, email, phone, department } = employee;
  const sql = `INSERT INTO employees (firstname, lastname, email, phone, department) VALUES (?, ?, ?, ?, ?)`;
  try {
    DB.run(
      sql,
      [firstname, lastname, email, phone, department],
      function (row, err) {
        if (err) throw err;
        const newID = this.lastID;
        console.log(`Employee saved to ${newID}`);
        return row;
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

const updateEmployee = async (employee_id, employee) => {
  /**
   * Destructure employee object passed form req.body
   */
  const { firstname, lastname, email, phone, department } = employee;

  /**
   * Initialize empty arrays to hold values
   */
  let updateList = [];
  let updateValue = [];

  /**
   * Check the values in the employee object
   * If a value exist, push key into the updateList
   * and push the value ino the updateValue
   */
  if (firstname) {
    updateList.push("firstname = ?");
    updateValue.push(firstname);
  }
  if (lastname) {
    updateList.push("lastname = ?");
    updateValue.push(lastname);
  }
  if (email) {
    updateList.push("email = ?");
    updateValue.push(email);
  }
  if (phone) {
    updateList.push("phone = ?");
    updateValue.push(phone);
  }
  if (department) {
    updateList.push("department = ?");
    updateValue.push(department);
  }

  if (!updateList.length === 0 || !updateValue === 0) {
    throw { error: "Empty List" };
  }

  /**
   * Append employee ID to the values
   */
  updateValue.push(employee_id);

  /**
   * Update SQL Query
   */
  const sql = `UPDATE employees SET ${updateList.join(", ")} WHERE id = ?`;
  try {
    const row = await new Promise((resolve, reject) => {
      DB.run(sql, [updateValue], (err, row) => {
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

const deleteEmployee = async (employee_id) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  try {
    await new Promise((resolve, reject) => {
      DB.run(sql, [employee_id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
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

const getEmployeeCount = async () => {
  const sql = `SELECT COUNT(*) AS count FROM employees`;
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
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount,
};
