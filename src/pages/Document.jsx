import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Document.css";
import Cookies from "js-cookie";

export default function Document() {
    const navigate = useNavigate();
    // for UI's purpose
    const [isAddDialog, setAddDialog] = useState(false); // check if add dialog needs to appear
    // for API's purpose
    const DOCUMENT_PAGE_SIZE = 7; // maximum number of documents can be displayed on a page
    const [documents, setDocuments] = useState([]); // documents on one page of the user
    const [documentPage, setDocumentPage] = useState(0); // current page of the document page
    const [documentLastPage, setDocumentLastPage] = useState(0); // last page of the document page

    // check if the access token is expired, if so, force the user to login again
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            navigate('/login');
        }
    }, []);

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

                    <div className="document_documentArea">
                        <div style={{ display: "flex" }}>
                            <p style={{ fontSize: "50px", fontFamily: "sans-serif", padding: "10px", marginLeft: "20px" }}>Document</p>
                            <div className="document_docMovelist"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                                <input type="image" src="./disabled_leftArrow.svg" onClick={() => documentPage > 0 && setDocumentPage(documentPage - 1)}></input>
                                <p style={{ display: "inline", margin: "auto" }}>{documentPage + 1}</p>
                                <input type="image" src="./enabled_rightArrow.svg" onClick={() => documentPage < documentLastPage && setDocumentPage(documentPage + 1)}></input>
                            </div>

                        </div>
                        <div className="document_documentList">
                            {/* add this div for each document in the list, maximum 7 documents per page */}
                            {documents.length ? documents.map((v, i) => <DocumentRow key={i} documentInfo={v} />) : <p style={{ width: "fit-content", margin: "auto" }} className="no-ws-text">There is no document to display</p>}
                        </div>
                    </div>
                </div>
                <div className="document_addButton">
                    <input type="image" src="./add_wordset.svg" className="document_addDocumentBtn" onClick={() => setAddDialog(true)}></input>
                </div>
            </div>
            {isAddDialog && <AddDialog setAddDialog={setAddDialog} />}
        </>
    );
}

function AddDialog({ setAddDialog }) {
    const [docName, setDocName] = useState('');
    const [docDescription, setDocDescription] = useState('');
    const [docFile, setDocFile] = useState('');
    const [addSignal, setAddSignal] = useState(false);

    useEffect(() => {
        // TODO: codes to upload document to cloudiary, then get the url and post it to MySQL database
        async function uploadFile() {
            // upload file to Google Cloud Storage
            const url = `https://storage.googleapis.com/upload/storage/v1/b/${import.meta.env.VITE_STORAGE_BUCKET}/o?uploadType=media&name=${docName}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': docFile.type,
                    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
                },
                body: docFile,
            });
            if (!response.ok) {
                throw new Error('Failed to upload file');
            }
            const uploadedFile = await response.json();
            const filePublicUrl = `https://storage.cloud.google.com/${import.meta.env.VITE_STORAGE_BUCKET}/${uploadedFile.name}`;

            // get the url and post it to MySQL database
            const requestBody = {
                "name": docName,
                "description": docDescription,
                "url": filePublicUrl,
            }
            const response1 = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/documents/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });
            if (response1.ok) {
                window.alert("Upload document successfully, please wait for approvement from admin");
            }
        }

        if (docFile && docName && docDescription) {
            uploadFile();
        }
    }, [addSignal]);

    return (
        <div className="document_createNewDoc">
            <div>
                <h1 style={{ display: "flex", margin: 15, fontSize: 25, marginBottom: 30 }}>Add new document</h1>
                <input type="image" className="document_unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => setAddDialog(false)}></input>
            </div>
            <input type="text" id="createSetDoc" required placeholder="Document's name" onChange={(e) => setDocName(e.target.value)}></input>
            <input type="text" id="createSetDoc" required placeholder="Document's description" onChange={(e) => setDocDescription(e.target.value)}></input>
            <label htmlFor="file-input" className="document_custom-file-upload">Upload File</label>
            <input accept=".pdf,.doc,.docx,.txt" id="file-input" type="file" onChange={(e) => setDocFile(e.target.files[0])} />
            <input type="button" id="setNameDoc" value={"Create"} onClick={() => setAddSignal(!addSignal)}></input>
        </div>
    )
}

function DocumentRow({ documentInfo }) {
    return (
        <div className="document_documentItem">
            <img src="./pdf_icon.svg" className="document_fileLogo"></img>
            <div className="document_documentInfo">
                <p className="document_documentName">{documentInfo.name}</p>
                <p className="document_documentDescription">{documentInfo.description}</p>
            </div>
            <input type="image" src="./preview_icon.svg" className="document_docButton" onClick={() => { window.open(documentInfo.url) }}></input>
            <a
                href={documentInfo.url}
                download={documentInfo.name}
                className="document_docButton"
            >
                <img src="./download_icon.svg" alt="Download" />
            </a>

        </div>
    );
}