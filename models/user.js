import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already registered!'],
    required: [true, 'Email is required!']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    //regular expression checks that username contains 8-20 alphanumeric
    //letters and is unique 
    match: [/^(?=.{8,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_.-]+(?<![_.-])$/,
    "Username invalid, it should contain 8-25 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;
