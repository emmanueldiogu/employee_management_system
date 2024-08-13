import { addEmployee, getEmployees } from "../models/employee.model.js";

const employees = async (req, res) => {
  try {
    const employees = await getEmployees();
    const viewData = {
      page: "employees",
      user: req.session.user,
      employees,
    };
    res.render("admin/employees", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

const employee = async (req, res) => {
  const viewData = {
    page: "employees",
    user: req.session.user,
  };
  res.render("admin/update_employee", viewData);
};

const add_employee = (req, res) => {
  const viewData = {
    page: "employees",
    user: req.session.user,
  };
  res.render("admin/add_employee", viewData);
};

const post_employee = (req, res) => {
  const employee = addUser({
    name: "admin",
    email: "admin@example.com",
    password: "P@$$word",
  });
  res.send(employee);
};

export { employees, employee, add_employee, post_employee };
