const express = require( 'express');
const path = require ('path');
const app = express()
const port = 8080
const pg = require('pg')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwt_SECRET = "shhhh";
const saltRounds = 10;
const cors = require("cors");
const corsOptions = {origin: ["http://localhost:5173"],    
};
app.use(cors(corsOptions));

const {Client } = require('pg');
const client = new Client({
user: 'postgres',
password: 'password',
host: 'localhost',
port: 5432,
database: 'barbershop', 
})

client.connect();

app.use(express.json())
console.log(__dirname)
const distFolder = path.resolve(__dirname, "../", "barbershop_frontend", "dist")
//app.use(express.static(path.join(__dirname, 'dist')))


app.use(express.static(distFolder));
console.log("NEW LOCATION: ", distFolder)

app.get('/', async (req, res) =>{
res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/home', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/about', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/appointments', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/socialMedia', async (req, res) =>{
  res.sendFile(path.join(distFolder, "index.html"));
})


app.post("/api/login", async (req, res)=>{
  const {email, password} = req.body;  
  const attempt = await client.query("SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  )
  if(attempt.rowCount > 0){
    const userInfo = await attempt.rows[0];
    const targetPass = await attempt.rows[0].password;
    bcrypt.compare(password, targetPass, (error, result)=>{
      if(error){
        console.log("Error was made in hashing");
        res.json("error made in hashing")
        return
      }
      else{
        console.log("THIS IS THE RESULT: ", result)     
        if(result){
          console.log("You logged in")
          const token = jwt.sign({username : email}, jwt_SECRET,{expiresIn: '1h'})
          console.log(token)          
          res.status(200).json({message:'success', token: token});
        }
        else{
          console.log("Incorrect Password");
          res.json('Incorrect Password')
        }
      }
    });   
  }
  else{
    res.json("Email not registered in system")
  }
});

app.post("/api/register", async (req, res)=>{

  const {email, password} = await req.body; 
  const attempt = await client.query("SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  )
  console.log(attempt.rows);
  try{
    if(attempt.rowCount > 0){
      console.log("This email address has already been registered.  User needs to log in.")
      res.json('This email address has already been registered. \nPlease log in instead.');      
    }
    else{
      bcrypt.hash(password, saltRounds, async(error, hash)=>{
        if(error){
          console.log("error in hashing ", error.message)
          res.json("hashing error");
        }
        else{
          const result = await client.query("INSERT INTO users(email, password) VALUES ($1, $2)",
          [email.toLowerCase(), hash]);  
          const token = jwt.sign({username : email}, jwt_SECRET)
          console.log(token)          
          res.status(200).json({message: "success", token: token});           
        }
      })      
    }     
  }catch(e){
    console.log(e.message)
  }
});

app.get("/api/token/verify", async (req, res)=>{
  const {authorization} = req.headers
  console.log("AUTHORIZATION------")
  console.log(authorization)
  const token = authorization.slice(7)
  console.log(token)
  let user = "";
      try{
        jwt.verify(`${token}`, jwt_SECRET, async (err, decoded)=>{
            if(err){
              console.log("THERE WAS AN ERROR")
              res.json(err.message) 
            }
            else{
              console.log(decoded);
              user = await decoded.username;  ////RIGHT HERE
              console.log(user)
              res.status(200).json({message:'success', token: token});           
            }
          });
          //console.log("VERIFIED: ", verified);        
      }catch(e){
        console.log(e.message);                 
      }     
  });

app.get('/api', (req, res)=>{
   
    res.json({fruits: ["apple", "orange", "banana"]})
    console.log("got here")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})











