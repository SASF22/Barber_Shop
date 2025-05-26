import React from  "react";
import stars from  './media/stars.png';
import Review from "../components/Review";



const SocialMedia = () => {


          return(
                             <>
                             <div className="socialMediaOuter">
                             <div className="socialMediaHeaders">
                              <div className="socialMediaTitle"><h1>MARC L's Cuts, Trims, and Wins</h1></div>
                              <div className="socialMediaTitle"><h1 style={{textAlign:'center'}}>Reviews</h1></div>  
                             </div>
                             <div className="socialMediaBody">
                                <div className="socialMediaReviews">
                                    <Review 
                                        name={'Seth Battle'}
                                        profileImg={"/src/pages/media/images.png"}
                                        reviewText={'This is hands down one of the best barber shops in town!!!!!'}
                                        reviewLink={"https://www.linkedin.com/in/seth-battle-b0866226b/"}
                                    />
                                    <Review 
                                        name={'Seth Battle'}
                                        profileImg={"/src/pages/media/git.png"}
                                        reviewText={'What an awesome barber shop.  I definitely recommend!'}
                                        reviewLink={"https://sasf22.github.io/Resume/"} 
                                    />                                                            
                                </div>
                                <div className="socialMediaImage">
                                    <img src="/src/pages/media/scissor_comb.png"  alt={'Picture of scissors and comb'} />

                                </div>
                             </div>
                             </div>
                           
                             </>
          );

}



export default SocialMedia;