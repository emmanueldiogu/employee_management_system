import { getDepartments } from "../models/department.model.js";
import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  searchEmployees,
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

const add_employee = async (req, res) => {
  // Render add employee page
  const departments = await getDepartments();

  const viewData = {
    title: "Add Employee",
    page: "employees",
    user: req.session.user,
    departments,
  };
  res.render("admin/employees/add", viewData);
};

const post_add_employee = async (req, res) => {
  // submit employee form
  try {
    await addEmployee(req.body);
    req.flash("success", "Employee Added Successfully!");
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Server error, please try again!");
    res.redirect(req.get("referer"));
  }
};

const update_employee = async (req, res) => {
  // Render update employee page
  const id = req.params.id;
  const employee = await getEmployee(id);
  const departments = await getDepartments();

  const viewData = {
    title: "Update Employee",
    page: "employees",
    user: req.session.user,
    employee: employee[0],
    departments,
  };
  res.render("admin/employees/update", viewData);
};

const post_update_employee = async (req, res) => {
  // submit update employee form
  const id = req.params.id;
  try {
    await updateEmployee(id, req.body);
    req.flash("success", "Employee Updated Successfully!");
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Server error, please try again!");
    res.redirect(req.get("referer"));
  }
};

const post_delete_employee = async (req, res) => {
  // submit update employee form
  const id = req.body.deleteId;
  try {
    await deleteEmployee(id);
    req.flash("success", "Employee Deleted Successfully!");
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Server error, please try again!");
    res.redirect(req.get("referer"));
  }
};

const search_employees = async (req, res) => {
  const query = req.query.query;
  try {
    const employees = await searchEmployees(query);
    const viewData = {
      title: "Employees",
      page: "employees",
      user: req.session.user,
      employees,
    };
    res.render("admin/employees/search", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

export {
  add_employee,
  employee,
  employees,
  post_add_employee,
  post_delete_employee,
  post_update_employee,
  search_employees,
  update_employee,
};
