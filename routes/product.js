const express = require("express");
const router = express.Router();
//Modulo de express, para validar datos
const {check} = require("express-validator");
//Importo todos los métodos del controlador de product
const {getProducts ,addProduct,getProductById,deleteProduct,updateProduct} = require("../controllers/product");
//Importo el middleware del validador
const { validateFields } = require("../middlewares/validateFields");

router
.route("/")
.get(getProducts)
.post([
  check("nombre","El campo nombre no puede estar vacío").not().isEmpty(),
  check("precio","El precio es de tipo número").isNumeric(),
  validateFields
  ],addProduct);

router
.route("/:id")
.get(getProductById)
.delete(deleteProduct)
.put([
  check("nombre","El campo nombre es obligatorio para hacer un put").not().isEmpty(),
  check("precio","El precio es un campo obligatorio y tipo númerico").isNumeric(),
  validateFields
],updateProduct);


module.exports = router;