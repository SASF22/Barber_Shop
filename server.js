const express = require( 'express');
const path = require ('path');
const app = express()
const port = `${process.env.PORT || 8080}`
const  {createScheduleArray} = require("./createScheduleArray.js"); 
const pg = require('pg')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwt_SECRET = `${process.env.JWT_SECRET}`;
const saltRounds = `${process.env.SALT_ROUNDS_NUMBER}`
const cors = require("cors");
//const corsOptions = {origin: ["http://localhost:5173"],    
//};
app.use(cors());
console.log(process.env.DATABASE_URL)
const {Client } = require('pg');
const client = new Client({
// user: process.env.PG_USER,
// password: process.env.PG_PASSWORD,
// host: process.env.PG_HOST,
// port: process.env.PG_PORT,
// database: process.env.PG_DATABASE, 
connectionString: process.env.DATABASE_URL,
ssl:{
  rejectUnauthorized: false
}
})


client.connect();

app.use(express.json())


const distFolder = path.resolve(__dirname,"public","dist");



app.use(express.static(distFolder));



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
app.get('/', async (req, res) =>{
res.sendFile(path.join(distFolder, "index.html"));
})
app.get('/reviews', async (req, res) =>{
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
        
        res.json("error made in hashing")
        return
      }
      else{
             
        if(result){
          
          const token = jwt.sign({username : email}, jwt_SECRET,{expiresIn: '1h'})                  
          res.status(200).json({message:'success', token: token, email: email});
        }
        else{          
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
  try{
    if(attempt.rowCount > 0){      
      res.json('This email address has already been registered.');      
    }
    else{
      const hash = await bcrypt.hash(password, Number (process.env.SALT_ROUNDS_NUMBER));
        
      const result = await client.query("INSERT INTO users(email, password) VALUES ($1, $2)",
      [email.toLowerCase(), hash]);  
      const token = jwt.sign({username : email}, jwt_SECRET, {expiresIn: '1h'})
                  
      res.status(200).json({message: "success", token: token});           
        
            
    }     
  }catch(e){
    
  }
});

app.get("/api/token/verify", async (req, res)=>{
  const {authorization} = req.headers
 
  const token = authorization.slice(7)
  
  let user = "";
      try{
        jwt.verify(`${token}`, jwt_SECRET, async (err, decoded)=>{
            if(err){
              res.json(err) 
            }
            else{
              user = await decoded.username;  ////RIGHT HERE              
              res.status(200).json({message:'success', token: token, user: user.toLowerCase()});           
            }
          });
      }catch(e){  
      }     
});

app.post("/api/myappointments", async (req, res)=>{
  const {authorization} = req.body
  const token = authorization.slice(7)
  let user = "";
      try{
        jwt.verify(`${token}`, jwt_SECRET, async (err, decoded)=>{
            if(err){
              res.json(err) 
            }
            else{
              user = await decoded.username;  ////RIGHT HERE
              const result = await client.query('SELECT appt_id, appt_time, appt_date, barber FROM appointment FULL JOIN users ON appointment.user_email = users.user_id WHERE users.email = $1 AND appt_date > NOW() ORDER BY appt_date, appt_time',[user.toLowerCase()]) 
              res.status(200).json({message:'success', token: token, user: user, list: result.rows});           
            }
          });                  
      }catch(e){
                        
      }
      
      
});
app.post("/api/deleteAppointment", async (req, res)=>{

  const {id} = req.body;
  const result = await client.query('DELETE FROM appointment WHERE appt_id = $1',[id]);
   
  if (result.rowCount > 0){
    res.json('success');
  }
  else{
    res.json('error');
  }

})

app.get('/api/dayInfo/:day', async (req, res)=>{
    const {day} = req.params;
    const day_info = day.split("*");
    const date = `${day_info[1]} ${day_info[2]} ${day_info[3]}`;
    const result = await client.query("SELECT * FROM appointment WHERE appt_date = $1 ORDER BY appt_time" ,
          [date]);
    const data = result.rows;
       
    res.json(data);
    
});
app.get('/api/appointmentdayInfo/:day', async (req, res)=>{
  try{
    const {day} = req.params;
    if(day == "***"){
      res.json("not a day");
      return;
    }
    const day_info = day.split("*");
    const date = `${day_info[1]} ${day_info[2]} ${day_info[3]}`;
    const result = await client.query("SELECT * FROM appointment WHERE appt_date = $1 ORDER BY appt_time, barber" ,
          [date]);
    const data = result.rows;    
      
    let finalArray = await createScheduleArray(data);  
    res.json(finalArray);
    
  }catch(e){
     
     res.json(e);
    }
    
});

app.post('/api/schedule', async (req, res)=>{ 
  let tokenUser; 
  const {userID, apptTime, barberNum, apptDate, authorization} = await req.body
  const token = await authorization.slice(7)
  try {
        jwt.verify(`${token}`, jwt_SECRET, async (err, decoded)=>{
            if(err){
              
              res.json('ERROR IN TOKEN VERIFICATION') 
            }
            else{              
              tokenUser = await decoded.username;  ////RIGHT HERE  
               
              if(tokenUser != userID){
               
                res.json('MISMATCH IN EMAIL')
              }  
                             
            }
          });
              
      }catch(e){
                      
      }  
  
  const user_uuid = await client.query("SELECT user_id FROM users WHERE email = $1",
  [userID.toLowerCase()]);     
      const data = client.query(`INSERT INTO appointment(appt_time, appt_date, barber, user_email) VALUES($1, $2, $3, $4)`,[apptTime, apptDate, barberNum+"", user_uuid.rows[0].user_id]);      
      res.json('success');
    
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



