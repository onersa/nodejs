const Subscriber = require("../models/subscriber");
module.exports = {
  showSubscribers: async (req, res) => {
    subscribers = await Subscriber.find({});
    
    res.render("subscribers/index", {
      subscribers: subscribers,
      flashMessages: {success: "Loaded all subcribers"},
    });
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },

  create: async (req, res, next) => {
      try {
        let subscriberParams = {
          name: req.body.name,
          email: req.body.email,
          zipCode: req.body.zipCode
        };
        console.log(subscriberParams);
        const subscriber = await Subscriber.create(subscriberParams);
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      } catch (error) {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      }
    },
  
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath) res.redirect(redirectPath);
      else next();
    },

    show: async (req, res, next) => {
        try {
          let courseId = req.params.id;
          const course = await Course.findById(courseId);
          res.locals.course = course;
          next();
        } catch (error) {
          console.log(`Error fetching course by ID: ${error.message}`);
          next(error);
        }
      },

      showView: (req, res) => {
        res.render("courses/show");
      }, 
      
      edit: async (req, res, next) => {
          let courseId = req.params.id;
      
          try {
            let course = await Course.findById(courseId);
            res.render("courses/edit", { course: course });
          } catch (error) {
            console.log(`Error fetching course by ID: ${error.message}`);
            next(error);
          }
        },
      
        update: async (req, res, next) => {
          let courseId = req.params.id;
          let courseParams = {
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost,
            items: req.body.items,
            zipCode: req.body.zipCode,
          };
      
          try {
            let course = await Course.findByIdAndUpdate(courseId, { $set: courseParams });
            res.locals.redirect = `/courses/${courseId}`;
            res.locals.course = course;
            next();
          } catch (error) {
            console.log(`Error updating course by ID: ${error.message}`);
            next(error);
          }

        },
          delete: (req, res, next) => {
            let courseId = req.params.id;
            Course.findByIdAndDelete(courseId)
              .then(() => {
                res.locals.redirect = "/courses";
                next();
              })
              .catch((error) => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
              });
          },
      
};