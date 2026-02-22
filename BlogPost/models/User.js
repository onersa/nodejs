const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
    const user = this;
    try {        
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        console.log(user);
             
    } catch (error) {
        console.log(error);
        next(error);
    }

})
const User = mongoose.model("User", UserSchema);

module.exports = User