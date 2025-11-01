import mongoose from "mongoose";
import bcrypt from "bcryptjs";  // ✅ add this line

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String },
    experience: { type: String },
    about: { type: String },
    fees: { type: Number },
    address: {
      line1: String,
      line2: String,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Hash password before save
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare entered password
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
