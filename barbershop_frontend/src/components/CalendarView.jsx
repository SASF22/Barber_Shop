import React from  "react";



const CalendarView = ({moy, dow, selectedMonth, setSelectedMonth, logOut, setDayView, backendGrabData, emailValue, setMyAppointmentView, myAppointmentView, grabMyAppointments }) => {

const daysInMonth = (period) => {
                                for ( let i = 31; i > 27; i--){                       
                                    let targetYearMonth = new Date(`${period.getFullYear()}-${period.getMonth() + 1}-${i}`);
                                    if(targetYearMonth.getMonth() === period.getMonth()){                            
                                        return i;
                                    }
                                }                                
                                return -1;
                            }

const generateMonth = ()=>{                
               
                const today = new Date();             
                
                let firstPeriod = new Date(today.getFullYear(), today.getMonth(), 1);
                let secondPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                let thirdPeriod = new Date(today.getFullYear(), today.getMonth() + 2, 1);                                

                let periods = [firstPeriod, secondPeriod, thirdPeriod];
                let currentPeriod = periods[selectedMonth];
                  
                let createDaysArray = ()=>{
                    let newArray = [];
                    let startingDay = currentPeriod.getDay();
                    let year = currentPeriod.getFullYear();
                    let month = moy[currentPeriod.getMonth()];
                    for (let j = 0; j < startingDay; j++){
                        newArray.push({
                            date: "",
                            day: "",
                            year: "",
                            month: "",
                        })
                    };
                    for(let i = 0; i < daysInMonth(currentPeriod); i++){                                            
                        newArray.push({
                            date: i + 1,
                            day: dow[(i + startingDay) % 7],
                            year: year,
                            month: month,                     
                        });
                    }; 
                    return newArray;                  
                }
                let daysArray = createDaysArray(); 
                let monthObject = {
                    month: moy[currentPeriod.getMonth()],
                    days: daysArray,
                }                
                return(
                    <>                       
                    {monthObject.days.map((item, num)=>{
                        return (
                        <div className="daySquare" datadate={item.day + "*" +  item.month + "*" + item.date + "*" + item.year} key={num} onClick={(e)=>{return handleDayClick(e)}} >{item.day} {item.date}</div>
                    )
                    })}       
                    </>
                )
            }
            const handleDayClick = (e)=>{
                let dataDate = e.target.attributes[1].value;               
                setDayView(()=>{
                    return dataDate;
                });
                backendGrabData()                
            }

             const loggedInView = ()=>{
            return(
                <>
                <div id="appointmentContainer">
                <div className="loggedInViewInnerStyle" > 
                    <div>
                        <button className="appointmentMonth" onClick={()=>{
                        setSelectedMonth(()=>{return 0});
                        }}>{moy[(new Date().getMonth())%12]}</button>
                        <button className="appointmentMonth" onClick={()=>{
                            setSelectedMonth(()=>{return 1});
                        }}>{moy[(new Date().getMonth() + 1)%12]}</button>
                        <button className="appointmentMonth" onClick={()=>{
                            setSelectedMonth(()=>{return 2});
                        }}>{moy[(new Date().getMonth() + 2)%12]}</button>
                    </div>                    
                   
                    <div className="logOutButtonContainer"> <div className="logOutButtonLoggInAs" >LOGGED IN AS:</div> <div className="logOutEmailDisplay" ><strong><em>{emailValue}</em></strong></div> <button className="logOutButton" onClick={()=>{
                        logOut();
                    }}>LOG OUT</button></div>
                </div>                
                
                <div className="appointmentDisplay">
                    <div className="appointmentDisplayInner" > <h1 className="appointmentDisplayInnerH1" >{moy[(new Date().getMonth() + selectedMonth)%12]}</h1>  </div>
                    <div className="appointmentCalendar" >{generateMonth()}</div>
                    
                </div>
                <div>
                    <button  className="myAppointmentsButton"  onClick={()=>{ 
                        grabMyAppointments();
                        setMyAppointmentView(()=>{
                        return !myAppointmentView;
                    })}}>MY APPOINTMENTS</button>
                    
                </div>
                </div>
                </>                       
                )
         }
          return(
                             <>
                                {loggedInView()}
                             </>
          );

}

export default CalendarView;