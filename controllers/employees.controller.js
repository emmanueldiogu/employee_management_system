import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../models/employee.model.js";

const employees = async (req, res) => {
  // Render employee
  try {
    const employees = await getEmployees();
    const viewData = {
      title: "Employees",
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
  // Render update single employee
  const id = req.param("id");
  const employee = await getEmployee(id);

  const viewData = {
    title: "Employee",
    page: "employees",
    user: req.session.user,
    employee,
  };
  res.render("admin/employees/single", viewData);
};

const add_employee = (req, res) => {
  // Render add employee page

  const viewData = {
    title: "Add Employee",
    page: "employees",
    user: req.session.user,
  };
  res.render("admin/employees/add", viewData);
};

const post_add_employee = async (req, res) => {
  // submit employee form
  try {
    await addEmployee(req.body);
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

const update_employee = async (req, res) => {
  // Render update employee page
  const employee = await getEmployee(id);

  const viewData = {
    title: "Update Employee",
    page: "employees",
    user: req.session.user,
    employee,
  };
  res.render("admin/employees/update", viewData);
};

const post_update_employee = async (req, res) => {
  // submit update employee form
  const id = req.params.id;
  try {
    await updateEmployee(id, req.body);
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

const post_delete_employee = async (req, res) => {
  // submit update employee form
  const id = req.params.id;
  try {
    await deleteEmployee(id);
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

export {
  employees,
  employee,
  add_employee,
  post_add_employee,
  update_employee,
  post_update_employee,
  post_delete_employee,
};
