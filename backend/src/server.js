require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Backend corriendo en puerto " + process.env.PORT);
});

