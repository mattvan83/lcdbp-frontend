import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  type: string;
  birthdate: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      select: false,
      index: true,
      validate: {
        validator: (val: string) =>
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val),
        message: ({ value }) => `${value} is not a valid email address.`,
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    type: {
      type: String,
      enum: ["admin", "moderator", "user"],
      default: "user",
      required: true,
    },
    birthdate: Date,
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("users", UserSchema);

export default User;
