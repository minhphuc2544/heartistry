import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const PAGE_SIZE = 4;
    const [page, setPage] = useState(0);
    const [wordSets, setWordSets] = useState([]);
    
    // check if the access token is expired, if so, force the user to login again
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            // navigate('/login');
        }
    }, []);

    // useEffect uses to get a page of wordset
    useEffect(() => {
        async function getWordSetPage() {

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/wordsets/me?page=${page}&pageSize=${PAGE_SIZE}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get('access_token')}`
                    }
                }
            );

            const responseJson = await response.json();
            
            setWordSets(responseJson);
        }

        getWordSetPage()
    }, [page])

    return (
        <div className="home">
            <div className="upper">

                <div className="wordSets">
                    <div style={{ display: "flex" }}>
                        <h1 className="title">Word Sets</h1>
                        <div className="moveList"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                            <input type="image" src="../disabled_leftArrow.svg" onClick={ () => page > 0 && setPage(page - 1) }></input>
                            <p style={{ display: "inline" }}>{ page + 1 }</p>
                            <input type="image" src="../enabled_rightArrow.svg" onClick={ () => wordSets.length && setPage(page + 1) }></input>
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        { wordSets.length !== 0 ? wordSets.map((v, i) => <WordSetCard key={i} wordSetInfo={v} />) : <p>There's no more wordsets</p> }
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

function WordSetCard({ wordSetInfo }) {
    return (
        <div className="set">
            <p className="topic">{ wordSetInfo.topic }</p>
            <p className="wordNumbers">Number of words: { wordSetInfo.noWords }</p>  {/*show number of words in this wordset*/}
            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
        </div>
    );
}