// models/User.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRdIf-VHH4J3xKFIyY0YiqMxbULpzjj_cMpjb-unS0JFThFy3hWmsvZgFcKWO0W9iOrA&usqp=CAU'
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
