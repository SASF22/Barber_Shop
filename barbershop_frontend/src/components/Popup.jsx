import React from  "react";



const Popup = ({popupTrigger, deleteMyAppt, setPopupTrigger, popupTrigger2,  setPopupTrigger2, popupTriggerMessage, setPopupTriggerMessage, popupMessage, dayView, schedulingArray, setAppointment, popupObject, setPopupObject}) => {

    const confirmButtonAction = async ()=>{

        console.log(schedulingArray); 
        setAppointment();
        setPopupTrigger(()=>{
            return false;
        })
    }

    const cancelButtonAction = ()=>{
        setPopupTrigger(()=>{
            return false;
        })
        setPopupTrigger2(()=>{
            return false;
        })
        setPopupTriggerMessage(()=>{
            return false;
        })
        setPopupObject(()=>{
            const newObject = new Object();
            return {...newObject};
        })
    }

    const popupWindowMessage = ()=>{        

        return <>           <div className="popupWindowOuter" >
                                <div className="popupWindowInner">
                                    <div className="popupWindowTextContainer" ><h2>{popupMessage}</h2></div>                                   
                                    <div className="popupWindowButtonContainer" >                                       
                                        <button className="popupMessageButton" onClick={()=>{cancelButtonAction()}}>CONTINUE</button>
                                    </div>
                                </div> 
                             </div>
        </>
    }

    const popupWindow = ()=>{

        {dayView}
        let dv = dayView.split('*');
        let barberArray = ['Marc Lamont', 'Chad Hubrik', 'Javier Espinosa', 'Dwayne Jackson']
        let timeData = schedulingArray[1].slice(0,2);

        if (timeData > 12){
            timeData -= 12;
            timeData = timeData + ':00 p.m.';
        }
        else if(timeData < 12){
            timeData = timeData + ':00 a.m.'
        }
        else{
            timeData = timeData + ':00 p.m.'
        }        

        return <>           <div className="popupWindowOuter">
                                <div className="popupWindowInner">
                                    <div className="popupWindowConfirmation" style={{textAlign:'center'}}><h2>CONFIRMATION!!!</h2></div>                                
                                    <div className="popupWindowTextContainer" ><p className="popupWindowRedText" >{dv[0]} {dv[1]} {dv[2]}, {dv[3]} at {timeData}</p></div>
                                    <div className="popupWindowTextContainer" ><p className="popupWindowRedText" >with {barberArray[schedulingArray[2] -1]}</p></div>                                    
                                    <div className="popupWindowButtonContainer">                                    
                                        <button className="popupWindowConfirmButton" onClick={()=>{confirmButtonAction()}}>CONFIRM</button>
                                        <button className="popupWindowCancelButton" onClick={()=>{cancelButtonAction()}}>CANCEL</button>
                                    </div>
                                </div> 
                             </div>
        </>
    }

    const popupWindow2 = ()=>{

        {dayView}
        let dv = dayView.split('*');        

        return <><div className="popupWindowOuter" >
                                <div className="popupWindowInner">  
                                    <div className="popupWindowTextContainer">  
                                        <h3>    
                                            ATTENTION!  LOGIN TIMEOUT EXPIRED.                                               
                                        </h3>
                                    </div>                                                               
                                    <div className="popupWindowButtonContainer">
                                        <button className="popupWindowConfirmButton" onClick={()=>{cancelButtonAction()}}>CONTINUE</button>
                                    </div>
                                </div>
                             </div> 
        </>
    }
    const popupDeleteAppointment = ()=>{

         return <>           <div className="popupWindowOuter">
                                <div className="popupWindowInner">
                                    <div className="popupWindowConfirmation" style={{textAlign:'center'}}><h2>CONFIRMATION!!!</h2></div>                                
                                    <div className="popupWindowTextContainer" ><p className="popupWindowRedText" >{popupObject.text}</p></div>
                                    <div className="popupWindowTextContainer" ><p className="popupWindowRedText" >{popupObject.text2}</p></div>                                    
                                    <div className="popupWindowButtonContainer">                                    
                                        <button className="popupWindowConfirmButton" onClick={()=>{deleteMyAppt()} }>CONFIRM</button>
                                        <button className="popupWindowCancelButton" onClick={()=>{cancelButtonAction()}}>CANCEL</button>
                                    </div>
                                </div> 
                             </div>
        </>
    }
    const popupObjectMessage = ()=>{        

        return <>           <div className="popupWindowOuter" >
                                <div className="popupWindowInner">
                                    <div className="popupWindowTextContainer" ><h2>{popupObject.text}</h2></div>                                
                                    <div className="popupWindowTextContainer" ><h3>{popupObject.text2}</h3></div>
                                    <div className="popupMessageInnerContainer" >     
                                        <button className="popupMessageButton" onClick={()=>{cancelButtonAction()}}>CONTINUE</button>
                                    </div>
                                </div> 
                             </div>
        </>
    }
        return <>
                <div>{popupTrigger && popupWindow()}</div>
                <div>{popupTrigger2 && popupWindow2()}</div>
                <div>{popupTriggerMessage && popupWindowMessage()}</div>
                <div>{popupObject.deleteAppt && popupDeleteAppointment()}</div>
                <div>{popupObject.message && popupObjectMessage()}</div>
            </>
}



export default Popup;