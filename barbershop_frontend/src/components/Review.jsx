import React from  "react";
import stars from '../pages/media/stars.png';


const Review = ({name, profileImg, reviewText, reviewLink}) => {


          return(
                             <>
                                <div className="reviewOuter" >
                                  <div className="reviewName" >{<img className="profileImg" src={profileImg} alt="profile affiliation image" />} {name}</div>
                                  <div className="reviewLine">{<img className="starImg" style={{maxWith:'20%'}} src={stars} alt="Rating in Stars" />}</div>                                  
                                  <div className="reviewLine" >Verified Review</div>
                                  <div className="reviewParagraph" >{reviewText}</div> 
                                  <div className="linkLine" > <a href={reviewLink} target={'_blank'}>{reviewLink}</a></div>                                 
                                </div>
                             </>
          );

}



export default Review;