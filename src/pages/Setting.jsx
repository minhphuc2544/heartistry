import "../styles/Setting.css";
import { useEffect, useState } from "react";

export default function Setting() {
    const [isChangePassword, setChangePassword] = useState(false);
    return (
        <div className="setting">
            <div style={{ display: "flex", backgroundColor: "#21B6A8", marginTop: "20px", borderRadius: "22px" }}>
                <div className="userAvatar">
                    <img src="./logo.svg" style={{ width: "100%", height: "100%", padding: "5px" }}></img>
                </div>
                <div className="userStudyInfo">
                    <p className="title" style={{marginTop: "60px"}}>You have studied with us 30{ } days from December 22nd{ }</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <p className="info title">Words</p>
                            <p className="info">2000{ }</p>
                        </div>
                        <div>
                            <p className="info title">Remembered</p>
                            <p className="info">1500{ }</p>
                        </div>
                        <div>
                            <p className="info title">Word sets</p>
                            <p className="info">14{ }</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="userUpdateInfo">
                <h1 style={{ fontSize: "45px", fontFamily: "sans-serif", margin: "20px" }}>Profile</h1>
                <div style={{ display: "flex", height: "400px", justifyContent: "center" }}>
                    <div className="updateInfo">
                        <label className="label">Username</label><br></br>
                        <input type="text" className="input" id="username" defaultValue={"username"} required style={{ marginBottom: 10, pointerEvents: "none", backgroundColor: "lightgrey" }} /><br></br>
                        <label className="label">Email</label><br></br>
                        <input type="text" className="input" id="username" required style={{ marginBottom: 10 }} /><br></br>
                        <label className="label">Phone number</label><br></br>
                        <input type="text" className="input" id="username" required style={{ marginBottom: 10 }} /><br></br>
                        <button className="updateBtn">Update</button>
                    </div>
                    <div className="changePassword">
                        <>
                            {
                                isChangePassword ?
                                <div>
                                    <label className="label">Current password</label><br></br>
                                    <input type="text" className="input" id="username" required style={{ marginBottom: 10 }} /><br></br>
                                    <label className="label">New password</label><br></br>
                                    <input type="text" className="input" id="username" required style={{ marginBottom: 10 }} /><br></br>
                                    <label className="label">Confirm new password</label><br></br>
                                    <input type="text" className="input" id="username" required style={{ marginBottom: 10 }} /><br></br>
                                    <button className="changepwdBtn">Change</button>
                                </div>
                                :
                                
                                                                <button className="changepwdBtn" onClick={() => setChangePassword(!isChangePassword)}>Change password</button>

                            }
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}