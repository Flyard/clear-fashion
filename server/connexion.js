const {MongoClient, Collection} = require('mongodb');
const fs = require('fs');

const file = './products.json';

const MONGODB_URI = 'mongodb+srv://td2:hnuxgmY0jAaysLQL@floriancluster.u7gf27y.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'API';


async function connection(){
    const client = await MongoClient.connect(MONGODB_URI,{'useNewUrlParser': true});
    try {
        
        const db = client.db(MONGODB_DB_NAME);
    
        //reding json file
        const data = JSON.parse(fs.readFileSync(file));
        console.log(data);

        //insert the data in products collection

        //console.log(await data.result);
        const result = await db.collection('products').insertMany(data, {upsert: true});

        console.log(`${result.insertedCount} documents insérés avec succès`);
    }
    catch (error) {
    console.error(error);
    } 
    finally {
    client.close();
    }
}

async function brandFilter(data) {
    const client = await MongoClient.connect(MONGODB_URI,{'useNewUrlParser': true});
}

connection();


