import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["user", "doctor", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);
export default User;
