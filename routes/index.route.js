import express from "express";
import { createUser, getUsers } from "../models/user.model.js";
import { login, logout, register } from "../controllers/auth.controller.js";
import { checkNotAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const viewData = {
      page: "employees",
    };
    res.render("index", viewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  const viewData = {
    page: "login",
    title: "Login",
  };
  res.render("login", viewData);
});

router.get("/register", checkNotAuthenticated, (req, res) => {
  const viewData = {
    page: "register",
    title: "Register",
  };
  res.render("register", viewData);
});

router.post("/login", checkNotAuthenticated, login);
router.post("/register", checkNotAuthenticated, register);

router.post("/add", (req, res) => {
  const user = createUser({
    name: "admin",
    email: "admin@example.com",
    password: "P@$$word",
  });
  res.send(user);
});

// Logout route
router.get("/logout", logout);

export default router;
