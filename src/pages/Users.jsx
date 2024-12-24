import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Users.css";
import CustomConfirm from "../components/CustomConfirm"

export default function User() {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // data for the table
    const [cusConMsg, setCusConMsg] = useState(''); // abbreviation of CustomConfirmMessage
    
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

    // useEffect's used to get all the user from the database
    useEffect(() => {
        async function getAllUsers() {
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/all`, {
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

        getAllUsers();
    }, []);
    
    return (
        <>
            <div className="user_table-container">
                <div className="user_table-body">
                    <table>
                        <thead className="user_table-header">
                            <tr>
                                <th>ID</th>
                                <th>Full name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Created Day</th>
                                <th>Last online day</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="user_table-content">
                            { data.map((item, index) => <DataRow key={index} userInfo={item} />) }
                        </tbody>
                    </table>
                </div>
                <input type="image" src="../add_wordset.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "60px", height: "60px", marginRight: "10px", position: "fixed", top: "850px", left: "1854px" }}></input>
            </div>
            { cusConMsg &&
                <CustomConfirm
                    message={cusConMsg}
                    yesHandler={ () => {} }
                    noHandler={ () => {} }
                />
            }
        </>
    );
}

function DataRow({ userInfo }) {
    const [needDelete, setNeedDelete] = useState(false);

    // useEffect's used to delete user
    useEffect(() => {
        async function deleteUser() {
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/${userInfo.id}`, {
                method: "DELETE",
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

        if (needDelete) {
            deleteUser();
        }
    }, [needDelete])

    return (
        <tr>
            <td style={{backgroundColor: "lightgrey"}}>{userInfo.id}</td>
            <td contentEditable='true'>{userInfo.fullname}</td>
            <td style={{backgroundColor: "lightgrey"}}>{userInfo.username}</td>
            <td contentEditable='true'>{userInfo.email}</td>
            <td contentEditable='true'>{userInfo.phoneNumber}</td>
            <td contentEditable='true'>{userInfo.dob}</td>
            <td contentEditable='true'>{userInfo.gender}</td>
            <td
                contentEditable={ userInfo.role === 'admin' ? 'false' : 'true' }
                style={userInfo.role === 'admin' ? {backgroundColor: "lightgrey"} : {}}
                children={userInfo.role}
            />
            <td
                style={{backgroundColor: "lightgrey"}}
                children={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(userInfo.createAt))}
            />
            <td
                style={{backgroundColor: "lightgrey"}}
                children={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(userInfo.updateAt))}
            />
            <td style={{ display: "flex", justifyContent: "center" }}>
                <input
                    onClick={ () => setNeedDelete(true) }
                    type="image" src="../disapproved.svg"
                    style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}
                />                                
            </td>
        </tr>
    );
}