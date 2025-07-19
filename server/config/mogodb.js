const mongoose =require('mongoose')
require('dotenv').config()

const mongo = async () =>{
    await mongoose.connect("mongodb+srv://jayp3172004:PatelJay2004@cluster0.4kaeisk.mongodb.net/Text-image?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(()=>{
        console.log(`database connected`);
    })
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })   
}

module.exports=mongo;
