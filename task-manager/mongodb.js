//CRUD operations

//const mongodb = require('mongodb');
//const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

async function main() {
    let client;
   // const id = new ObjectId();
    //console.log(id.toString());
    try {
        console.log('Connecting to MongoDB...');
        client = await MongoClient.connect(connectionUrl);
        console.log('Connected to MongoDB successfully!');
        
        const db = client.db(databaseName);
        
        // Insert a document
       // console.log('Inserting document...');
        //Note as shown in course in current version no callback function available so, to track error need to add catch
        //and get the result in try catch block
      //  const result = await db.collection('users').insertOne({name:'Mahesh', age:32,});

      //  console.log('Inserted document ID:', result.insertedId.toString());

       /* const user = await db.collection('users').findOne({name:'Parth'}).then((user)=>{
        console.log(user);
       }).catch((error)=>{
        console.log('Error:', error.message);
       }); */


       /* const user = await db.collection('users').find({age:32}).toArray((error,result)=>{
        if(error){
            return console.log('Error:', error.message);
        }
        console.log(result);
       })
       console.log(user); */


        ///adding multiple documents as tasks and description
       /*  console.log('Inserting multiple documents...');
        const result = await db.collection('tasks').insertMany([
            {description:'Clear the dishes', taskName:'Cleaning', completed:false},
            {description:'Buy groceries', taskName:'Shopping', completed:true},
            {description:'Do the laundry', taskName:'Household', completed:false},
        ]);

        console.log('Inserted documents:', result.insertedCount); */


        ///update promise
       /*  const updateNamePromise= db.collection('users').updateOne({_id: new ObjectId('689dad6f22cdf07ef34d029e')},{$set:{name:'Jain'}})
        await updateNamePromise.then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log('Error:', error.message);
        }) */


       /*  const result = await db.collection('tasks').updateMany({completed:false},{$set:{completed:true}}).then((result)=>{
                console.log(result);
            }).catch((error)=>{
                console.log('Error:', error.message);
            })
            console.log(result);
         */
        
            //Delete many
         /*    const result = await db.collection('users').deleteMany({age:32}).then((result)=>{
                console.log(result);
            }).catch((error)=>{
                console.log('Error:', error.message);
            }) */

        const result = await db.collection('tasks').deleteMany({
            taskName:'Shopping'
        }).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log('Error:', error.message);
        })
        console.log(result);
    } catch (error) {
        console.log('Error:', error.message);
    } finally {
        if (client) {
            await client.close();
            console.log('Connection closed.');
        }
        process.exit(0);
    }
}

main()