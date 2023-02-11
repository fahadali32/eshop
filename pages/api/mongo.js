import mongoose from 'mongoose';
var Schema = mongoose.Schema;

mongoose.set('strictQuery', false);
// console.log(process.env.UNAME,process.env.PASS);
mongoose.connect(
  `mongodb+srv://${process.env.UNAME}:${process.env.PASS}@cluster0.ugi7clf.mongodb.net/Shop?retryWrites=true&w=majority`,
  // 'mongodb://localhost:27017/Shop',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=> console.log("Connected Sucessfully...."))
.catch((err)=> console.log(err))

export default mongoose