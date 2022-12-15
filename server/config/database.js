const mongoose = require('mongoose');

const {MONGOURL} = process.env;

exports.connect = () => {
    mongoose.set(`strictQuery`, false);
    mongoose.connect(MONGOURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(`DB connected`).catch(err=>{
        console.log(err);
    })
}
