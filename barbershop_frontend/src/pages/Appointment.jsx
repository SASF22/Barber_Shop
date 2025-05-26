import {useEffect, useState} from  "react";
import AppointmentViewer from "../components/AppointmentViewer";
import CalendarView from "../components/CalendarView";
import Popup from "../components/Popup";

const Appointment = ({authToken, setAuthToken}) => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");   
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [dayView, setDayView] = useState(""); 
    const [apptArray, setApptArray] = useState([]);
    const [popupTrigger, setPopupTrigger] = useState(false)
    const [popupTrigger2, setPopupTrigger2] = useState(false)
    const [popupTriggerMessage, setPopupTriggerMessage] = useState(false)
    const [popupMessage, setPopupMessage] = useState('');    
    const [schedulingArray, setSchedulingArray] = useState([]);
    const [myAppointmentView, setMyAppointmentView] = useState(false);
    const [myAppointments, setMyAppointments] = useState([])
    const [popupObject, setPopupObject] = useState({})
    let appointmentList = []
    
    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const moy = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const urlFix = import.meta.env.VITE_CLIENT_URL;
    
    const deleteMyAppt = async ()=>{
        let id = popupObject.appt_id;       
        const result = await fetch(`${urlFix}/api/deleteAppointment`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                id:id
            })
        })
        const data = await result.json();
        if (data != 'success'){
            setPopupObject(()=>{
                const newObject = new Object();
                newObject.message = true;
                newObject.text = "Sorry, there was an error in the cancelation.";
                newObject.text2 = "Please contact the store for this cancellation.";
                return {...newObject};
            })            
        }
        else{
            setPopupObject(()=>{
                const newObject = new Object();
                newObject.message = true;
                newObject.text = "SUCCESS";
                newObject.text2 = "Your appointment was canceled";
                return {...newObject};
            })            
        }
        await grabMyAppointments();
    }
    const thisFunction = async () =>{       
    }

    const formatTime = (time) =>{
        let timeNum = time.slice(0, 2);
        timeNum = Number(timeNum);        
        if(timeNum < 12){
            timeNum = timeNum + ":00 a.m.";
        }
        else if(timeNum > 12){
            timeNum = timeNum - 12;
            timeNum = timeNum + ":00 p.m.";
        }
        else{
            timeNum = timeNum + ":00 p.m.";
        }       
        return timeNum
    }

    const setAppointment =  async ()=>{
            const response = await fetch(`${urlFix}/api/schedule`,{
                method: 'POST',
                headers:{'Content-Type':'application/json'                        
                },
                body: JSON.stringify({
                    userID : schedulingArray[0],
                    apptTime: schedulingArray[1],
                    barberNum: schedulingArray[2],
                    apptDate: schedulingArray[3],
                    authorization: `Bearer ${authToken}`,
                })
            })
            const data = await response.json();            
            if (data != 'success'){
                setPopupTrigger2(()=>{
                    return true;
                })
                logOut();
                return;
            }            

            let data2 = [];           
            const response2 = await fetch(`${urlFix}/api/appointmentdayInfo/${dayView}`);
           
            data2 = await response2.json();                 
           
            setApptArray(()=>{
                return [...data2];
            },console.log("state is set")) 
            
            setPopupMessage(()=>{
                return "YOU HAVE SUCCESSFULLY SCHEDULED YOUR APPOINTMENT"
            });
            setPopupTriggerMessage(()=>{
                return true;
            })
        }

             const grabData = async ()=>{
                let data = [];
                if(dayView != ""){
                const response = await fetch(`${urlFix}/api/dayInfo/${dayView}`)               
                data = await response.json();                                         
                }                
                appointmentList = [...data];                
            }; 

            const backendGrabData = async () =>{
                let data = [];                 
                if((dayView == '***') || (dayView == '')){
                    return;
                }               
                const response = await fetch(`${urlFix}/api/appointmentdayInfo/${dayView}`);              
                data = await response.json();               
                setApptArray(()=>{
                  return [...data];
                }) 
            }

            const grabMyAppointments = async () =>{
                const result = await fetch(`${urlFix}/api/myappointments`,{
                    method: 'POST',
                    headers:{'Content-Type':'application/json'                        
                    },
                    body: JSON.stringify({
                        authorization : `Bearer ${authToken}`,                    
                    })                    
                })
                const data = await result.json();               
                if(data.name == 'TokenExpiredError'){
                    setPopupMessage(()=>{
                        return "Log in time has expired.  Please log in again.";
                    })
                    setPopupTriggerMessage(()=>{
                        return true;
                    })
                    logOut();
                    return;
                }               
                setMyAppointments(()=>{
                    let newArray = data.list;
                    return [...newArray];
                })                               
            }   

            const verifyToken = async (tokenValue)=>{
                const response = await fetch(urlFix+"/api/token/verify",{
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${tokenValue}`,
                    }
                })
                const data = await response.json();                
                if(data.message === "success"){
                    window.localStorage.setItem('TOKEN', data.token);
                    window.localStorage.setItem('EMAIL', data.user)
                    setAuthToken(()=>{
                        return data.token
                    })
                    setEmailValue(()=>{
                        return data.user
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
                    window.localStorage.setItem('EMAIL', data.email);
                    setAuthToken(()=>{
                        return data.token
                    })
                    setEmailValue(()=>{
                        return data.email
                    })      
                }
                else{
                    setPopupMessage(()=>{
                        return data;
                    })
                   setPopupTriggerMessage(()=>{
                        return true;
                   });
                }              
            }

            const logOut = async ()=>{
                window.localStorage.clear();
                setAuthToken(()=>{
                    return "";
                })
                setEmailValue(()=>{
                    return "";
                })               
            }

            const register = async ()=>{
                const response = await fetch('/api/register/',{
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
                    window.localStorage.setItem('EMAIL', data.email);
                    setAuthToken(()=>{
                    return data.token
                    })
                     setEmailValue(()=>{
                        return data.email
                    })                  
                }
                else{
                    setPopupMessage(()=>{return data});
                    setPopupTriggerMessage(()=>{
                        return true;
                    })
                }                  
            }          

            useEffect(()=>{
                const tokenHandle = async ()=>{
                  let tokenValue =  await loadToken();
                  await verifyToken(tokenValue);
                }
                tokenHandle();                                             
            },[authToken])

        const loggInView = ()=>{
            return(
                <div className="upperView">
                <div className="lowerView" ><h1>Log In</h1>
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
                    <div className="lowerViewButtonContainer">
                    <button type="button" onClick={ async ()=>{                        
                        login();
                    }}>Log In</button>
                    <button type="button" onClick={ async ()=>{                        
                        register();
                    }}>Register</button>
                    </div>
                </form>
                </div>                
                </div>
            )
        }
          return(
                             <>
                             <div className="appointmentOverview">
                                
                                    <div>
                                    {!authToken && loggInView()}
                                    
                                    {authToken && <CalendarView                                     
                                    selectedMonth={selectedMonth}
                                    setSelectedMonth={setSelectedMonth}
                                    emailValue={emailValue}
                                    moy={moy}
                                    dow={dow}
                                    logOut={logOut}
                                    dayView={dayView}
                                    setDayView={setDayView}
                                    urlFix={urlFix}
                                    backendGrabData={backendGrabData}
                                    popupTrigger={popupTrigger}
                                    setPopupTrigger={setPopupTrigger}
                                    myAppointmentView={myAppointmentView}
                                    setMyAppointmentView={setMyAppointmentView}
                                    grabMyAppointments={grabMyAppointments}
                                    popupObject={popupObject}
                                    setPopupObject={setPopupObject}

                                    thisFunction={thisFunction}
                                    />}
                                </div>
                                <div>{authToken && <AppointmentViewer
                                    dayView={dayView}
                                    setDayView={setDayView}
                                    urlFix={urlFix}
                                    emailValue={emailValue}
                                    logOut={logOut}
                                    grabData={grabData}
                                    apptArray={apptArray}
                                    setApptArray={setApptArray}
                                    appointmentList={appointmentList}
                                    backendGrabData={backendGrabData}
                                    popupTrigger={popupTrigger}
                                    setPopupTrigger={setPopupTrigger}
                                    popupTrigger2={popupTrigger2}
                                    setPopupTrigger2={setPopupTrigger2}
                                    verifyToken={verifyToken}                                                                      
                                    schedulingArray={schedulingArray}
                                    setSchedulingArray={setSchedulingArray}
                                    setMyAppointments={setMyAppointments}
                                    myAppointments={myAppointments}
                                    myAppointmentView={myAppointmentView}
                                    setMyAppointmentView={setMyAppointmentView}
                                    grabMyAppointments={grabMyAppointments}
                                    moy={moy}
                                    formatTime={formatTime}
                                    popupObject={popupObject}
                                    setPopupObject={setPopupObject}

                                    thisFunction={thisFunction}
                                    />}
                                </div>
                                 
                                 <Popup 
                                    popupTrigger={popupTrigger}
                                    setPopupTrigger={setPopupTrigger}
                                    popupTrigger2={popupTrigger2}
                                    popupTriggerMessage={popupTriggerMessage}
                                    setPopupTriggerMessage={setPopupTriggerMessage}
                                    setPopupTrigger2={setPopupTrigger2}
                                    popupMessage={popupMessage}
                                    setPopupMessage={setPopupMessage}
                                    dayView={dayView}
                                    //appointmentPopup={appointmentPopup}
                                    setAppointment={setAppointment}
                                    schedulingArray={schedulingArray}
                                    setSchedulingArray={setSchedulingArray}
                                    popupObject={popupObject}
                                    setPopupObject={setPopupObject}
                                    deleteMyAppt={deleteMyAppt}

                                    thisFunction={thisFunction}
                                    />     
                                                             
                                   
                             </div>
                             
                             </>
          );

}



export default Appointment;