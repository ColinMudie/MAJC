// Requiring path to so we can use relative routes to our HTML files
// eslint-disable-next-line no-unused-vars
const path = require("path");
// const exphbs = require("express-handlebars");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members", { user: req.user });
    }
    console.log("send to signup");
    res.render("signup", { title: "Sign Up" });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members", { user: req.user, title: "Member" });
    }
    res.render("login", { title: "Login" });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members", { title: "Member" });
  });

  app.get("/game", isAuthenticated, (req, res) => {
    res.render("game", { title: "Game" });
  });
};
