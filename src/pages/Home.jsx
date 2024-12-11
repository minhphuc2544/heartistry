import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const PAGE_SIZE = 4;
    const [page, setPage] = useState(0);
    const [wordSets, setWordSets] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const [isVisible, setVisible] = useState(true); //show info and button before learn words in word set
    const [isTurn, setTurn] = useState(false); //to change the info on the card when user click (flip the card)
    const [isWordSetOpen, setWordSetOpen] = useState(false); //check if word set is opened
    const [isEditWordSet, setWordSetEdit] = useState(false); // check if user is editing word set
    const [isAddNewWord, setAddNewWord] = useState(false); //check if user is adding new word to word set
  
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

            setWordSets(responseJson.response);
            setLastPage(Math.floor(responseJson.pagination.total / PAGE_SIZE));
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
                            <input type="image" src="../enabled_rightArrow.svg" onClick={ () => page < lastPage && setPage(page + 1) }></input>
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        { wordSets.length !== 0 ? wordSets.map((v, i) => <WordSetCard key={i} wordSetInfo={v} />) : <p>There's no wordsets</p> }
                    </div>
                </div>



                <div className="userInfo">
                    <img className="userPicture" src="./logo.svg"></img> {/*user avatar*/}
                    <p className="username">Heartistry</p> {/*username*/}
                    <div className="duration">
                        <div style={{ display: "block", margin: 20 }}>
                            <p>Words</p>
                            <p>100</p>
                        </div>
                        <div className="dashboard_separator"></div>
                        <div style={{ display: "block", margin: 20 }}>
                            <p>Days</p>
                            <p>90</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="statistic">

            </div>
            <WordSetPopUp isWordSetOpen={isWordSetOpen} isTurn={isTurn} isVisible={isVisible} setVisible={setVisible} setTurn={setTurn} setWordSetOpen={setWordSetOpen} isEditWordSet={isEditWordSet} setWordSetEdit={setWordSetEdit} isAddNewWord={isAddNewWord} setAddNewWord={setAddNewWord} />
            <AddNewWord isAddNewWord={isAddNewWord} setAddNewWord={setAddNewWord} />

        </div>

    );
}

function WordSetCard({ wordSetInfo }) {
    return (
        <div className="set">
            <p className="topic">{wordSetInfo.topic}</p>
            <p className="wordNumbers">Number of words: {wordSetInfo.noWords}</p>  {/*show number of words in this wordset*/}
            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
        </div>
    );
}

function WordSetPopUp({ isWordSetOpen, isTurn, isVisible, setVisible, setTurn, setWordSetOpen, isEditWordSet, setWordSetEdit, isAddNewWord, setAddNewWord})
{
    return (<>
        {
            isWordSetOpen &&
            <div className="pop_up">
                <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setWordSetOpen(false); setVisible(true); setTurn(false) }}></input>
                {isVisible ? <>
                    <h1 className="wordSet_topic">Education</h1>
                    <p className="vcb_count">Vocabulary count: 234 words</p>
                    <button className="start" onClick={() => setVisible(!isVisible)}>Start</button>
                    <button className="editWordSet" onClick={() => setWordSetEdit(true)}>Edit word set</button>
                </> : <>
                    <div className="card" onClick={() => setTurn(!isTurn)}>
                        {
                            isTurn ? <>
                                <div className="back">
                                    <div style={{ display: "flex", justifyContent: "center", fontSize: 40, marginBottom: 20 }}>
                                        <p className="word">Flash card</p>
                                        <p className="wordType">(n)</p>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <p className="phonetic"><b>Phonetic:</b>{ }/ˈflæʃˌkɑɹd/</p>
                                    </div>
                                    <p className="meaning"><b>Meaning:</b>{ } Thẻ thông tin</p>
                                    <p className="definition"><b>Definition:</b>{ } a card with a word or picture on it that is used to help students learn</p>
                                    <p className="example"><b>Example:</b>{ } She is learning math with flash cards.</p>
                                    <p className="note"><b>Note:</b>{ } Note những điều cần lưu ý về từ</p>
                                </div>
                            </> :
                                <>
                                    <div className="front">
                                        <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 60, wordWrap: "break-word" }}>FlashCard</p>
                                    </div>
                                </>
                        }
                    </div>
                </>}
                {
                    isEditWordSet &&
                    <>
                        <div className="editWS">
                            <input type="text" className="editTopic" defaultValue={"Education"}></input>
                            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                                <input type="image" src="./disabled_leftArrow.svg"></input>
                                {/* <p style={{ display: "inline" }}>{ page + 1 }</p> */}
                                <input type="image" src="./enabled_rightArrow.svg"></input>
                                <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setWordSetEdit(false) }}></input>
                            </div>

                            <div className="wordList">
                                <div style={{ display: "flex" }}> {/*add this div to add word in this list */}
                                    <input type="text" className="editInfo" defaultValue={"word1"}></input>
                                    <input type="text" className="editInfo" defaultValue={"note1"}></input>
                                    <input type="image" className="deleteWord" src="./unfocused_cancel.svg" style={{ padding: "1px" }}></input>
                                </div>

                            </div>
                            <div style={{ display: "flex" }}>
                                <button className="editBtn" style={{ backgroundColor: "#81C784" }} onClick={() => { setAddNewWord(true) }}>Add new word</button>
                                <button className="editBtn " style={{ backgroundColor: "#FFEB3B" }}>Apply change</button>
                            </div>
                        </div>
                    </>

                }
            </div>
        }
    </>)
}

function AddNewWord({ isAddNewWord, setAddNewWord }) {
    return (
        <>
            {
                isAddNewWord &&
                <div className="addNewWord">
                    <div style={{ display: "flex" }}>
                        <input type="text" className="findWord" placeholder="Type the word you want to add"></input>
                        <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => setAddNewWord(false)}></input>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", fontSize: 40, marginTop: 20 }}>
                        <p className="word">Flash card</p>
                        <p className="wordType">(n)</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p className="info phonetic"><b>Phonetic:</b>{ }/ˈflæʃˌkɑɹd/</p>
                    </div>
                    <p className="info meaning"><b>Meaning:</b>{ } Thẻ thông tin</p>
                    <p className="info definition"><b>Definition:</b>{ } a card with a word or picture on it that is used to help students learn</p>
                    <p className="info example"><b>Example:</b>{ } She is learning math with flash cards.</p>
                    <div style={{ display: "flex" }}>
                        <p className="info note"><b>Note:</b></p>
                        <input type="text" className="addNote"></input>
                    </div>
                    <input type="button" value={"Add"} className="addWord"></input>
                </div>
            }
        </>
    )
}