const express = require("express");
const router = express.Router();
const Product = require("../models/product");
/*const product = [];
let id = 1;

router.get("/", (req, res) => {
    return res.json(product);
});

router.get("/:id", (req, res) => {
    const obProduct = product.find(val => val.id === Number(req.params.id));
    return res.json(obProduct);
  });

router.post("/", (req, res) => {
    const newProduct = {
      name: req.body.name,
      id: ++id
    };
    product.push(newProduct);
    return res.json(newProduct);
  });

router.delete("/:id", (req, res) => {
    const productIndex = product.findIndex(val => val.id === Number(req.params.id));
    const obProduct = product.find(val => val.id === Number(req.params.id));
    product.splice(productIndex, 1);
    res.json(obProduct);
});

router.patch("/:id", (req, res) => {
    const obProduct = product.find(val => val.id === Number(req.params.id));
    obProduct.name = req.body.name;
    res.json({ message: "Actualizado" });
  });
*/

router.get("/",async(req,res) => {
  try{
    const Products = await Product.find();
    res.status(200).json(Products);
  }catch(err){
    res.status(500).json({message:err});
  }

})

router.post("/",async(req,res) => {
  const product = req.body;
  if(product.nombre && product.precio){
    const newProduct = new Product(product);
    try{
      await newProduct.save();
      res.status(201).json(newProduct);
    }catch(err){
      res.status(500).json({message:err});
    }
  }else{
    res.status(404).json({message:"Dato erroneos"});
  }


})
module.exports = router;