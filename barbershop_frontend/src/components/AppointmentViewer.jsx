import React from  "react";



const AppointmentViewer = () => {



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

          return(
                             <>
                                {appointmentViewer()}
                             </>
          );

}



export default AppointmentViewer;