const passport = require("passport"); 
const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken");
const httpStatus = require("http-status-codes")
const token = process.env.TOKEN || "recipeT0k3n";

    const getUserParams = (body) => {
      return {
        name: {
          first: body.first,
          last: body.last,
        },
        email: body.email,
        password: body.password,
        zipCode: body.zipCode,
      };
    };

module.exports = {
  apiAuthenticate: (req, res, next) => {
    console.log("apiAuth reached...");
    passport.authenticate("local", (errors, user) => {
      if (user) {
        let signedToken = jsonWebToken.sign(
          {
            data: user._id,
            exp: new Date().setDate(new Date().getDate() + 1),
          },
          "secret_encoding_passphrase",
        );
        res.json({
          success: true,
          token: signedToken,
        });
      } else
        res.json({
          success: false,
          message: "Could not authenticate user.",
        });
    })(req, res, next);
  },

  verifyToken: async (req, res, next) => {
    let token = req.query.apiToken;
    console.log(`TOKEN>>:: ${token}`);
    if (token) {
      try {
        console.log(`INVALID::token: ${token}`);
        const user = await User.findOne({ apiToken: token });
        console.log(`apiToken User: ${user}`);
        if (user) {
          console.log(`IF BLOCK apiToken User: ${user}`);
           next();
          }
        else next(new Error("ELSE BLOCK FIRST Invalid API token."));
      } catch (error) {
        next(new Error(error.message));
      }
    } else {
      next(new Error("ELSE: LAST FIRST Invalid API token."));
    }
  },

  index: async (req, res, next) => {
    try {
      const users = await User.find();
      res.locals.users = users;
      next();
    } catch (error) {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    }
  },

  indexView: (req, res) => {
    res.render("users/index", {
      flashMessages: {
        success: "Loaded all users!",
      },
    });
  },

  add: (req, res, next) => {
    req.flash("success", "Add a new user!");
    res.locals.redirect = "/users/new";
    next();
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: async (req, res, next) => {
    const getUserParams = (body) => {
      return {
        name: {
          first: body.first,
          last: body.last,
        },
        email: body.email,
        password: body.password,
        zipCode: body.zipCode,
      };
    };

    try {
      let userParams = getUserParams(req.body);

      const user = await User.create(userParams);
      req.flash("success", `${user.fullName}'s account created successfully!`);

      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(`Error saving user: ${error.message}`);

      req.flash(
        "error",
        `Failed to create user account because: ${error.message}.`,
      );

      res.locals.redirect = "/users/new";

      next();
    }
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: async (req, res, next) => {
    try {
      let userId = req.params.id;
      const user = await User.findById(userId).populate("courses");
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    }
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  edit: async (req, res, next) => {
    let userId = req.params.id;

    try {
      let user = await User.findById(userId);
      res.render("users/edit", { user: user });
    } catch (error) {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    }
  },

  update: async (req, res, next) => {
    let userId = req.params.id;
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
    };

    try {
      let user = await User.findByIdAndUpdate(userId, { $set: userParams });
      res.locals.redirect = `/users/${userId}`;
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    }
  },

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },

  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!",
  }),

  validate: async (req, res, next) => {
    // Validate and sanitize fields
    req.sanitizeBody("email").normalizeEmail({ all_lowercase: true });
    req.sanitizeBody("email").trim(); //this cleans up the code so that no matter how you input it, it always reads and saves the same

    req.check("email", "Email is invalid").isEmail();
    req
      .check("zipCode", "Zip code is invalid")
      .notEmpty()
      .isInt()
      .isLength({ min: 5, max: 5 });
    req.check("password", "Password cannot be empty").notEmpty();

    try {
      // Collect the results of previous validations
      const error = await req.getValidationResult(); // if there are some validations that did not pass, we will store it in the error object.

      if (!error.isEmpty()) {
        //if there are errors, we will output each error out for us.
        let messages = error.array().map((e) => e.msg);
        req.skip = true; // Set skip property to true
        req.flash("error", messages.join(" and ")); // we take the error messages and join them into a string.
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    } catch (err) {
      console.log(`Error in validation: ${err.message}`);
      next(err);
    }
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You have been logged out!");
      res.locals.redirect = "/";
      next();
    });
  },

  verifyJWT: async (req, res, next) => {
    let token = req.headers.token;

    if (token) {
      jsonWebToken.verify(
        token,
        "secret_encoding_passphrase",
        async (errors, payload) => {
          if (payload) {
            try {
              const user = await User.findById(payload.data);

              if (user) {
                next();
              } else {
                res.status(httpStatus.StatusCodes.FORBIDDEN).json({
                  error: true,
                  message: "No User account found.",
                });
              }
            } catch (error) {
              res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: "Database error.",
              });
            }
          } else {
            res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
              error: true,
              message: "Cannot verify API token.",
            });
          }
        },
      );
    } else {
      res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
        error: true,
        message: "Provide Token",
      });
    }
  },
};
