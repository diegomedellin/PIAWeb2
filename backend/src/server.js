// Cargamos las variables de entorno desde el archivo .env
require("dotenv").config();

// Importamos la aplicación principal (toda la configuración de Express está en app.js)
const app = require("./app");

// Ponemos a escuchar el servidor en el puerto definido en .env
app.listen(process.env.PORT, () => {
  console.log("Backend corriendo en puerto " + process.env.PORT);
});


