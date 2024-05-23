import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true,
            default: 'user'
        }
    },
    {timestamps: true}
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;