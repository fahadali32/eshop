import mongoose from "../pages/api/mongo";
var Schema = mongoose.Schema;

var proImg = new Schema({
  image: {
    type: String,
    required:true
  },
  slug: {
    type: String,
    required: true
  }
});

mongoose.models = {};

var proImg = mongoose.model('proImg', proImg);

export default proImg;
