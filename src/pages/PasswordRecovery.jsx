import { Link } from "react-router-dom";
import "../styles/PasswordRecovery.css"
export default function PasswordRecovery() {
    const baseUrl = import.meta.env.BASE_URL;
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
                                <input type="text" className = "input" id="username" required /><br></br>
                                <label className="label">Email</label><br></br>
                                <input type="password" className = "input" id="password" required /><br></br> 
                                <label className="label">Phone Number</label><br></br>
                                <input type="phoneNumber" className = "input" id="phoneNumber" required /><br></br> 
                            </div>
                            <div className="action">
                                <button type="submit" id="submit">RECEIVE NEW PASSWORD</button><br></br>
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