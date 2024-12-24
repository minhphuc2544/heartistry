import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Words.css";

export default function Words() {
    const navigate = useNavigate();

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
                    {[
                        { ID: "1", idWordSet: "1", word: "Unbelievable", note: "信じられない"},
                    ].map((item, index) => (
                        <tr key={index}>
                            <td>{item.ID}</td>
                            <td>{item.idWordSet}</td>
                            <td>{item.word}</td>
                            <td>{item.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}