import mongoose from "../pages/api/mongo";
var Schema = mongoose.Schema;

var Cart = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required:true
  },
  slug: {
    type: String,
    required: true
  },
  qty: {
    type:Number,
  },
  did:{
    type:String,
    require:true
  },
});

mongoose.models = {};

var Cart = mongoose.model('Cart', Cart);

export default Cart;
