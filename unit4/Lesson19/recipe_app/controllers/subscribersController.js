const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({})
    .exec() 
    .then((subscribers) => {
      req.data = subscribers;
      next();
    })
    .catch((error) => {
      next(error);
    })
    .then(() => {
      console.log('Promise complete!');
    });
};

exports.displaySubscribers = (req, res, next) => {
  console.log(req.data);
  res.render("subscribers", { subscribers: req.data });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    zipCode: req.body.zipCode,
  });

  newSubscriber.save()
  .then(result => {
        res.render("thanks");
  })
  .catch(error => {
    res.send(error)
  });
};