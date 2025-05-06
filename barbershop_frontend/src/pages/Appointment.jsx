import React, {useEffect, useState} from  "react";
import axios from "axios";


const Appointment = ({authToken, setAuthToken}) => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

            const fetchAPI = async ()=>{
                const response = await axios.get("http://localhost:8080/api");
                console.log(response.data.fruits);
            };

            useEffect(()=>{
                fetchAPI();
                addDept()
            },[])

            const addDept = async () => {
                const response = await axios.post('http://localhost:8080/api/attemptLogin', {
                   email: emailValue,
                   password: passwordValue
                })
                console.log(response.data.fruits);                
            }

        const loggedInView = ()=>{
            return(
                <>
                <div id="appointmentContainer">
                <div><button id="appointmentMonth1"></button><button id="appointmentMonth2"></button><button id="appointmentMonth3"></button></div>
                <div id="appointmentDisplay"> <div id="appointmentCalendar"></div><div id="appointmentView">THIS IS WHERE THE VIEW IS</div></div>
                <div><button id="appointmentXpButton">xpButton</button><button id="appointmentXpButton2">xpButton2</button>
                </div>
                </div>
                </>
                       
                )
        }
        const loggedInStyle ={
            display: "flex",
            flexDirection: "column",
            width: "20%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: "2rem",
            border: "solid black 2px",
            borderRadius: "2rem",
            
        }
        const loggInView = ()=>{
            return(
                <>
                <div style={loggedInStyle}><h1>Log In 2</h1>
                <form >
                    <label ><div>Email Address</div><div><input type="text" value={emailValue} onChange={(e)=>{
                        let newEmailValue = e.target.value;
                        setEmailValue(()=>{
                            return newEmailValue;
                        })
                    }}/></div></label>
                    <label ><div>Password</div><div><input type="password" value={passwordValue} onChange={ (e)=>{
                        
                        let newValue = e.target.value;                        
                        setPasswordValue(()=>{
                            
                            return newValue;
                        })
                    }}/></div></label>
                    <button type="button" onClick={ async (e)=>{
                        console.log("got here");

                        
                        //addDept();

                        // console.log("even got here")
                        // const result = await fetch("/api");
                        // const data = await result.json();
                        // console.log(data)

                        // const response = await axios.post("http://localhost:3000/api/attemptLogin", {
                        //     email: emailValue,
                        //     password: passwordValue
                        // });
                        const fetchData = async ()=>{
                            const response = await fetch('http://localhost:8080/api/attemptLogin',{
                            method: "POST",
                            headers: 
                            {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(
                                {
                                email: emailValue,
                                password: passwordValue
                                }
                            )                                                         
                        });
                        console.log(response);
                        }
                        fetchData();     


                    }}>Log</button>
                </form>
                </div>
                
                </>
            )
        }

          return(
                             <>
                             {!authToken && loggInView()}
                             {authToken && loggInView()}
    

                             </>
          );

}



export default Appointment;