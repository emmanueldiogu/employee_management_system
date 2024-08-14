import {
  addDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "../models/department.model.js";

const departments = async (req, res) => {
  try {
    const departments = await getDepartments();
    const viewData = {
      page: "departments",
      title: "Department",
      user: req.session.user,
      departments,
    };
    res.render("admin/departments/index", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

const add_department = async (req, res) => {
  // Render add department page
  const departments = await getDepartments();

  const viewData = {
    title: "Add Department",
    page: "departments",
    user: req.session.user,
    departments,
  };
  res.render("admin/departments/add", viewData);
};

const post_add_department = async (req, res) => {
  // submit department form
  try {
    await addDepartment(req.body);
    req.flash("success", "Department Added Successfully!");
    res.redirect("/admin/departments");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Server error, please try again!");
    res.redirect(req.get("referer"));
  }
};

const update_department = async (req, res) => {
  // Render update department page
  const id = req.params.id;
  const department = await getDepartment(id);

  const viewData = {
    title: "Update Department",
    page: "departments",
    user: req.session.user,
    department: department[0],
  };
  res.render("admin/departments/update", viewData);
};

const post_update_department = async (req, res) => {
  // submit update department form
  const id = req.params.id;
  try {
    await updateDepartment(id, req.body);
    req.flash("success", "Department Updated Successfully!");
    res.redirect("/admin/departments");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Server error, please try again!");
    res.redirect(req.get("referer"));
  }
};

const post_delete_department = async (req, res) => {
  // submit update department form
  const id = req.params.id;
  try {
    await deleteDepartment(id);
    req.flash("success", "Department Deleted Successfully!");
    res.redirect("/admin/departments");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Server error, please try again!");
    res.redirect(req.get("referer"));
  }
};

export {
  add_department,
  departments,
  post_add_department,
  post_delete_department,
  post_update_department,
  update_department,
};
