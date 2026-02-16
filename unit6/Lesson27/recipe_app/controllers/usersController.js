const passport = require("passport"); 
const User = require("../models/user");

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

  // create: (req, res, next) => {
  //   if (req.skip) next();
  //   let newUser = new User(getUserParams(req.body));
  //   User.register(newUser, req.body.password, (e, user) => {
  //     if (user) {
  //       console.log(`user: ${user} created...`);
  //       req.flash(
  //         "success",
  //         `${user.fullName}'s account created successfully!`
  //       );
  //       res.locals.redirect = "/users";
  //       next();
  //     } else {
  //       req.flash(
  //         "error",
  //         `Failed to create user account because: ${e.message}.`
  //       );
  //       res.locals.redirect = "/users/new";
  //       next();
  //     }
  //   });
  // },

  //   create: (req, res, next) => {
  //  if (req.skip) return next();
  //  let newUser = new User( getUserParams(req.body) );
  //  User.register(newUser, req.body.password, (error, user) => {
  //  if (user) {
  // req.flash("success", `${user.fullName}'s account created successfully!`);
  // res.locals.redirect = "/users";
  // console.log(`user: ${user} cresated...`);
  // next();
  //  } else {
  // req.flash("error", `Failed to create user account because: ${error.message}.`);
  // res.locals.redirect = "/users/new";
  // next();
  //  }
  //  });
  // },
  // create: async (req, res, next) => {

  //   try {
  //     let userParams = getUserParams(req.body);
  //     console.log(userParams);
  //     const user = await User.create(userParams);
  //     req.flash("success", `${user.fullName}'s account createdsuccessfully!`);
  //     res.locals.redirect = "/users";
  //     res.locals.user = user;
  //     next();
  //   } catch (error) {
  //     console.log(`Error saving user: ${error.message}`);
  //     res.locals.redirect = "/users/new";
  //     req.flash(
  //       "error",
  //       `Failed to create user account because: ${error.message}.`,
  //     );
  //     next();
  //   }
  // },

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

  // show: async (req, res, next) => {
  //   try {
  //     let userId = req.params.id;
  //     const user = await User.findById(userId);
  //     res.locals.user = user;
  //     next();
  //   } catch (error) {
  //     console.log(`Error fetching user by ID: ${error.message}`);
  //     next(error);
  //   }
  // },

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
  // authenticate: async (req, res, next) => {
  //   try {
  //     // Check whether a user is found
  //     const user = await User.findOne({ email: req.body.email });

  //     if (user) {
  //       // Call the password comparison method on the User model
  //       const passwordsMatch = await user.passwordComparison(req.body.password);

  //       if (passwordsMatch) {
  //         res.locals.redirect = `/users/${user._id}`;
  //         req.flash("success", `${user.fullName}'s logged in successfully!`);
  //         res.locals.user = user;
  //       } else {
  //         req.flash(
  //           "error",
  //           "Failed to log in user account: Incorrect Password.",
  //         );
  //         res.locals.redirect = "/users/login";
  //       }
  //       next();
  //     } else {
  //       // User account not found
  //       req.flash(
  //         "error",
  //         "Failed to log in user account: User account not found.",
  //       );
  //       res.locals.redirect = "/users/login";
  //       next();
  //     }
  //   } catch (error) {
  //     console.log(`Error logging in user: ${error.message}`);
  //     next(error);
  //   }
  // },

  // authenticate: async (req, res, next) => {
  //   try {
  //     const user = await User.findOne({ email: req.body.email });

  //     if (user && user.password === req.body.password) {
  //       res.locals.redirect = `/users/${user._id}`;
  //       req.flash("success", `${user.fullName}'s logged in successfully!`);
  //       res.locals.user = user;
  //       next();
  //     } else {
  //       req.flash(
  //         "error",
  //         "Your account or password is incorrect. Please try again or contact your system administrator!",
  //       );
  //       res.locals.redirect = "/users/login";
  //       next();
  //     }
  //   } catch (error) {
  //     console.log(`Error logging in user: ${error.message}`);
  //     next(error);
  //   }
  // },

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

  // logout: (req, res, next) => {
  //   req.logout();
  //   req.flash("success", "You have been logged out!");
  //   res.locals.redirect = "/";
  //   next();
  // },

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

  //   validate: async (req, res, next) => {
  //   // Validate and sanitize fields
  //   // req.sanitizeBody("email").normalizeEmail({ all_lowercase: true }).trim();
  //   req.sanitizeBody("email").normalizeEmail({ all_lowercase: true });
  //   req.sanitizeBody("email").trim();
  //   req.check("email", "Email is invalid").isEmail();
  //   req.check("zipCode", "Zip code is invalid")
  //     .notEmpty()
  //     .isInt()
  //     .isLength({ min: 5, max: 5 })
  //     .equals(req.body.zipCode);
  //   req.check("password", "Password cannot be empty").notEmpty();

  //   try {
  //     // Collect the results of previous validations
  //     const error = await req.getValidationResult();

  //     if (!error.isEmpty()) {
  //       let messages = error.array().map(e => e.msg);
  //       req.skip = true; // Set skip property to true
  //       req.flash("error", messages.join(" and "));
  //       res.locals.redirect = "/users/new";
  //       next();
  //     } else {
  //       next();
  //     }
  //   } catch (err) {
  //     console.log(`Error in validation: ${err.message}`);
  //     next(err);
  //   }
  // },
};
