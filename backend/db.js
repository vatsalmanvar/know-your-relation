// const MongoClient = require('mongodb').MongoClient;
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);

// async function run ( ) {
//   try {
//     await client.connect();
//     const database = client.db("kyr");
//     const coll = database.collection("know your relation");
//     // Query for a movie that has the title 'The Room'
//     // const query = { familyName: queryfamilyname };
//     // const family = await coll.findOne(query);
//     // since this method returns the matched document, not a cursor, print it directly
//     // console.log(family); 
//     // if(family!=null) return 1;
//     console.log("connection success");
//   } finally {
//     await client.close();
//   }
// } 

// module.exports = {run};
const mongoose =require('mongoose');
const MongoUri="mongodb://localhost:27017/kyr";
const ConnectToMongo=()=>{
    mongoose.connect(MongoUri).then(()=>{
        console.log("connected to database mongo successfully");
    }).catch((err)=>console.log('connection failed'));
}
module.exports=ConnectToMongo;
