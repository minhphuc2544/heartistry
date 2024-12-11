import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OTPVerification.css"
import { useEffect, useState } from "react";
export default function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [submitSignal, setSubmitSignal] = useState(false);
    const [resendSignal, setResendSignal] = useState(false);
    const [restartTimerSignal, setRestartTimerSignal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const userSignUpInfo = location.state || {};

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // Allow only digits or empty values

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Focus the next input if a digit is entered
        if (value !== "" && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    // Format timeLeft to mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // useEffect uses to send otp to server for verification
    useEffect(() => {
        async function postOtpVerfication() {
            if (!userSignUpInfo) {
                window.alert('Please sign up before entering OTP!');
                return;
            }

            // turn request object to string
            const requestBody = {
                "username": userSignUpInfo.username,
                "password": userSignUpInfo.password,
                "fullname": userSignUpInfo.fullname,
                "gender": userSignUpInfo.gender,
                "dob": userSignUpInfo.dob,
                "email": userSignUpInfo.email,
                "phoneNumber": userSignUpInfo.phoneNumber,
                "otp": otp.join('')
            };

            // call api
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/otp_verification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            
            // navigate if response code is 200
            if (response.ok) {
                navigate('/login');
                return;
            }

            // catch errors and notify user
            const responseJson = await response.json();
            let alertMessage = '';
            
            if (Array.isArray(responseJson.message)) {
                console.log(responseJson.message)
                responseJson.message.forEach((v, i) => { alertMessage += `${i + 1}. ${v}\n`; });
            } else {
                alertMessage = `1. ${responseJson.message}`;
            }
            
            window.alert(alertMessage);
        }

        if (otp[5]) {
            postOtpVerfication();
        }
    }, [submitSignal]);

    // useEffect uses to send the otp again
    useEffect(() => {
        async function postSignUpInfo() {
            const requestBody = {
                "username": userSignUpInfo.username,
                "password": userSignUpInfo.password,
                "fullname": userSignUpInfo.fullname,
                "gender": userSignUpInfo.gender,
                "dob": userSignUpInfo.dob,
                "email": userSignUpInfo.email,
                "phoneNumber": userSignUpInfo.phoneNumber
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
                window.alert('OTP resent!');
                setTimeLeft(60);
                setRestartTimerSignal(!restartTimerSignal);
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
            
            window.alert(alertMessage);
        }
        
        if (!timeLeft) {
            postSignUpInfo();
        }
    }, [resendSignal]);

    // useEffect uses to run the resend countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Stop timer at 0
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [restartTimerSignal]);

    return (
        <div className="otp">
            <div className="rightContainer4">
                <div className="otpArea">
                    <form className="otpForm">
                        <h1 style={{ fontSize: 50, textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0 }}>OTP Verification</h1>
                        <p style={{ fontSize: 25, textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", marginTop: 0, marginBottom: 50 }}>OTP has been sent via Email to your email</p>
                        <div className="otpNumbers">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    className="inputOTP"
                                />
                            ))}
                            <br></br>
                            <input type="button" className={ timeLeft ? "resend-time-remaining" : "resend-time-over" } value={`Resend OTP in ${formatTime(timeLeft)}`} onClick={() => setResendSignal(!resendSignal)}></input>
                        </div>
                        <input type="button" className="submit" value={"Verify"} onClick={() => setSubmitSignal(!submitSignal)}></input><br></br>
                    </form>
                </div>
            </div>

            <div className="leftContainer4">
                <img src="./otp.svg" alt="logo" width={600} height={600}></img>
            </div>
        </div>
    );
}