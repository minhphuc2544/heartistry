import "../styles/PasswordRecovery.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert"
export default function PasswordRecovery() {
    const baseUrl = import.meta.env.BASE_URL;
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submitSignal, setSubmitSignal] = useState(false);
    const [cusAleMsg, setCusAleMsg] = useState(''); // abbreviation of CustomAlertMessage

    useEffect(() => {
        async function postPasswordRecoveryInfo() {
            const requestBody = {
                "username": username,
                "email": email,
                "phoneNumber": phoneNumber
            };

            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/password_recovery`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                navigate('/login', { state: requestBody });
                return;
            }
            if (!response.ok) {
                // catch errors and notify user (response code 401)
                setCusAleMsg("Check your information again!" + "\nWe can not find your account" );
                return;
            }
        }

        if (username && email && phoneNumber) {
            postPasswordRecoveryInfo();
        }
    }, [submitSignal]);
    return (
        <div className="login">
            <div className="rightContainer3">
                <div className="passRecoArea">
                    <form className="form3">
                        <div className="passRecoInfo3">
                            <h1 style={{ fontSize: 50, textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0 }}>Recover your password</h1>
                            <p style={{ fontSize: 25, textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", marginBottom: 50, marginTop: 0 }}>Just fill in these information and we will get you back on track</p>
                            <div className="infoContainer">
                                <label className="label">Username</label><br></br>
                                <input type="text" className = "input" id="username" required onChange={(e) => setUsername(e.target.value)} /><br></br>
                                <label className="label">Email</label><br></br>
                                <input type="email" className = "input" id="password" required onChange={(e) => setEmail(e.target.value)}/><br></br> 
                                <label className="label">Phone Number</label><br></br>
                                <input type="phoneNumber" className = "input" id="phoneNumber" required onChange={(e) => setPhoneNumber(e.target.value)}/><br></br> 
                            </div>
                            <div className="action">
                                <input type="button" id="submit" onClick={() => setSubmitSignal(!submitSignal)} value={"RECEIVE NEW PASSWORD"}></input><br></br>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="leftContainer3">
                <img src="./password_recovery.svg" alt="logo" width={800} height={800}></img>
            </div>
            {cusAleMsg && <CustomAlert message={cusAleMsg} okHandler={() => { setCusAleMsg('') }} />}
        </div>
    );
}