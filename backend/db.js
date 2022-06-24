const MongoClient = require('mongodb').MongoClient;
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function run ( queryfamilyname ) {
  try {
    await client.connect();
    const database = client.db("kyr");
    const coll = database.collection("know your relation");
    // Query for a movie that has the title 'The Room'
    const query = { familyName: queryfamilyname };
    const family = await coll.findOne(query);
    // since this method returns the matched document, not a cursor, print it directly
    console.log(family);
    if(family!=null) return 1;
  } finally {
    await client.close();
  }
}

module.exports = {run};

