import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Users.css";
import CustomConfirm from "../components/CustomConfirm"
import CustomAlert from "../components/CustomAlert"

export default function User() {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // data for the table

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
                        {data.map((item, index) => <DataRow key={index} userInfo={item} isMySelf={Cookies.get('username') === item.username} setData={setData} />)}
                    </tbody>
                </table>
            </div>
            <input type="image" src="../add_wordset.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "60px", height: "60px", marginRight: "10px", position: "fixed", top: "850px", left: "1854px" }}></input>
        </div>
    );
}

function DataRow({ userInfo, isMySelf, setData }) {
    const [cusConMsg, setCusConMsg] = useState(''); // abbreviation of CustomConfirmMessage
    const [cusAleMsg, setCusAleMsg] = useState(''); // abbreviation of CustomAlertMessages
    const [needDelete, setNeedDelete] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const [fullname, setFullname] = useState(userInfo.fullname);
    const [email, setEmail] = useState(userInfo.email);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
    const [dob, setDob] = useState(userInfo.dob);
    const [gender, setGender] = useState(userInfo.gender);
    const [role, setRole] = useState(userInfo.role);


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
                // remove the deleted use from data
                setData((prevArray) => prevArray.filter((item) => item.id !== userInfo.id));
            }
        }

        if (needDelete) {
            deleteUser();
        }
    }, [needDelete])

    // useEffect's used to update user
    useEffect(() => {
        async function updateUser() {
            const requestBody = {
                fullname: fullname,
                email: email,
                phoneNumber: phoneNumber,
                dob: dob,
                gender: gender,
                role: role,
            };

            console.log(requestBody); console.log(userInfo.id);

            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/${userInfo.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                // notify the changes
                setIsChanged(false);
                setNeedUpdate(false)
                setCusAleMsg("This user's info has been update");
                return;
            }

            // catch errors and notify user
            const responseJson = await response.json();
            let alertMessage = '';
            if (Array.isArray(responseJson.message)) {
                responseJson.message.forEach((v, i) => { alertMessage += `${i + 1}. ${v}\n`; });
            } else {
                alertMessage = `1. ${responseJson.message}`;
            }
            setCusAleMsg(alertMessage);
        }

        if (needUpdate && isChanged) {
            updateUser();
            return;
        }

        setNeedUpdate(false);
        setIsChanged(false);
    }, [needUpdate])

    return (
        <>
            {!isMySelf &&
                <tr onBlur={() => setNeedUpdate(true)}>
                    <td
                        style={{ backgroundColor: "lightgrey" }}
                        children={userInfo.id}
                    />
                    <td
                        contentEditable={true}
                        children={userInfo.fullname}
                        onInput={(e) => { setFullname(e.currentTarget.textContent); setIsChanged(true) }}
                    />
                    <td
                        style={{ backgroundColor: "lightgrey" }}
                        children={userInfo.username}
                    />
                    <td
                        contentEditable={true}
                        children={userInfo.email}
                        onInput={(e) => { setEmail(e.currentTarget.textContent); setIsChanged(true) }}
                    />
                    <td
                        contentEditable={true}
                        children={userInfo.phoneNumber}
                        onInput={(e) => { setPhoneNumber(e.currentTarget.textContent); setIsChanged(true) }}
                    />
                    <td
                        contentEditable={true}
                        children={userInfo.dob}
                        onInput={(e) => { setDob(e.currentTarget.textContent); setIsChanged(true) }}
                    />
                    <td
                        contentEditable={true}
                        children={userInfo.gender}
                        onInput={(e) => { setGender(e.currentTarget.textContent); setIsChanged(true) }}
                    />
                    <td
                        contentEditable={userInfo.role === 'admin' ? 'false' : 'true'}
                        style={userInfo.role === 'admin' ? { backgroundColor: "lightgrey" } : {}}
                        children={userInfo.role}
                        onInput={(e) => { setRole(e.currentTarget.textContent); setIsChanged(true) }}
                    />
                    <td
                        style={{ backgroundColor: "lightgrey" }}
                        children={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(userInfo.createAt))}
                    />
                    <td
                        style={{ backgroundColor: "lightgrey" }}
                        children={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(userInfo.updateAt))}
                    />
                    <td style={{ display: "flex", justifyContent: "center" }}>
                        <input
                            onClick={() => setCusConMsg('This action CANNOT be undone. Are you sure you want to DELETE this user?')}
                            type="image" src="../disapproved.svg"
                            style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}
                        />
                    </td>
                </tr>
            }
            {cusConMsg &&
                <CustomConfirm
                    message={cusConMsg}
                    yesHandler={() => { setNeedDelete(true); setCusConMsg('') }}
                    noHandler={() => { setNeedDelete(false); setCusConMsg('') }}
                />
            }
            {cusAleMsg &&
                <CustomAlert
                    message={cusAleMsg}
                    okHandler={() => { setCusAleMsg('') }}
                />
            }
        </>
    );
}