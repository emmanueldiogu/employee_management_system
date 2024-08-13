import { getDepartments } from "../models/department.model.js";

const departments = async (req, res) => {
  try {
    const departments = await getDepartments();
    const viewData = {
      page: "departments",
      title: "Department",
      user: req.session.user,
      departments,
    };
    res.render("departments", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

export { departments };
