const express = require('express') 
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const useRouteProduct = require("./routes/product");

mongoose.set("strictQuery",false);

async function main() {
  await mongoose.connect(process.env.MONGO_CNN);
  console.log("DataBase connected");
}
main().catch((err) => console.log(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use('/product',useRouteProduct);

// Iniciamos el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando por el puerto ${PORT}`)
})