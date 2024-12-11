import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();
    
    // check if the access token is expired, if so, force the user to login again
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            // navigate('/login');
        }
    }, []);

    return (
        <div className="home">
            <div className="upper">

                <div className="wordSets">
                    <div style={{ display: "flex" }}>
                        <h1 className="title">Word Sets</h1>
                        <div className="moveList"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                            <input type="image" src="../disabled_leftArrow.svg"></input>
                            <input type="image" src="../enabled_rightArrow.svg"></input>
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        <div className="set">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
                        </div>
                        <div className="set">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
                        </div>
                        <div className="set">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
                        </div>
                        <div className="set">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
                        </div>
                    </div>
                </div>


                
                <div className="userInfo">
                    <img className="userPicture" src="./logo.svg"></img> {/*user avatar*/}
                    <p className="username">Heartistry</p> {/*username*/}
                    <div className="duration">
                            <div style={{display: "block", margin: 20}}>
                                <p>Words</p>
                                <p>100</p>
                            </div>
                            <div className="dashboard_separator"></div>
                            <div style={{display: "block", margin: 20}}>
                                <p>Days</p>
                                <p>90</p>
                            </div>
                    </div>
                </div>
            </div>

            <div className="statistic">

            </div>
        </div>
    );
}