import { useState, useEffect } from "react";
import "../styles/Document.css";

export default function Document() {
    // for UI's purpose
    const [isAddDialog, setAddDialog] = useState(false); // check if add dialog needs to appear
    // for API's purpose
    const DOCUMENT_PAGE_SIZE = 7; // maximum number of documents can be displayed on a page
    const [documents, setDocuments] = useState([]); // documents on one page of the user
    const [documentPage, setDocumentPage] = useState(0); // current page of the document page
    const [documentLastPage, setDocumentLastPage] = useState(0); // last page of the document page


    // useEffect uses to get a page of documents
    useEffect(() => {
        async function getDocumentPage() {

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/documents/me/pagination?page=${documentPage}&pageSize=${DOCUMENT_PAGE_SIZE}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            const responseJson = await response.json();

            setDocuments(responseJson.response);
            setDocumentLastPage(Math.ceil(responseJson.pagination.total / DOCUMENT_PAGE_SIZE) - 1);
        }

        getDocumentPage()
    }, [])

    return (
        <>
            <div className="document">
                <div style={{ display: "flex" }}>

                    <div className="documentArea">
                        <div style={{ display: "flex" }}>
                            <p style={{ fontSize: "50px", fontFamily: "sans-serif", padding: "10px", marginLeft: "20px" }}>Document</p>
                            <div className="docMovelist"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                                <input type="image" src="./disabled_leftArrow.svg" onClick={() => documentPage > 0 && setDocumentPage(documentPage - 1)}></input>
                                <p style={{ display: "inline", margin: "auto" }}>{documentPage + 1}</p>
                                <input type="image" src="./enabled_rightArrow.svg" onClick={() => documentPage < documentLastPage && setDocumentPage(documentPage + 1)}></input>
                            </div>

                        </div>
                        <div className="documentList">
                        {/* add this div for each document in the list, maximum 7 documents per page */}
                            { documents.length ? documents.map((v, i) => <DocumentRow key={i} documentInfo={v}/>) : <p style={{width: "fit-content"}} className="no-ws-text">There's no document</p> }
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
            { true && <AddDialog/> }
        </>
    );
}

function AddDialog({  }) {
    return (
        <div className="createNewDoc">
            <div>
                <h1 style={{ display: "flex", margin: 15, fontSize: 25, marginBottom: 30 }}>Create new document</h1>
                <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg"></input>
            </div>
            <input type="text" id="createSetDoc" required placeholder="Document's name"></input>
            <input type="text" id="createSetDoc" required  placeholder="Document's description"></input>
            <label for="file-input" class="custom-file-upload">Upload File</label><input id="file-input" type="file" />
            <input type="button" id="setNameDoc" value={"Create"}></input>
        </div>
    )
}

function DocumentRow({ documentInfo }) {
    return (
        <div className="documentItem"> 
            <img src="./pdf_icon.svg" className="fileLogo"></img>
            <div className="documentInfo">
                <p className="documentName">Ielts document for beginner.pdf</p>
                <p className="documentDescription">reading and writing tips with clear instruction</p>
            </div>
            <input type="image" src="./preview_icon.svg" className="docButton"></input>
            <input type="image" src="./download_icon.svg" className="docButton"></input>
        </div>
    );
}