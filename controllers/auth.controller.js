import { createUser, getUserByEmail } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }

    const isMatch = bcryptjs.compareSync(password, user[0].password);

    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }
    // Remove password from user object
    const { password: userPassword, ...userWithoutPassword } = user[0];
    req.session.user = userWithoutPassword;

    req.flash("success", "Logged in successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    req.flash("error", "Server error");
    res.redirect("/login");
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await createUser({ name, email, password: hashedPassword });
    console.log("Register controller", user);

    req.flash("success", "User registered successfully. Login to your account");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", `${err.error ?? "Server error, try again later!!!"} `);
    res.redirect("/register");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      req.flash("error", "Failed to log out");
      return res.redirect("/admin/dashboard");
    }
    res.redirect("/");
  });
};

export { login, register, logout };
