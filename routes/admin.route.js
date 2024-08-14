import express from "express";
import {
  add_department,
  departments,
  post_add_department,
  post_update_department,
  update_department,
} from "../controllers/departments.controller.js";
import {
  add_employee,
  employee,
  employees,
  post_add_employee,
  post_delete_employee,
  post_update_employee,
  search_employees,
  update_employee,
} from "../controllers/employees.controller.js";
import { users } from "../controllers/users.controller.js";
import { getDepartmentCount } from "../models/department.model.js";
import { getEmployeeCount } from "../models/employee.model.js";
import { getUserCount } from "../models/user.model.js";
const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const employeesCount = await getEmployeeCount();
    const departmentsCount = await getDepartmentCount();
    const usersCount = await getUserCount();
    const viewData = {
      page: "dashboard",
      title: "Dashboard",
      user: req.session.user,
      employeesCount,
      departmentsCount,
      usersCount,
    };
    res.render("admin/dashboard", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/employees/add", add_employee);
router.post("/employees/add", post_add_employee);

router.get("/employees", employees);

router.get("/employee/:id", employee);

router.get("/employees/:id/update", update_employee);
router.post("/employees/:id/update", post_update_employee);
router.get("/employees/:id/delete", post_delete_employee);

router.get("/departments", departments);
router.get("/departments/add", add_department);
router.post("/departments/add", post_add_department);

router.get("/departments/:id/update", update_department);
router.post("/departments/:id/update", post_update_department);

router.get("/users", users);

router.get("/employees/search", search_employees);


export default router;
