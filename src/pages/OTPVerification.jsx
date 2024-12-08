import { Link } from "react-router-dom";
import "../styles/OTPVerification.css"
export default function SignUp() {
    const baseUrl = import.meta.env.BASE_URL;
    return (

        <div className="otp">
            <div className="rightContainer4">
                <div className="otpArea">
                    <form className="otpForm">
                        <h1 style={{ fontSize: 50, textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0 }}>OTP Verification</h1>
                        <p style={{ fontSize: 25, textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", marginTop: 0, marginBottom: 50 }}>OTP has been sent via Email to your email</p>
                        <div className="otpNumbers">
                            <input className="inputOTP" type="text"
                                inputmode="numeric" maxlength="1" />
                            <input className="inputOTP" type="text"
                                inputmode="numeric" maxlength="1" />
                            <input className="inputOTP" type="text"
                                inputmode="numeric" maxlength="1" />
                            <input className="inputOTP" type="text"
                                inputmode="numeric" maxlength="1" />
                            <input className="inputOTP" type="text"
                                inputmode="numeric" maxlength="1" />
                            <input className="inputOTP" type="text"
                                inputmode="numeric" maxlength="1" /><br></br>
                        <button className="resend">Resend OTP</button>
                        </div>
                        <button type="submit" className="submit">Verify</button>
                    </form>
                </div>
            </div>

            <div className="leftContainer4">
                <img src="./otp.svg" alt="logo" width={600} height={600}></img>
            </div>

        </div>


    );
}