import { Link } from "react-router-dom";
import "../styles/SignUp.css"
export default function SignUp() {
    const baseUrl = import.meta.env.BASE_URL;
    return (

        <div className="signup">
            <div className="rightPart">
                <div className="signUpArea">
                <p style={{ fontSize: 50, textAlign: "center", fontFamily: "'Segoe UI'", margin: "auto 0"}}>Create new account</p>
                    <form className="signUpForm">
                            <div>
                                <label className="label">Username</label><br></br>
                                <input className="input" type="text"required></input>
                            </div>
                            <div>
                                <label className="label">Password</label><br></br>
                                <input className="input" type="password"required></input>
                            </div>
                            <div>
                                <label className="label">Full name</label><br></br>
                                <input className="input" type="text"required></input>
                            </div>
                            <div>
                                <label className="label">Gender</label><br></br>
                               <select className="optionInput">
                                <option>Male</option>
                                <option>Female</option>
                                <option>I prefer not to say</option>
                               </select>
                            </div>
                            <div>
                                <label className="label">Date of Birth</label><br></br>
                                <input className="DoBInput" type="date"required></input>
                            </div>
                            <div>
                                <label className="label">Email</label><br></br>
                                <input className="input" type="email"required></input>
                            </div>
                            <div>
                                <label className="label">Phone number</label><br></br>
                                <input className="input" type="tel"required></input>
                            </div>


                            <div className="action">
                                <button type="submit" id="submit">SIGN UP</button><br></br>
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