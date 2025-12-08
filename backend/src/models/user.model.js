const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema para los usuarios del sistema.
// Aquí guardamos sus datos básicos, contraseña y el rol (cliente/admin)
const userSchema = new mongoose.Schema(
  {
    // Nombre del usuario (obligatorio)
    nombre: { type: String, required: true },

    // Apellido es opcional
    apellido: String,

    // Correo único, sirve como usuario para el login
    email: { type: String, required: true, unique: true },

    // Contraseña en texto plano (luego se encripta antes de guardar)
    password: { type: String, required: true },

    // Datos adicionales opcionales
    telefono: String,
    ciudad: String,

    // Foto del perfil (se guarda como string base64 o URL)
    foto: { type: String, default: "" },

    // Rol del usuario, por defecto es "cliente"
    // El admin se crea manualmente o desde la BD
    rol: { type: String, enum: ["cliente", "admin"], default: "cliente" }
  },
  {
    // Agrega automáticamente createdAt y updatedAt
    timestamps: true
  }
);

// Antes de guardar el usuario, este middleware se encarga
// de encriptar la contraseña si fue modificada.
// Mongoose 8 cambió detalles de funcionamiento y esto funciona perfecto allí.
userSchema.pre("save", async function () {
  // Si la contraseña no fue cambiada, no volvemos a encriptar
  if (!this.isModified("password")) return;

  // Encriptamos con salt 10
  this.password = await bcrypt.hash(this.password, 10);
});

// Método para comparar la contraseña ingresada con la guardada en la BD.
// Se usa en el login.
userSchema.methods.compararPassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

// Exportamos el modelo
module.exports = mongoose.model("User", userSchema);
