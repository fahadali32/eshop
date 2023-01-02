import mongoose from "../pages/api/mongo";
var Schema = mongoose.Schema;

var product = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
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
  }
});

mongoose.models = {};

var Product = mongoose.model('Product', product);

export default Product;
