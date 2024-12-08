import "../styles/SignUp.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    
    useEffect(() => {
        async function postSignUpInfo() {
            const response = await fetch(`${import.meta.env.VITE_USER_API_URL}/users/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password,
                        "fullname": fullname,
                        "gender": gender,
                        "dob": dob,
                        "email": email,
                        "phoneNumber": phoneNumber
                    }),
                }
            );
            
            if (response.ok) {
                navigate('/otp');
                return;
            }

            const responseJson = await response.json();
            // errors catching and alert user there
        }
        
        if (username && password && fullname && gender && dob && email && phoneNumber) {
            postSignUpInfo();
        }
    }, [submitSignal]);

    return (
        <div className="signup">
            <div className="rightPart">
                <div className="signUpArea">
                    <p style={{ fontSize: 50, textAlign: "center", fontFamily: "'Segoe UI'", margin: "auto 0" }}>Create new account</p>
                    <form className="signUpForm">
                        <div>
                            <label className="label">Username</label><br></br>
                            <input className="input" type="text" required onChange={ (e) => setUsername(e.target.value) }></input>
                        </div>
                        <div>
                            <label className="label">Password</label><br></br>
                            <input className="input" type="password" required onChange={ (e) => setPassword(e.target.value) }></input>
                        </div>
                        <div>
                            <label className="label">Full name</label><br></br>
                            <input className="input" type="text" required onChange={ (e) => setFullname(e.target.value) }></input>
                        </div>
                        <div>
                            <label className="label">Gender</label><br></br>
                            <select className="optionInput" onChange={ (e) => setGender(e.target.value) }>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"unspecified"}>I prefer not to say</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Date of Birth</label><br></br>
                            <input className="DoBInput" type="date" required onChange={ (e) => setDob(e.target.value) }></input>
                        </div>
                        <div>
                            <label className="label">Email</label><br></br>
                            <input className="input" type="email" required onChange={ (e) => setEmail(e.target.value) }></input>
                        </div>
                        <div>
                            <label className="label">Phone number</label><br></br>
                            <input className="input" type="tel" pattern="0[0-9]{9}" required onChange={ (e) => setPhoneNumber(e.target.value) }></input>
                        </div>

                        <div className="action">
                            <input type="button" id="submit" onClick={() => setSubmitSignal(!submitSignal)} value={"SIGN UP"}></input><br></br>
                        </div>
                    </form>
                </div>
            </div>
            <div className="leftPart">
                <img src="./signup.svg" alt="logo" width={600} height={600}></img>
            </div>
        </div>
    );
}