const mongoose = require("mongoose");
const logger = require("../utils/logger");

// función para conectar a la base de datos
const connectDB = async () => {
  try {
    // intento de conexión... si algo truena lo vemos abajo
    await mongoose.connect(process.env.MONGODB_URI);
    
    // si llegó aquí, todo salió bien
    logger.info("MongoDB conectado correctamente");
  } catch (error) {
    // algo falló, así que lo logeamos y matamos el proceso
    logger.error("Error conectando MongoDB: " + error.message);
    process.exit(1); // nos vamos porque sin DB no vivimos :')
  }
};

module.exports = connectDB; // export para poder usarlo donde toque

