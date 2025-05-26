import { useEffect} from  "react";



const AppointmentViewer = ({dayView, thisFunction, formatTime, moy, emailValue, logOut, backendGrabData, apptArray, setPopupTrigger, setPopupTrigger2,  setSchedulingArray,  myAppointmentView, setMyAppointmentView, myAppointments, setPopupObject}) => {
       
    const cnclMyAppt = (e)=>{
        
        let appointmentId = e.target.attributes[0].value;
        let appointmentInfo = e.target.attributes[1].value;
        let apInfo = appointmentInfo.split("*");        

        setPopupObject(()=>{
        const newObject = new Object();
        newObject.appt_id = appointmentId;
        newObject.functionCall = thisFunction()
        newObject.deleteAppt = true;
        newObject.text = "YOU ARE DELETING THE APPOINTMENT";
        newObject.text2 = `Dated: ${apInfo[1]} at ${apInfo[0]} with ${apInfo[2]}`;

        return {...newObject};

        })
    }

    useEffect(()=>{        
        backendGrabData()
        setMyAppointmentView(()=>{
            return false;
        })
    }, [dayView]);

        const viewer = ()=>{
        
        const dayInfo = dayView.split("*");        
        let schedule = true;        
        let newDate =  new Date(`${dayInfo[1]} ${dayInfo[2]}, ${dayInfo[3]}`);
        if(newDate < Date.now()){
            console.log("FALSE")
            schedule = false;
        }         
            return (
                <>
                    <div className="viewerStyle" >
                        <h2 style={{textAlign:'center'}}>{(!myAppointmentView) && dayInfo[0]} {(!myAppointmentView) &&  dayInfo[1]} {(!myAppointmentView) &&  dayInfo[2]}{((dayView != "") &&(dayView != "***") && (!myAppointmentView) ) && ","} { (!myAppointmentView) && dayInfo[3]}  {(myAppointmentView) && 'APPOINTMENTS' }</h2> 
                        {((dayView == "***") && (!myAppointmentView)) && blankSchedule()}
                        {((dayInfo == "") && (dayInfo != "***") && (!myAppointmentView) ) && selectScheduleMessage()}
                        {((dayInfo[0] == "Sunday") || (dayInfo[0] == "Monday") && (dayInfo != "") && (dayView != "***") && (!myAppointmentView)) && notWorkingSchedule()}
                        {((dayInfo[0] != "Sunday") && (dayInfo[0] != "Monday") && (dayInfo != "") && (dayView != "***") && (!myAppointmentView) && (schedule) ) && schedule2()} 
                        {((!schedule )&&(!myAppointmentView)) && passedDaySchedule()}
                        {((myAppointmentView)) && myAppointmentDisplay()}         
                    </div>
                </>
            )
        }
        const blankSchedule = ()=>{
            return(<>            
            <div className='blankScheduleStyle'>                
            </div>           
            </>)
        }
        const passedDaySchedule = () =>{
            return(<>            
            <div className="notWorkingScheduleStyle">
                <h1>Sorry.  Unavailable to schedule.  This day has passed.</h1>
            </div>           
            </>)
        }
        const notWorkingSchedule = ()=>{
            return(<>            
            <div className="notWorkingScheduleStyle">
                <h1>Sorry.  The shop is closed this day.  Please try another day to schedule an appointment.</h1>
            </div>           
            </>)
        }
        const selectScheduleMessage = ()=>{
            return(<>            
            <div className="selectScheduleMessageStyle" >
                <h1>Please select a day to schedule your appointment</h1>
            </div>           
            </>)
        }
        const displayAppointments = ()=>{
                    let barberArray = ['Marc Lamont', 'Chad Hubrik', 'Javier Espinosa', 'Dwayne Jackson']

            return   <>

                    {myAppointments.map((item)=>{                    
                    
                    let dateFormat = item.appt_date.slice(0, 10)
                    let dateArray = dateFormat.split('-')           
                    
                    return  <>
                                <div className="myAppointmentDisplayStyle" key={item.appt_id} > <div>TIME: {(formatTime(item.appt_time)).toUpperCase()}</div> <div>DATE: {(moy[Number (dateArray[1]) -1]).toUpperCase()} {dateArray[2]}, {dateArray[0]}</div> <div>BARBER: {(barberArray[item.barber - 1]).toUpperCase()}</div> 
                                
                                <button apptnum={item.appt_id} apptinfo={(formatTime(item.appt_time)).toUpperCase() + "*" + (moy[Number (dateArray[1]) -1]).toUpperCase() + " " + dateArray[2] + ", " + dateArray[0] + "*" + (barberArray[item.barber - 1]).toUpperCase() } onClick={(e)=>{
                                    cnclMyAppt(e);}}> CANCEL
                                </button> 
                                
                                </div> 
                            </>  
            })};
            
            </>
        }
        const displayAppointmentsNone = ()=>{
            return<>
            <h2>YOU HAVE NO APPOINTMENTS SCHEDULED</h2>
            </>
        }        

        const myAppointmentDisplay = ()=>{          
           
           return <>            
            
            <div className="myAppointmentListContainer">
                
                {((myAppointments.length > 0) && myAppointments[0].appt_date != null) &&  displayAppointments()}
                {((myAppointments.length == 0) || (myAppointments[0].appt_date == null)) && displayAppointmentsNone()}                
                               
            </div>            
            </>
        }       

        const attemptSetAppointment = async (e, barberNum)=>{             

            if (emailValue != window.localStorage.getItem('EMAIL')){
                setPopupTrigger2(()=>{
                    return true;
                })
                logOut();
                return;
            }                       
                        
            barberNum = barberNum;
            let apptTime = e.target.parentNode.parentNode.firstChild.textContent.slice(0,5); 
            if(Number (apptTime.slice(0,2)) < 9 ){
                apptTime =  String ((Number (apptTime.slice(0,2)) + 12) + ":00:00");                
            }
            let date = await dayView.split('*');
            let apptDate = await date[1] + " " + date[2] + " " + date[3]
            
            setSchedulingArray(()=>{
                let newArray = [];
                newArray.push(emailValue)
                newArray.push(apptTime)
                newArray.push(barberNum)
                newArray.push(apptDate)
                return [...newArray];
            }) 
            setPopupTrigger(()=>{
                return true;
            }) 
        }
        const schedule2 = ()=>{
            return (<>
            {apptArray.map((appt, number)=>{
            return(
                    <>
                                <div className="apptStyle" key={number} > 
                                    <div style={{fontSize:'2rem', fontWeight:'bolder', marginBottom:'2rem', display:'flex'}}><div style={{minWidth:'50%'}}>{appt.time}</div><div style={{minWidth: '50%', fontSize:'1.25rem'}}></div></div> 
                                    <div style={{display:'flex'}}><div  className="apptBarberName">Marc Lamont:</div>
                                    {(appt['barber1'] =='Schedule')&&<button onClick={(e)=>{attemptSetAppointment(e, 1)}} style={{minWidth:'50%' , fontSize:'1.25rem', fontWeight:'bolder', borderRadius:'.5rem'}}>{appt[`barber1`]}</button>}
                                    {(appt['barber1'] =='Unavailable')&&<div style={{minWidth:'50%', display:'flex', justifyContent:'center',  alignItems:'end', fontSize:'1.35rem', fontWeight:'bolder'}}>{appt[`barber1`]}</div>}
                                    </div>

                                    <div style={{display:'flex'}}><div className="apptBarberName">Chad Hubrik:</div>
                                    {(appt['barber2'] =='Schedule')&&<button onClick={(e)=>{attemptSetAppointment(e, 2)}} style={{minWidth:'50%' , fontSize:'1.25rem', fontWeight:'bolder', borderRadius:'.5rem' }} >{appt[`barber2`]}</button>}
                                    {(appt['barber2'] =='Unavailable')&&<div style={{minWidth:'50%', display:'flex', justifyContent:'center',  alignItems:'end', fontSize:'1.35rem', fontWeight:'bolder'}}>{appt[`barber2`]}</div>}
                                    </div>

                                    <div style={{display: 'flex'}}><div  className="apptBarberName">Javier Espinosa:</div>
                                    {(appt['barber3'] =='Schedule')&&<button onClick={(e)=>{attemptSetAppointment(e, 3)}} style={{minWidth:'50%' , fontSize:'1.25rem', fontWeight:'bolder', borderRadius:'.5rem'}} >{appt[`barber3`]}</button>}
                                    {(appt['barber3'] =='Unavailable')&&<div style={{minWidth:'50%', display:'flex', justifyContent:'center',  alignItems:'end', fontSize:'1.35rem', fontWeight:'bolder'}}>{appt[`barber3`]}</div>}
                                    </div>

                                    <div style={{display: 'flex'}}><div className="apptBarberName">Dwayne Jackson:</div>
                                    {(appt['barber4'] =='Schedule')&&<button onClick={(e)=>{attemptSetAppointment(e, 4)}} style={{minWidth:'50%', fontSize:'1.25rem', fontWeight:'bolder', borderRadius:'.5rem'}}>{appt[`barber4`]}</button>}
                                    {(appt['barber4'] =='Unavailable')&&<div style={{minWidth:'50%', display:'flex', justifyContent:'center', fontSize:'1.35rem', fontWeight:'bolder', alignItems:'end'}}>{appt[`barber4`]}</div>}
                                    </div>  
                                </div>
                    </>
                            )})
        }
        </>)
    }                               
          return(
                             <>                  
                                {viewer()}                              
                             </>
          );

}



export default AppointmentViewer;