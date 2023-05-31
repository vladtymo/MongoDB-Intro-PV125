const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user1:cPCYk63Tm9TGCd50@cluster0.ous8a.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const devices = client.db("test").collection("devices");

        await devices.insertOne({
            model: 'iPhone 14 Pro Max',
            price: 31000
        }, (err, res) => {
            if (err)
                console.log('Error with insert: ' + err.message);
        });
    
        devices.insertMany([
            {
                name: 'MacBook Pro M1',
                color: 'Silver'
            },
            {
                name: 'HP EliteBook',
                color: 'White'
            },
            {
                name: 'Lenovo G580',
                color: 'Black'
            }
        ]);
    
        const grayDevice = await devices.findOne({ color: 'Gray' });
    
        console.log(grayDevice);
    
        const result = await devices.find({ color: 'Gray' });
    
        result.forEach(i => console.log(i));
    
        await devices.updateOne(
            { model: 'iPhone 14 Pro Max' },
            { $set: { "color": 'Space Black' } });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
