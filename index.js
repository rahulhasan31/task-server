const express=require('express')
const app =express();
const port=process.env.PORT||5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors')
require('dotenv').config()

// middel wares
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('simple server')
})


console.log(process.env.USER_DB);

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.sayatpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
 const signinCollection=client.db('tito').collection('signin')
 const signupCollection=client.db('tito').collection('signup')


 app.post('/signin', async (req, res)=>{
     const signin=req.body
     const result= await signinCollection.insertOne(signin)
     res.send(result)
 })

 app.post('/signup', async (req, res)=>{
    const signup=req.body
    const result= await signupCollection.insertOne(signup)
    res.send(result)
 })



    }
    finally{

    }
}

run().catch(e=>{console.error(e)})


app.listen(port , ()=>{
 console.log(`simple server ${port}`);
})