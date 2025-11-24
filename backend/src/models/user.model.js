const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: String,
    ciudad: String,
    foto: { type: String, default: "" },
    rol: { type: String, enum: ["cliente", "admin"], default: "cliente" }
  },
  { timestamps: true }
);

// Middleware pre-save compatible con Mongoose 8+
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.compararPassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", userSchema);
