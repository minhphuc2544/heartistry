import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Login() {
    const baseUrl = import.meta.env.BASE_URL;

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitSignal, setSubmitSignal] = useState(false);

    // useEffect uses to send the username and password to the api server
    useEffect(() => {
        async function postLoginInfo() {
            const requestBody = {
                "username": username,
                "password": password
            };

            // call api
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/auth/token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            
            // navigate if response code is 200
            if (response.ok) {
                // set the access_token to cookie
                const responseJson = await response.json();
                const oneHourFromNow = new Date();
                oneHourFromNow.setHours(oneHourFromNow.getHours() + import.meta.env.VITE_TOKEN_EXPIRE_TIME);
                Cookies.set('access_token', responseJson.access_token, { expires: oneHourFromNow });

                navigate('/');
                return;
            }

            // catch errors and notify user (response code 401)
            window.alert("Wrong username or password");
        }

        if (username && password) {
            postLoginInfo()
        }
    }, [submitSignal])

    return (
        <div className="login">
            <div className="leftContainer">
                <div className="loginArea">
                    <form className="form">
                        <div className="loginInfo">
                        <h1 style={{ fontSize: 60, textAlign: "center", fontFamily: 'Segoe UI', marginTop: -20, marginBottom: 30 }}>Sign in</h1>
                            <label className="label">Username</label><br></br>
                            <input type="text" className = "input" id="username" required style={{marginBottom: 10}} onChange={ (e) => setUsername(e.target.value) } /><br></br>
                            <label className="label">Password</label><br></br>
                            <input type="password" className = "input" id="password" required onChange={ (e) => setPassword(e.target.value) } /><br></br> <br></br>
                            <div className="action">
                                <input type="button" id="submit" className="submit" value={"LOGIN"} onClick={() => setSubmitSignal(!submitSignal)}/><br></br>
                                <Link to={`${baseUrl}passwordrecovery`} className="link">Forgot your password?</Link>
                                <Link to={`${baseUrl}signup`} className="link">Don't have an account? Sign up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="rightContainer">
                <img src="./logo_transparent.svg" alt="logo" width={1000}></img>
            </div>
        </div>
    );
}