import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/ApproveDocuments.css";
import CustomAlert from "../components/CustomAlert";
import CustomConfirm from "../components/CustomConfirm"

export default function ApproveDocuments() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [reloadSignal, setReloadSignal] = useState(false);
    const [needAdd, setNeedAdd] = useState(false);

    // check if the token is existed and user has 'user' role
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            navigate('/login');
            return;
        }
        const role = Cookies.get('role');
        if (role === 'user') {
            navigate('/')
        }
    }, []);

    // fetch all documents
    useEffect(() => {
        async function fetchDocuments() {
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/documents/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            if (response.ok) {
                const responseJson = await response.json();
                setData(responseJson);
            }
        }

        fetchDocuments();
    }, [reloadSignal]);

    return (
        <div className="wordsets_table-container">
            <div className="wordsets_table-body">
                <table>
                    <thead className="wordsets_table-header">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>Is approved</th>
                            <th>Approve</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="wordsets_table-content">
                        {data.map((item, index) => <DataRow key={index} documentInfo={item} />)}
                        {needAdd && <AddRow setReloadSignal={setReloadSignal} setNeedAdd={setNeedAdd} />}
                    </tbody>
                </table>
            </div>
            <input
                onClick={() => setNeedAdd(!needAdd)}
                type="image" src={needAdd ? "../disapproved.svg" : "../add_wordset.svg"}
                style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "60px", height: "60px", marginRight: "10px", position: "fixed", top: "850px", left: "1854px" }}
            />
        </div>
    );
}

function DataRow({ documentInfo }) {
    const [isApproved, setIsApproved] = useState(documentInfo.isApproved);

    return (
        <tr>
            <td
                style={{ backgroundColor: "lightgrey" }}
            >{documentInfo.id}</td>
            <td
                style={{ backgroundColor: "lightgrey" }}
            >{documentInfo.idUser}</td>
            <td
                contentEditable='true'
                suppressContentEditableWarning={true}
            >{documentInfo.name}</td>
            <td
                contentEditable='true'
                suppressContentEditableWarning={true}
            >{documentInfo.description}</td>
            <td
                style={{ backgroundColor: "lightgrey", wordBreak: "break-word" }}
            ><a href={documentInfo.url}>{documentInfo.url}</a></td>
            <td
                style={{ backgroundColor: "lightgrey" }}
            >{documentInfo.isApproved ? "true" : "false"}</td>
            <td>
                {!documentInfo.isApproved ?
                    <div>
                        <input
                            type="image"
                            src="../approved.svg"
                            style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}
                            onClick={() => setIsApproved(!isApproved)}
                        ></input>
                    </div> :
                    <div>
                        <input
                            type="image"
                            src="../disapproved.svg"
                            style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px" }}
                            onClick={() => setIsApproved(!isApproved)}
                        ></input>
                    </div>
                }
            </td>
            <td>
                {documentInfo.isApproved &&
                    <button style={{ fontSize: "15px", padding: "5px", backgroundColor: "#D23232", color: "white", border: "none", borderRadius: "5px" }}>Delete</button>
                }
            </td>
        </tr>
    );
}

function AddRow({ setReloadSignal, setNeedAdd }) {
    const [docName, setDocName] = useState('');
    const [docDescription, setDocDescription] = useState('');
    const [docFile, setDocFile] = useState('');
    const [needCreate, setNeedCreate] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [cusAleMsg, setCusAleMsg] = useState('');

    useEffect(() => {
        // TODO: codes to upload document to cloudiary, then get the url and post it to MySQL database
        async function uploadFile() {
            setIsUploading(true);
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
            const filePublicUrl = `https://storage.cloud.google.com/${import.meta.env.VITE_STORAGE_BUCKET}/${encodeURIComponent(uploadedFile.name)}`;

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
                setIsUploading(false);
                setReloadSignal(old => !old);
                setNeedAdd(false);
                setCusAleMsg("Upload document successfully");
            }
        }

        if (needCreate) {
            uploadFile();
        }
    }, [needCreate]);

    return (
        <>
            <tr>
                <td style={{ backgroundColor: "lightgrey" }}></td>
                <td style={{ backgroundColor: "lightgrey" }}></td>
                <td contentEditable='true' onInput={(e) => setDocName(e.currentTarget.textContent)} />
                <td contentEditable='true' onInput={(e) => setDocDescription(e.currentTarget.textContent)} />
                <td style={{ textAlign: "center" }}>
                    <label
                        htmlFor="file-input"
                        className={isUploading ? "upload-button-disable" : "upload-button"}
                        onClick={(e) => {
                            if (!docName) {
                                e.preventDefault();
                                setCusAleMsg("Please enter document's name");
                                return;
                            }
                            if (!docDescription) {
                                e.preventDefault();
                                setCusAleMsg("Please enter document's description");
                            }
                        }}
                    >{isUploading ? "Uploading..." : "Upload"}</label>
                    <input
                        accept=".pdf,.doc,.docx,.txt"
                        id="file-input"
                        type="file"
                        onChange={(e) => {
                            setDocFile(e.target.files[0]);
                            setNeedCreate(true);
                        }}
                    />
                </td>
                <td style={{ backgroundColor: "lightgrey" }}></td>
                <td style={{ backgroundColor: "lightgrey" }}></td>
                <td style={{ backgroundColor: "lightgrey" }}></td>
            </tr>
            {cusAleMsg &&
                <CustomAlert
                    message={cusAleMsg}
                    okHandler={() => { setCusAleMsg('') }}
                />
            }
        </>
    );
}