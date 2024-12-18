import "../styles/Dictionary.css"
export default function Dictionary() {
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
                <div style={{ display: "flex", width: "940px", justifyContent: "center", fontSize: "45px"}} >
                    <p className="word">English</p>
                    <p style={{whiteSpace: "pre"}}> (</p>
                    <p className="partOfSpeech">noun</p>
                    <p>)</p>
                </div>
                <br></br>
                <div style={{ display: "flex" }}>
                    <p style={{whiteSpace: "pre",  fontSize: "40px", color: ""}}>Phontetic: </p>
                    <p  className="phonetics part">/ˈɪŋ.ɡlɪʃ/</p>
                </div>
                <br></br>
                <div style={{display: "flex"}}>
                    <p style={{whiteSpace: "pre", fontSize: "40px", color: ""}}>Definition: </p>
                    <p className="definition part">the language that is spoken in the UK, the US, and in many other countries</p>
                </div>
                <br></br>
                <div style={{display: "flex"}}>
                    <p style={{whiteSpace: "pre",  fontSize: "40px", color: ""}}>Example: </p>
                    <p className="example part">Do you speak English?</p>
                </div>

                <button className="addToWordSet">Add to word set</button>
            </div>

        </div>
    );
}