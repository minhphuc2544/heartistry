import { useState } from "react";
import "../styles/FlashCard.css"
import { useEffect } from "react";

export default function FlashCard() {
    const [submitSignal, setSubmitSignal] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isTurn, setTurn] = useState(false);
    //useEffect will run at the first time render the web.
    useEffect(() => {
        setVisible(!isVisible);
    }, [submitSignal])

    useEffect(() => {
        setTurn(isTurn);
    }, [isTurn])
    return (
        <>
            <div className="flashcard">
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
                            <div className="createSet">
                                <input type="image" id="create" src="./add_wordset.svg"></input>
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

                <h1 className="rcmTitle">Our recommend word sets</h1>
                <div className="rcmWordSets">
                    <div style={{ display: "flex" }}>

                        <div className="rcmSet">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <div style={{ display: "flex", justifyContent: "right", marginTop: 35, marginRight: 10 }}>
                                <input type="image" id="add" className="rcmButton" src="./preview.svg" style={{ padding: 10 }}></input>
                                <input type="image" id="preview" className="rcmButton" src="./add_wordset.svg" style={{ padding: 5 }}></input>
                            </div>
                        </div>

                        <div className="rcmSet">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <div style={{ display: "flex", justifyContent: "right", marginTop: 35, marginRight: 10 }}>
                                <input type="image" id="add" className="rcmButton" src="./preview.svg" style={{ padding: 10 }}></input>
                                <input type="image" id="preview" className="rcmButton" src="./add_wordset.svg" style={{ padding: 5 }}></input>
                            </div>
                        </div>

                        <div className="rcmSet">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <div style={{ display: "flex", justifyContent: "right", marginTop: 35, marginRight: 10 }}>
                                <input type="image" id="add" className="rcmButton" src="./preview.svg" style={{ padding: 10 }}></input>
                                <input type="image" id="preview" className="rcmButton" src="./add_wordset.svg" style={{ padding: 5 }}></input>
                            </div>
                        </div>
                        <div className="rcmSet">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <div style={{ display: "flex", justifyContent: "right", marginTop: 35, marginRight: 10 }}>
                                <input type="image" id="add" className="rcmButton" src="./preview.svg" style={{ padding: 10 }}></input>
                                <input type="image" id="preview" className="rcmButton" src="./add_wordset.svg" style={{ padding: 5 }}></input>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="pop_up">
                <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg"></input>
                {isVisible ? <>
                    <h1 className="wordSet_topic">Education</h1>
                    <p className="vcb_count">Vocabulary count: 234 words</p>
                    <button className="start" onClick={() => setSubmitSignal(!submitSignal)}>Start</button>
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
            </div>
        </>
    );
}