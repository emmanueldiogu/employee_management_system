import express from "express";
import layout from "express-ejs-layouts";
import flash from "express-flash";
import session from "express-session";
import path from "path";
import { PORT } from "./config.js";
import { checkAuthenticated } from "./middleware/auth.middleware.js";
import adminRouter from "./routes/admin.route.js";
import indexRouter from "./routes/index.route.js";
const __dirname = import.meta.dirname;

const app = express();
app.use(layout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/admin_layout");

/**
 * Express configs
 */
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for Bootstrap and Bootstrap Icons
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join("node_modules/bootstrap/dist/"))
);
app.use(
  "/bootstrap-icons-font",
  express.static(path.join("node_modules/bootstrap-icons/font/"))
);

// Routers
app.use(indexRouter);
app.use("/admin", checkAuthenticated, adminRouter);

// Test route
app.get("/test", (req, res) => {
  console.log("Index route hit");
  res.send("working");
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
