import "../styles/Document.css";
export default function Document() {
    return (
        <div className="document">
            <div style={{ display: "flex" }}>

                <div className="documentArea">
                    <div style={{ display: "flex" }}>
                        <p style={{ fontSize: "50px", fontFamily: "sans-serif", padding: "10px", marginLeft: "20px" }}>Document</p>
                        <div className="docMovelist"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                            <input type="image" src="./disabled_leftArrow.svg" onClick={() => wordSetPage > 0 && setWordSetPage(wordSetPage - 1)}></input>
                            {/* <p style={{ display: "inline", margin: "auto" }}>{wordSetPage + 1}</p> */}
                            <input type="image" src="./enabled_rightArrow.svg" onClick={() => wordSetPage < wsLastPage && setWordSetPage(wordSetPage + 1)}></input>
                        </div>

                    </div>
                    <div className="documentList">
                    {/* add this div for each document in the list */}
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
                        </div>
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
                        </div>
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
                        </div>
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
                        </div>
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
                        </div>
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
                        </div>
                        <div className="documentItem"> 
                            <img src="./pdf_icon.svg" className="fileLogo"></img>
                            <div className="documentInfo">
                                <p className="documentName">Ielts document for beginner.pdf</p>
                                <p className="documentDescription">reading and writing tips with clear instruction</p>
                            </div>
                            <input type="image" src="./preview_icon.svg" className="docButton"></input>
                            <input type="image" src="./download_icon.svg" className="docButton"></input>
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
        </div>
    );
}