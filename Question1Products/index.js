const express = require("express");
const productsRouter = require("./routes/products.js");

const app = express();
const PORT = 8080;

app.use("/categories", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});