import React from  "react";




const Home = () => {


          return(
                             <>
                <div className="homeOuterContainer">
            
                
                <div id="homeContainer">   
                <div id="homeH1" ><h1> Welcome to Marc L's Cuts, Trims, and Wins</h1></div>                  
                         
                <div id="homeHoursTable">  
                <table><thead><tr>
                   <th>HOURS OF OPERATION</th> 
                </tr>
                <tr>
                    <th>DAY</th>
                    <th>TIME</th>
                </tr>
                </thead>
                <tbody><tr>
                    <td>Monday</td>
                    <td>Closed</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>09:00 am - 07:00 pm</td>
                </tr>
                <tr>   
                    <td>Wednesday</td>
                    <td>09:00 am - 07:00 pm</td>             
                </tr>
                <tr>   
                    <td>Thursday</td>
                    <td>09:00 am - 07:00 pm</td>             
                </tr>
                <tr>   
                    <td>Friday</td>
                    <td>09:00 am - 07:00 pm</td>             
                </tr>
                <tr>   
                    <td>Saturday</td>
                    <td>09:00 am - 07:00 pm</td>             
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>Closed</td>
                </tr>     
                </tbody>
                
                               
            </table>
        </div>
        
         
      


         <div id="homeComment">
        <p>Welcome to the best Barber Shop in town. </p>
        <p>At Marc's, we offer the newest styles and the
            cleanest cuts.  
        </p>
        <p>We will get you in and out looking fly so you can get back to winning!!</p>
        <p>Walk-ins welcome, but appointments take priority.</p>
        <p>Stop by, or click the appointment link to make an appointment today.</p>    
    
    </div>
    
    <div id="pole">
        <img src="/src/pages/media/marcL.png" alt="Cartoon picture of Mr. Marc L" type=""/>        
    </div>
        
    </div>
    </div>

                             </>
          );

}



export default Home;