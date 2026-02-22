const User = require("../models/User");

module.exports = async (req, res, next) => {
    
    console.log(`Session.userId from authMiddleware.js: ${req.session.userId}`);
    try {
    const user = await User.findById(req.session.userId);
    console.log(`authMiddleware user: ${user}`);
    if (!user) {
        return res.redirect("/")
    }
    next();
    } catch(error) {
        return res.redirect("/")
    }
}
