const mongoose = require ('mongoose');
const connectDB = async()=> {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/arshad12',{});
        console.log(`mongodb connected: ${conn.connection.host}`);
    }
    catch(Error){
        console.log(Error);
        process.exit(1);
        
    }
};


module.exports=connectDB

