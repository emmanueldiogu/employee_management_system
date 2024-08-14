import { getUsers } from "../models/user.model.js";

const users = async (req, res) => {
  // Render employee
  try {
    const users = await getUsers();
    const viewData = {
      title: "Users",
      page: "users",
      user: req.session.user,
      users,
    };
    res.render("admin/users", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};

export { users };
