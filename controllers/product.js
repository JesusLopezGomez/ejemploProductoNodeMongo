const Product = require("../models/product");


const getProducts = async(req,res) => {
    try{
      const Products = await Product.find();
      res.status(200).json(Products);
    }catch(err){
      res.status(500).json({message:err});
    }
  
}

const getProductById = async(req, res) => {
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
  };

const addProduct = async(req,res) => {
    const {nombre,precio} = req.body;
    if(nombre && precio){
      const newProduct = new Product({nombre,precio});
      try{
        await newProduct.save();
        res.status(201).json(newProduct);
      }catch(err){
        res.status(500).json({message:err});
      }
    }else{
      res.status(404).json({message:"Dato erroneos"});
    }
}

const deleteProduct = async(req,res) => {
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
}

const updateProduct = async(req,res) => {
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
  }

module.exports = {getProducts,addProduct,getProductById,deleteProduct,updateProduct}