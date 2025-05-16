import React, { useEffect, useState} from  "react";



const AppointmentViewer = ({dayView, setDayView, urlFix}) => {
    const [apptArray, setApptArray] = useState([])
    let appointmentsArray = [];

    const grabData = async ()=>{
                if(dayView != ""){
                const response = await fetch(`${urlFix}/api/dayInfo/${dayView}`)
                console.log("data changed");
                const data = await response.json();
                console.log(data)               
                setApptArray(()=>{
                    return [...data];
                })              
                }
                
            }; 
    useEffect(()=>{        
        grabData()
    }, [dayView]);




      const viewer = ()=>{
        const dayInfo = dayView.split("*");        
        console.log(dayInfo);
            return (
                <>
                    <div id="viewerStyle" style={viewerStyle}>
                        <h2>{dayInfo[0]} {dayInfo[1]} {dayInfo[2]} {dayInfo[3]}</h2> 
                        {(dayView == "***") && blankSchedule()}
                        {((dayInfo == "") && (dayInfo != "***") ) && selectScheduleMessage()}
                        {((dayInfo[0] == "Sunday") || (dayInfo[0] == "Monday") && (dayInfo != "") && (dayView != "***")) && notWorkingSchedule()}
                        {((dayInfo[0] != "Sunday") && (dayInfo[0] != "Monday") && (dayInfo != "") && (dayView != "***")) && schedule()}          
                    </div>
                </>
            )
        }
        const blankSchedule = ()=>{
            return(<>            
            <div style={{display: "flex", justifyContent:"center", textAlign:"center"}}>                
            </div>           
            </>)
        }
        const notWorkingSchedule = ()=>{
            return(<>            
            <div style={{display: "flex", justifyContent:"center", textAlign:"center"}}>
                <h1>Sorry.  The shop is closed this day.  Please try another day to schedule an appointment.</h1>
            </div>           
            </>)
        }
        const selectScheduleMessage = ()=>{
            return(<>            
            <div style={{display: "flex", justifyContent:"center", textAlign:"center", padding:"1rem"}}>
                <h1>Please select a day to schedule your appointment</h1>
            </div>           
            </>)
        }

        const scheduleStyle = {
            
            fontSize: "1.5rem",
            border: "solid black 1px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: '1rem',
        }
        const apptStyle = {
            display: 'flex',
            flexDirection: 'column',
            border: '2px black solid',
            borderRadius: '2rem',
            width: '80%',
            padding: '2rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            gap: '1rem'
        }

        const setAppointment =  ()=>{
            console.log("WAKA WAKA")
        }

        const schedule = ()=>{
          console.log("THIS IS THE ARRAY: ",apptArray)
          console.log("THIS IS THE COUNT: ", apptArray.length)
            let countMax = apptArray.length;
            let count = 0;
            let arrayPos = 0;
            const newArray =[];
            const timeArray = ['09:00 a.m.', '10:00 a.m.', '11:00 a.m.', '12:00 p.m.', '01:00 p.m.', '02:00 p.m.', '03:00 p.m.', '04:00 p.m.', '05:00 p.m.', '06:00 p.m.']

            if (countMax < 1){
                return (<>
                    {regularSchedule()}                
                </>)
            }
            else{
            
            newArray.push(new Object)
            newArray[arrayPos]['time'] = timeArray[arrayPos]
            if(apptArray[count].appt_time == `09:00:00`){
                for(let s = 1; s < 5; s++){
                    if((count < countMax) && (apptArray[count].barber == s)){
                        //newArray.push(`09:00:00 scheduled, barber ${s}`);
                        count += 1;
                        newArray[arrayPos][`barber${s}`] = `Unavailable`;
                    }
                    else{
                        //newArray.push(`09:00:00 not scheduled, barber ${s}`);
                        newArray[arrayPos][`barber${s}`] = `Schedule`;
                    }
                }
            }
            else{
                for(let i = 1; i < 5; i++){
                    //newArray.push(`9:00:00 not scheduled, barber ${i}`);
                    newArray[arrayPos][`barber${i}`] = `Schedule`;
                }
            }
            arrayPos += 1;
            for(let x = 10; x < 19; x++){ 
                newArray.push(new Object);
                newArray[arrayPos]['time'] = timeArray[arrayPos]           
                if((count < countMax) && (apptArray[count].appt_time == `${x}:00:00`)){                   
                   for(let j = 1; j < 5; j ++){
                        if ((count < countMax) && (apptArray[count].barber == `${j}`)){
                            count += 1;
                            newArray[arrayPos][`barber${j}`] = `Unavailable`;
                            //newArray.push(`${x}:00:00 scheduled, barber ${j}`);
                        }
                        else{
                            //newArray.push(`${x}:00:00 not scheduled, barber ${j}`);
                            newArray[arrayPos][`barber${j}`] = `Schedule`;
                        }                        
                    } 
                    arrayPos += 1;
                }
                else{                    
                    for(let i = 1; i < 5; i++){
                        //newArray.push(`${x}:00:00 not scheduled, barber ${i}`);
                        newArray[arrayPos][`barber${i}`] = `Schedule`;
                    }
                    arrayPos += 1;
                }
            }
            console.log("This is the new Array: ", newArray)
            }
            return(<>
               { newArray.map((appt, number)=>{
                          
                    return(
                    <>
                                <div key={number} style={apptStyle}> 
                                    <div style={{fontSize:'2rem', fontWeight:'bolder', marginBottom:'2rem'}}>{appt.time}</div> 
                                    <div style={{display:'flex'}}><div style={{minWidth:'50%', fontSize:'1.25rem', fontWeight:'bolder'}}>Marc Lamont:</div>
                                    {(appt['barber1'] =='Schedule')&&<button onClick={(e)=>{appointmentSelection(e)}} style={{minWidth:'50%'}}>{appt[`barber1`]}</button>}
                                    {(appt['barber1'] =='Unavailable')&&<div style={{minWidth:'50%', display:'flex', justifyContent:'center',  alignItems:'end'}}>{appt[`barber1`]}</div>}
                                    </div> 
                                    <div style={{display: 'flex'}}><div style={{minWidth:'50%',fontSize:'1.25rem', fontWeight:'bolder'}}>Chad Hubrik:</div><button style={{minWidth:'50%'}}>{appt[`barber2`]}</button></div> 
                                    <div style={{display: 'flex'}}><div style={{minWidth:'50%',fontSize:'1.25rem', fontWeight:'bolder'}}>Javier Espinosa:</div><button style={{minWidth:'50%'}}>{appt[`barber3`]}</button></div> 
                                    <div style={{display: 'flex'}}><div style={{minWidth:'50%',fontSize:'1.25rem', fontWeight:'bolder'}}>Dwayne Jackson:</div><button style={{minWidth:'50%'}}>{appt[`barber4`]}</button></div>  
                                </div>
                    </>
                            )
                })}
                </>)          
        }

        const regularSchedule = ()=>{
            return <div style={scheduleStyle}>
                    <div onClick={()=>{setAppointment()}}><div>09:00 a.m.</div></div>
                    <div><div>10:00 a.m.</div></div>
                    <div><div>11:00 a.m.</div></div>
                    <div><div>12:00 p.m.</div></div>
                    <div><div>01:00 p.m.</div></div>
                    <div><div>02:00 p.m.</div></div>
                    <div><div>03:00 p.m.</div></div>
                    <div><div>04:00 p.m.</div></div>
                    <div><div>05:00 p.m.</div></div>
                    <div><div>06:00 p.m.</div></div>
                    <div><div>07:00 p.m.</div></div>  
                </div>      
        }

        const viewerStyle ={
            width: "30vw",
            border: "solid black 2px",
            height: "85vh",
            borderRadius: ".5rem",
            display:"inline-flex",
            flexDirection: "column",
            overflow: "auto",
        }

          return(
                             <>
                                {viewer()}
                             </>
          );

}



export default AppointmentViewer;