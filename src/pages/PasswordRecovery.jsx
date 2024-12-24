import "../styles/PasswordRecovery.css"
import { useEffect, useState } from "react";
export default function PasswordRecovery() {
    const baseUrl = import.meta.env.BASE_URL;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submitSignal, setSubmitSignal] = useState(false);

    useEffect(() => {
        async function postPasswordRecoveryInfo() {
            const requestBody = {
                "username": username,
                "email": email,
                "phoneNumber": phoneNumber
            };

            const response = await fetch(`${baseUrl}/users/password_recovery`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                navigate('/otp', { state: requestBody });
                return;
            }

            const responseJson = await response.json();
            let alertMessage = '';

            if (Array.isArray(responseJson.message)) {
                responseJson.message.forEach((v, i) => { alertMessage += `${i + 1}. ${v}\n`; });
            } else {
                alertMessage = `1. ${responseJson.message}`;
            }

            window.alert(alertMessage);
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
        </div>
    );
}