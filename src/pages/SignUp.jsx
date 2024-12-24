import "../styles/SignUp.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert"

export default function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [gender, setGender] = useState("male");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submitSignal, setSubmitSignal] = useState(false);
    const [cusAleMsg, setCusAleMsg] = useState(''); // abbreviation of CustomAlertMessage
    
    useEffect(() => {
        async function postSignUpInfo() {
            const requestBody = {
                "username": username,
                "password": password,
                "fullname": fullname,
                "gender": gender,
                "dob": dob,
                "email": email,
                "phoneNumber": phoneNumber
            };

            // call api
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            
            // navigate if response code is 200
            if (response.ok) {
                navigate('/otp', { state: requestBody });
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
            
            cusAleMsg(alertMessage);
        }
        
        if (username && password && fullname && gender && dob && email && phoneNumber) {
            postSignUpInfo();
        }
    }, [submitSignal]);
   
    return (
        <>
            <div className="signup">
                <div className="rightPart">
                    <div className="signUpArea">
                        <p style={{ fontSize: 50, textAlign: "center", fontFamily: "'Segoe UI'", position: "fixed", bottom: "770px" }}>Create new account</p>
                        <form className="signUpForm">
                            <div>
                                <label className="signup_label">Username</label><br></br>
                                <input className="signup_input" type="text" required onChange={ (e) => setUsername(e.target.value) }></input>
                            </div>
                            <div>
                                <label className="signup_label">Password</label><br></br>
                                <input className="signup_input" type="password" required onChange={ (e) => setPassword(e.target.value) }></input>
                            </div>
                            <div>
                                <label className="signup_label">Full name</label><br></br>
                                <input className="signup_input" type="text" required onChange={ (e) => setFullname(e.target.value) }></input>
                            </div>
                            <div>
                                <label className="signup_label">Gender</label><br></br>
                                <select className="signup_optionInput" onChange={ (e) => setGender(e.target.value) }>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                    <option value={"unspecified"}>I prefer not to say</option>
                                </select>
                            </div>
                            <div>
                                <label className="signup_label">Date of Birth</label><br></br>
                                <input className="signup_DoBInput" type="date" required onChange={ (e) => setDob(e.target.value) }></input>
                            </div>
                            <div>
                                <label className="signup_label">Email</label><br></br>
                                <input className="signup_input" type="email" required onChange={ (e) => setEmail(e.target.value) }></input>
                            </div>
                            <div>
                                <label className="signup_label">Phone number</label><br></br>
                                <input className="signup_input" type="tel" pattern="0[0-9]{9}" required onChange={ (e) => setPhoneNumber(e.target.value) }></input>
                            </div>
                            <div className="action">
                                <input type="button" id="signup_submit" onClick={() => setSubmitSignal(!submitSignal)} value={"SIGN UP"}></input><br></br>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="leftPart">
                    <img src="./signup.svg" alt="logo" width={600} height={600}></img>
                </div>
            </div>
            {cusAleMsg && <CustomAlert message={cusAleMsg} okHandler={() => { setCusAleMsg('') }} />}
        </>
    );
}