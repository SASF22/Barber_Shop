import React from  "react";




const About = () => {


          return(
                             <>
                             <div className="aboutOuterContainer" >
                             <div id="aboutContainer">
                             <h1>THE SQUAD</h1> 
                             <h2>Meet the team</h2>
                             <div className="aboutBarber" ><img src="/src/pages/media/barberA.png" type="" alt="Profile picture of Marc Lamont"/><div className="aboutBio"><p>Marc Lamont:</p><p>Marc has beeen a barber for 20 years.</p><p>Marc was born in Alabama and hobbies include playing basketball and restoring cars.</p></div> </div>
                             <div className="aboutBarber"><img src="/src/pages/media/barberD.png" type="" alt="Profile picture of Chad Hubrik"/><div className="aboutBio"><p>Chad Hubrik:</p><p>Chad has beeen a barber for 11 years.</p><p>Chad was born in Florida and hobbies include surfing and skydiving.</p></div></div>
                             <div className="aboutBarber"><img src="/src/pages/media/barberC.png" type="" alt="Profile picture of Javier 'Javi' Espinosa" /> <div className="aboutBio"><p>Javier 'Javi' Espinosa:</p><p>Javi has beeen a barber for 13 years.</p><p>Javi was born in California and hobbies include soccer and driving low riders.</p></div></div>
                             <div className="aboutBarber"><img src="/src/pages/media/barberB.png" type="" alt="Profile picture of Dwayne Jackson" /> <div className="aboutBio" ><p>Dwayne Jackson:</p><p>Dwayne has beeen a barber for 5 years.</p><p>Dwayne was born in Oregon and hobbies include gaming and paintball.</p></div></div>
                            </div>
                            </div>

                             </>
          );

}



export default About;