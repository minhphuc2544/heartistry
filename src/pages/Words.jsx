import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Words.css";

export default function Words() {
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
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
       async function fetchWords() {
            const response = await fetch (`${import.meta.env.VITE_TASK_API_BASE_URL}/words/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setWords(data);
            }
               
        }
    fetchWords();
    }, []);

    return (
        <div className="words_table-container">
        <div className="words_table-body">
            <table>
                <thead className="words_table-header">
                    <tr>
                        <th>ID</th>
                        <th>Word Set ID</th>
                        <th>Word</th>
                        <th>Note of words</th>
                    </tr>
                </thead>
                <tbody className="words_table-content">
                    {words.map((item, index) => <DataRow key={index} wordInfo={item} />)}
                </tbody>
            </table>
        </div>
    </div>
    )
}

function DataRow({wordInfo}) {
    return (
        <tr>
            <td>{wordInfo.id}</td>
            <td>{wordInfo.idWordSet}</td>
            <td>{wordInfo.word}</td>
            <td>{wordInfo.note}</td>
        </tr>
    )
}
