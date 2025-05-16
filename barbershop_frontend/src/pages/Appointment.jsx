import React, {useEffect, useState} from  "react";
import AppointmentViewer from "../components/AppointmentViewer";
import CalendarView from "../components/CalendarView";



const Appointment = ({authToken, setAuthToken}) => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");   
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [dayView, setDayView] = useState("");    
    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const moy = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //const urlFix = "";
    const urlFix = 'http://localhost:8080';
    
            const verifyToken = async (tokenValue)=>{
                const response = await fetch(urlFix+"/api/token/verify",{
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${tokenValue}`,
                    }
                })
                const data = await response.json();
                if(data === "success"){
                    window.localStorage.setItem('TOKEN', data.token);
                    setAuthToken(()=>{
                        return data.token
                    })                
                }
            }
            const loadToken = async ()=>{                
                let tokenValue = window.localStorage.getItem('TOKEN');
                setAuthToken(()=>{
                    return tokenValue;
                })
                return tokenValue;
            }
            const login = async ()=>{
                const response = await fetch(urlFix+'/api/login',{
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(
                    {
                        email: emailValue,
                        password: passwordValue,
                    })
                });
                const data = await response.json();
                if (data.message == 'success'){
                    window.localStorage.setItem('TOKEN', data.token);
                    setAuthToken(()=>{
                        return data.token
                    })        
                }
                else{
                   alert(data);
                }               
                 
            }
            const logOut = async ()=>{
                window.localStorage.clear();
                setAuthToken(()=>{
                    return "";
                })
                console.log("User Logged out");


            }
            const register = async ()=>{
                const response = await fetch(urlFix+'/api/register',{
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(
                    {
                        email: emailValue,
                        password: passwordValue,
                    })
                });
                const data = await response.json();
                console.log(data);
                if (data.message == 'success'){
                    window.localStorage.setItem('TOKEN', data.token);
                    setAuthToken(()=>{
                    return data.token
                    })             
                }
                else{
                    alert(data)
                }                  
            }


            // const daysInMonth = (period) => {
            //                     for ( let i = 31; i > 27; i--){                       
            //                         let targetYearMonth = new Date(`${period.getFullYear()}-${period.getMonth() + 1}-${i}`);
            //                         if(targetYearMonth.getMonth() === period.getMonth()){                            
            //                             return i;
            //                         }
            //                     }    
            //                     console.log(`error`);
            //                     return -1;
            //                 }
            // const generateMonth = ()=>{                  
                
               
            //     const today = new Date();
            //     const currMonth = today.getMonth();
            //     const thisMonth = currMonth;
            //     const nextMonth = currMonth + 1;
            //     const lastMonth = currMonth + 2;
            //     const todayDay = today.getDay();
            //     const todayDate = today.getDate();
            //     const thisYear = today.getFullYear();
                
            //     let firstPeriod = new Date(today.getFullYear(), today.getMonth(), 1);
            //     let secondPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            //     let thirdPeriod = new Date(today.getFullYear(), today.getMonth() + 2, 1);
                                

            //     let periods = [firstPeriod, secondPeriod, thirdPeriod];
            //     let currentPeriod = periods[selectedMonth];
                  
            //     let createDaysArray = ()=>{
            //         let newArray = [];
            //         let startingDay = currentPeriod.getDay();
            //         let year = currentPeriod.getFullYear();
            //         let month = moy[currentPeriod.getMonth() + 1];
            //         for (let j = 0; j < startingDay; j++){
            //             newArray.push({
            //                 date: "",
            //                 day: "",
            //                 year: "",
            //                 month: "",
            //             })
            //         };
            //         for(let i = 0; i < daysInMonth(currentPeriod); i++){                        
            //             console.log(startingDay)                    
            //             newArray.push({
            //                 date: i + 1,
            //                 day: dow[(i + startingDay) % 7],
            //                 year: year,
            //                 month: month,                     
            //             });
            //         }; 
            //         return newArray;                  
            //     }
            //     let daysArray = createDaysArray();                

            //     let monthObject = {
            //         month: moy[currentPeriod.getMonth()],
            //         days: daysArray,
            //     }
            //     console.log(monthObject)
            //     return(
            //         <>                       
            //         {monthObject.days.map((item, num)=>{
            //             return (
            //             <div className="daySquare" datadate={item.day + "*" +  item.month + "*" + item.date + "*" + item.year} key={num} onClick={(e)=>{return handleDayClick(e)}}    style={{display: 'flex', justifyContent:'center', border: '2px solid black', borderRadius:'.5rem', width:"calc(14.28% - 4px)"}}>{item.day} {item.date}</div>
            //         )
            //         })}       
            //         </>
            //     )
            // }

            // const handleDayClick = (e)=>{
            //     let dataDate = e.target.attributes[1].value;
            //     console.log(dataDate) 
            // }

            useEffect(()=>{
                const tokenHandle = async ()=>{
                  let tokenValue =  await loadToken();
                    await verifyToken(tokenValue); 
                }
                tokenHandle();                                             
            },[authToken])

        // const loggedInView = ()=>{
        //     return(
        //         <>
        //         <div id="appointmentContainer">
        //         <div><button id="appointmentMonth1" onClick={()=>{
        //             setSelectedMonth(()=>{return 0});
        //         }}>{moy[(new Date().getMonth())%12]}</button>
        //         <button id="appointmentMonth2" onClick={()=>{
        //             setSelectedMonth(()=>{return 1});
        //         }}>{moy[(new Date().getMonth() + 1)%12]}</button>
        //         <button id="appointmentMonth3" onClick={()=>{
        //             setSelectedMonth(()=>{return 2});
        //         }}>{moy[(new Date().getMonth() + 2)%12]}</button>
        //         <button  id="logoOutButton" onClick={()=>{
        //             logOut();
        //         }}>LOG OUT</button>
        //         </div>
        //         <div id="appointmentDisplay">
        //             <div style={{display:'flex', justifyContent:'center', width:"60vw"}} > <h1 style={{margin: "0px"}}>{moy[(new Date().getMonth() + selectedMonth)%12]}</h1>  </div>
        //             <div id="appointmentCalendar" style={appointmentCalendarStyle}>{generateMonth()}</div>
                    
        //         </div>
        //         <div>
        //             <button id="appointmentXpButton">xpButton</button>
        //             <button id="appointmentXpButton2">xpButton2</button>
        //         </div>
        //         </div>
        //         </>                       
        //         )
        // }
        const appointmentViewer = ()=>{
            return (
                <>
            <div id="appointmentViewerStyle" style={appointmentViewerStyle}>THIS IS WHERE THE VIEW IS
            </div>
            </>
            )
        }

        const appointmentViewerStyle={
            width: "30vw",
            border: "solid black 2px",
            height: "85vh",
            borderRadius: ".5rem",
        }

        // const appointmentCalendarStyle = {
        //     display: "flex",
        //     flexWrap: "wrap",
        //     border: "solid black 2px",
        //     height: "70vh",
        //     width: "60vw",
        //     borderRadius: ".5rem",
        //     margin: "2rem"

        // }

        const loggInStyle ={
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: "2rem",
            border: "solid black 2px",
            borderRadius: "2rem",            
        }
        const appointmentOverview ={
            display: "flex",
            //flexDirection: "column",
            height: '85vh',            
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: "2rem",
            border: "solid black 2px",
            borderRadius: "2rem",          
        }

        const loggInView = ()=>{
            return(
                <div className="upperView">
                <div className="lowerView" style={loggInStyle}><h1>Log In</h1>
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
                    <button type="button" onClick={ async ()=>{                        
                        login();
                    }}>Log In</button>
                    <button type="button" onClick={ async ()=>{                        
                        register();
                    }}>Register</button>
                </form>
                </div>                
                </div>
            )
        }
          return(
                             <>
                             <div className="appointmentOverview" style={appointmentOverview}>
                                <div>
                                    {!authToken && loggInView()}
                                    {authToken && < CalendarView                                     
                                    selectedMonth={selectedMonth}
                                    setSelectedMonth={setSelectedMonth}
                                    moy={moy}
                                    dow={dow}
                                    logOut={logOut}
                                    dayView={dayView}
                                    setDayView={setDayView}
                                    urlFix={urlFix}

                                    />}
                                </div>                             
                                    {authToken && <AppointmentViewer
                                    dayView={dayView}
                                    setDayView={setDayView}
                                    urlFix={urlFix}

                                    />}
                             </div>
                             
                             </>
          );

}



export default Appointment;