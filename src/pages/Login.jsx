import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"
import { useEffect, useState } from "react";
import CustomAlert from "../components/CustomAlert"
import Cookies from 'js-cookie';
import Loading from "../components/Loading";

export default function Login() {
    const baseUrl = import.meta.env.BASE_URL;

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitSignal, setSubmitSignal] = useState(false);
    const [cusAleMsg, setCusAleMsg] = useState(''); // abbreviation of CustomAlertMessage
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay (e.g., fetching resources)
        const timer = setTimeout(() => setLoading(false), 2000); // 2-second delay
        return () => clearTimeout(timer); // Cleanup timeout
    }, []);

    // remove all cookies after user back to Login Page
    useEffect(() => {
        Cookies.remove('access_token');
        Cookies.remove('user_id');
        Cookies.remove('username');
        Cookies.remove('role');
    }, []);

    // useEffect uses to send the username and password to the api server
    useEffect(() => {
        async function postLoginInfo() {
            const requestBody = {
                "username": username,
                "password": password
            };
            // call api to get access_token
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/auth/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
            );
            // navigate if response code is not 200
            if (!response.ok) {
                // catch errors and notify user (response code 401)
                setCusAleMsg("Wrong username or password");
                return;
            }
            // set the access_token to cookie
            const responseJson = await response.json();
            const oneHourFromNow = new Date();
            oneHourFromNow.setHours(oneHourFromNow.getHours() + import.meta.env.VITE_TOKEN_EXPIRE_TIME);
            Cookies.set('access_token', responseJson.access_token, { expires: oneHourFromNow });

            // call api to get user's info
            const response1 = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`,
                }
            }
            );
            if (response1.ok) {
                const response1Json = await response1.json();

                // set the username, role, id to cookies
                Cookies.set('user_id', response1Json.id, { expires: oneHourFromNow });
                Cookies.set('username', response1Json.username, { expires: oneHourFromNow });
                Cookies.set('role', response1Json.role, { expires: oneHourFromNow });

                if (response1Json.role === 'admin') {
                    navigate('/admin/users');
                    return;
                }
                navigate('/');
            }
        }

        if (username && password) {
            postLoginInfo()
        }
    }, [submitSignal])

    return (
        <>
            {loading && <Loading/>  }
            <div className={`login ${loading ? "hidden" : "fade-in"}`}>
                <div className="login_leftContainer">
                    <div className="loginArea">
                        <form className="form"> 
                            <div className="loginInfo">
                                <h1 style={{ fontSize: 60, textAlign: "center", fontFamily: 'Segoe UI', marginTop: -20, marginBottom: 30 }}>Sign in</h1>
                                <label className="login_label">Username</label><br></br>
                                <input type="text" className="login_input" id="username" required style={{ marginBottom: 10 }} onChange={(e) => setUsername(e.target.value)} /><br></br>
                                <label className="login_label">Password</label><br></br>
                                <input type="password" className="login_input" id="password" required onChange={(e) => setPassword(e.target.value)} /><br></br> <br></br>
                                <div className="login_action">
                                    <input type="button" id="login_submit" className="login_submit" value={"LOGIN"} onClick={() => setSubmitSignal(!submitSignal)} /><br></br><br></br>
                                    <Link to={`${baseUrl}passwordrecovery`} className="login_link">Forgot your password?</Link>
                                    <Link to={`${baseUrl}signup`} className="login_link">Don't have an account? Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="login_rightContainer">
                    <img src="./logo_transparent.svg" alt="logo" width={1000}></img>
                </div>
            </div>
            {cusAleMsg && <CustomAlert message={cusAleMsg} okHandler={() => { setCusAleMsg('') }} />}

        </>
    );
}