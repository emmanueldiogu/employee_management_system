import express from "express";
import {
  add_employee,
  employee,
  employees,
  post_employee,
} from "../controllers/employees.controller.js";
import { departments } from "../controllers/departments.controller.js";
import { getEmployeeCount } from "../models/employee.model.js";
import { getDepartmentCount } from "../models/department.model.js";
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

router.get("/employees", employees);

router.get("/employees/update/:id", employee);

router.get("/employees/add", add_employee);

router.post("/employees/add", post_employee);

router.get("/departments", departments);

export default router;
