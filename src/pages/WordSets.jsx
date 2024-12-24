import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/WordSets.css";

export default function WordSets() {
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
                            {[
                                { ID: "1", idUser: "1", topic: "Education", noWords: "120", isRecommended: true },
                                { ID: "2", idUser: "2", topic: "Environment", noWords: "50", isRecommended: false },
                            ].map((item, index) => (
                                <tr contentEditable='true' key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.idUser}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.noWords}</td>
                                    <td>{item.isRecommended ? "true" : "false"}</td>
                                    <td width={200} align="center">
                                        {
                                            !item.isRecommended &&
                                            <input type="image" src="../approved.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}></input>
                                        }
                                    </td>
                                    <td  width={250} align="center"> 
                                        {
                                            item.isRecommended &&
                                            <input type="image" src="../disapproved.svg" style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}></input>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <input type="image" src="../add_wordset.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "60px", height: "60px", marginRight: "10px", position: "fixed", top: "850px", left: "1854px" }}></input>
            </div>
    )
}