import mongoose from 'mongoose';
var Schema = mongoose.Schema;

mongoose.set('strictQuery', false);
console.log(process.env.UNAME,process.env.PASS);
mongoose.connect(
  `mongodb+srv://eshop:Gf5TjwlyylQXso80@cluster0.ugi7clf.mongodb.net/Shop?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=> console.log("Connected Sucessfully...."))
.catch((err)=> console.log(err))

export default mongoose