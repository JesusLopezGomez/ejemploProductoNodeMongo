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

router.get("/:id", async(req, res) => {
  if(req.params.id){

    try{
      const product = await Product.findById(req.params.id);
      return res.status(200).json(product);
    }catch(err){
      res.status(500).json({message:err});
    }

  }else{
    res.status(404).json({message:"Dato erroneos"});
  }
});

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

//Esto es otra manera de borrar que directamente busca el producto y lo borra
router.delete("/:id",async(req,res) => {
  let id = req.params.id;
  
  if(id){ //Si la id no es vacía
    try{  
      const productoBorrar = await Product.findByIdAndDelete(id);
      res.status(200).json(productoBorrar); //Devuelvo código 200 de éxito y el producto que se ha borrado
    }catch(err){ //En el caso de que haya algún error durante la ejecución del servidor
      res.status(500).json({message:err}); //Devuelvo error del servidor 500 y un mensaje con el error que haya ocurrido
    }
    
  }else{//Si introduce una id no válida devuelvo error del cliente 400, informando con un mensaje que los datos son erroneos
    res.status(400).json({message:"Datos erroneos"});
  }
});

router.delete("/:id",async(req,res) => {
  let id = req.params.id;
  
  if(id){ //Si la id no es vacía
    try{
      const productoEncontrar = await Product.findById(id);//Busco el producto
      if(productoEncontrar){ //Y si producto no es nulo
        await Product.deleteOne(productoEncontrar); //Lo borro
        res.status(200).json(productoEncontrar); //Devuelvo código 200 de éxito y el producto que se ha borrado
      }else{
        res.status(400).json({message:"Producto no encontrado"}); //Si el producto no existe devuelvo mensaje de error del cliente, ya que ha metido una id no existente
      }
    }catch(err){ //En el caso de que haya algún error durante la ejecución del servidor
      res.status(500).json({message:err}); //Devuelvo error del servidor 500 y un mensaje con el error que haya ocurrido
    }

  }else{//Si introduce una id no válida devuelvo error del cliente 400, informando con un mensaje que los datos son erroneos
    res.status(400).json({message:"Datos erroneos"});
  }
});

router.patch("/:id",async(req,res) => {
  let id = req.params.id; //Recupero la id de la ruta
  let productoModificado = req.body; //Recupero los datos que actualizar
  if(id && productoModificado){ //Si los datos no son nulos
    try{
      await Product.findByIdAndUpdate(id,productoModificado); //Busco el producto por id y lo actualizo con los datos introducidos
      const productoActualizado = await Product.findById(id); //Busco el producto actualizado y lo guardo
      res.status(200).json(productoActualizado); //Para ahora devolver el producto actualizado
    }catch{
      res.status(500).json({message:err}); //Devuelvo error del servidor 500 y un mensaje con el error que haya ocurrido
    }
  }else{
    res.status(400).json({message:"Datos erroneos"});
  }
});


module.exports = router;