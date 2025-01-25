import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema: Schema =  new Schema(
    {
        userName: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        },
        password: {
        type: String,
        required: true,
        },
        role: {
        type: String,
        required: true,
        default: "user",
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
        updatedAt: {
        type: Date,
        default: Date.now,
        },
    },
    {
        timestamps: true,
    }

)

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;
