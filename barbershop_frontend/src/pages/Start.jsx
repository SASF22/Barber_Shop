import React from  "react";
import {Link, Routes, Route } from "react-router"



const Start = () => {


          return(
                             <>
                             <div className="welcomePage">
                                <div className="welcomePageInner">
                             <h2>Welcome to my <strong>fictitious</strong> website. </h2> 
                             <br />
                             <h3>The sole purpose of this website is to demonstrate my web creation and programming skills.</h3>  
                             <br />
                             <p>I am a recent computer science graduate looking to attain an entry-level position in the information technology field.</p>                                                          
                             <p>This fictitious website serves as an example of some of my skills.</p>
                            <br />
                            
                             <p>All appointments are fake.  Feel free to set and cancel as many as you would like.</p>
                             <p>Please use fake emails and passwords for logging in and registering accounts.</p>


                             <p>This project was created using Javascript, React, PostgreSQL, CSS, and HTML.</p>
                             <p>This project contains a full-stack web development scheme, both client-side and server-side development.</p>
                             <p>Currently, this project is not media responsive and views best on a standard-sized pc monitor.</p>
                             <p> <u><strong>THANK YOU</strong></u> for viewing my work.   <Link style={{marginLeft: '20%'}} to={"/home"}>Continue to Home</Link>     </p>  
                             </div>
                             </div>
                             </>
          );

}



export default Start;