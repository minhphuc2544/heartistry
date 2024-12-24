import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/WordSets.css";

export default function WordSets() {
    const navigate = useNavigate();
    const [wordSets, setWordSets] = useState([]);
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

    useEffect(() => {
        async function fetchWordSets() {
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/wordsets/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            if (response.ok) {
                const responseJson = await response.json();
                console.log(responseJson);
                setWordSets(responseJson);
            }
        }

        fetchWordSets();
    }, []);
    return (
            <div className="wordsets_table-container">
                <div className="wordsets_table-body">
                    <table>
                        <thead className="wordsets_table-header">
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Topic</th>
                                <th>Number of words</th>
                                <th>Is recommended</th>
                                <th>Add to recommend</th>
                                <th>Delete from recommend</th>
                            </tr>
                        </thead>
                        <tbody className="wordsets_table-content">
                            {wordSets.map((item, index) => (
                                <DataRow key={index} wordSetInfo={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <input type="image" src="../add_wordset.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "60px", height: "60px", marginRight: "10px", position: "fixed", top: "850px", left: "1854px" }}></input>
            </div>
    )
}

function DataRow({wordSetInfo}){
    const [isRecommended, setIsRecommended] = useState(wordSetInfo.isRecommended);

    useEffect(() => {
        async function setToRecommend() {
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/wordsets/${wordSetInfo.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify({
                    isRecommended: isRecommended
                })
            });

            if (response.ok) {
                console.log(wordSetInfo.id);
            }
        }
        setToRecommend();
    }, [isRecommended]);
    return (
        <tr>
            <td>{wordSetInfo.id}</td>
            <td>{wordSetInfo.idUser}</td>
            <td>{wordSetInfo.topic}</td>
            <td>{wordSetInfo.noWords}</td>
            <td>{wordSetInfo.isRecommended ? "true" : "false"}</td>
            <td width={200} align="center">
                {
                    !wordSetInfo.isRecommended &&
                    <input type="image" src="../approved.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px"}} onClick={() => setIsRecommended(!isRecommended)}></input>
                }
            </td>
            <td  width={250} align="center"> 
                {
                    wordSetInfo.isRecommended &&
                    <input type="image" src="../disapproved.svg" style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }} onClick={() => setIsRecommended(!isRecommended)}></input>
                }
            </td>
        </tr>
    )
}