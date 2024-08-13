import { addEmployee, getEmployee, getEmployees } from "../models/employee.model.js";


const employees_controller = async (req, res) => {
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

const employee_controller = async (req, res) => {
  // Render update single employee
  const id = req.param('id');
  await getEmployee(id);

  const viewData = {
    title: "Employee",
    page: "employees",
    user: req.session.user,
  };
  res.render("admin/employees/update", viewData);
};

const add_employee_controller = (req, res) => {
  // Render add employee page
  
  const viewData = {
    title: "Add Employee",
    page: "employees",
    user: req.session.user,
  };
  res.render("admin/employees/add", viewData);
};



const post_employee_controller = (req, res) => {
  // submit employee form
};

export { employees_controller as employees, employee_controller as employee, add_employee_controller as add_employee, post_employee_controller as post_employee };
