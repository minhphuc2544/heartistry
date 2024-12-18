import { useState } from "react";
import "../styles/Dictionary.css"
export default function Dictionary() {
    const [isAddToWordSet, setAddToWordSet] = useState(false); //check if user add word to word set
    return (
        <div className="dictionary">

            <div style={{ display: "flex" }}>
                <input type="text" className="searchBar" placeholder="Search"></input>
                <div className="dictionaryUserInfo">
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

            <div className="searchResult">
                <div style={{ display: "flex", width: "940px", justifyContent: "center", fontSize: "45px" }} >
                    <p className="word">English</p>
                    <p style={{ whiteSpace: "pre" }}> (</p>
                    <p className="partOfSpeech">noun</p>
                    <p>)</p>
                </div>
                <br></br>
                <div style={{ display: "flex" }}>
                    <p style={{ whiteSpace: "pre", fontSize: "40px", color: "" }}>Phontetic: </p>
                    <p className="phonetics part">/ˈɪŋ.ɡlɪʃ/</p>
                </div>
                <br></br>
                <div style={{ display: "flex" }}>
                    <p style={{ whiteSpace: "pre", fontSize: "40px", color: "" }}>Definition: </p>
                    <p className="definition part">the language that is spoken in the UK, the US, and in many other countries</p>
                </div>
                <br></br>
                <div style={{ display: "flex" }}>
                    <p style={{ whiteSpace: "pre", fontSize: "40px", color: "" }}>Example: </p>
                    <p className="example part">Do you speak English?</p>
                </div>
                <button className="addToWordSet" onClick={() => setAddToWordSet(true)}>Add to word set</button>
            </div>
            <AddWordToWortSet isAddToWordSet={isAddToWordSet} setAddToWordSet={setAddToWordSet} />
        </div>
    );
}

function AddWordToWortSet({ isAddToWordSet, setAddToWordSet }) {
    return (
        <>
            {
                isAddToWordSet &&
                <div className="chooseWordSet">
                    <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setAddToWordSet(false) }}></input>
                    <h1 style={{ textAlign: "center", fontSize: "45px", fontFamily: "cursive" }}>Add word to word set</h1>
                    <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                        <input type="image" src="./disabled_leftArrow.svg" onClick={() => wordPage > 0 && setWordPage(wordPage - 1)}></input>
                        {/* <p style={{ display: "inline", margin: "auto" }}>{wordPage + 1}</p> */}
                        <input type="image" src="./enabled_rightArrow.svg" onClick={() => wordPage < wLastPage && setWordPage(wordPage + 1)}></input>
                    </div>
                    <div className="wordsetList"> {/*  add this one to add more word sets, 5 word sets per pages */}
                        <div className="wordsetInfo">
                            <p className="wordsetName" style={{ fontSize: "35px" }}>Education</p>
                            <p className="wordsetWordNumber">Number of Words: 230</p>
                        </div>
                        <button className="add">Add</button>
                    </div>
                </div>
            }
        </>
    );
}