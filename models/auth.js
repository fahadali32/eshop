import mongoose from "../pages/api/mongo";
var Schema = mongoose.Schema;

var Auth = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  did: {
    type: String,
    require: true
  },
});

mongoose.models = {};

var Auth = mongoose.model('Auth', Auth);

export default Auth;
