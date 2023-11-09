const moongose = require("mongoose");
const Schema = moongose.Schema;

const ProductSchema = new Schema({
    nombre:String,
    precio:Number
});

module.exports = moongose.model("Product",ProductSchema);