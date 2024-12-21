import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/Menu.css"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Menu() {
    const baseUrl = import.meta.env.BASE_URL;

    const location = useLocation();
    const navigate = useNavigate();
    const [curPage, setCurPage] = useState(location.pathname.split("/")[1]);
    const [isMenuHidden, setMenuHidden] = useState(false);
    const [isUserCardHidden, setUserCardHidden] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [noWords, setNoWords] = useState(0);

    // the function uses to return the link's hover style
    const getStyle = (value) => {
        if (curPage === value) {
            return {
                backgroundColor: "var(--sidebar-primary-hover)",
                color: "var(--text-link)",
            };
        }
        return {};
    }

    // listening to the location state, if it changes set it to the curpage right away
    useEffect(() => {
        setCurPage(location.pathname.split("/")[1]);
    }, [location])

    // useEffect uses turn the menu of with specific pages
    useEffect(() => {
        if (curPage === 'login' || curPage === 'signup' || curPage === 'otp' || curPage === 'passwordrecovery') {
            setMenuHidden(true);
            setUserCardHidden(true);
        } else {
            setMenuHidden(false);
            if (curPage === 'setting') {
                setUserCardHidden(true);
                return;
            }
            setUserCardHidden(false);
        }
    }, [curPage]);

    // useEffect uses to pull user's info and statistics
    useEffect(() => {
        async function getUserInfo() {
            // call api to get user's info
            const response = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`,
                }
            }
            );

            if (response.ok) {
                const responseJson = await response.json();
                setUserInfo(responseJson);
            }

            // call api to get number of words
            const response1 = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/words/me/count`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`,
                }
            }
            );

            if (response1.ok) {
                const responseJson = await response1.json();
                setNoWords(responseJson.amount);
            }
        }

        getUserInfo();
    }, [location])

    return (
        <>
            { !isMenuHidden &&
                <div className="body">
                    <nav className="sidebar">
                        <div style={{ textAlign: "center" }}>
                            <img src="./logo_transparent_greenBorder.svg" alt="logo" className="logo"></img>
                        </div>
                        <div className="sidebar-links">
                            <ul>
                                <li>
                                    <Link to={`${baseUrl}`} title="Home" className="tooltip" style={getStyle('')} onClick={() => setCurPage('')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                            stroke-linejoin="round" aria-hidden="true">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 4h6v8h-6z" />
                                            <path d="M4 16h6v4h-6z" />
                                            <path d="M14 12h6v8h-6z" />
                                            <path d="M14 4h6v4h-6z" />
                                        </svg>
                                        <span className="span">Home</span>
                                        <span className="tooltip__content">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${baseUrl}flashcard`} className="tooltip" style={getStyle('flashcard')} onClick={() => setCurPage('flashcard')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                            stroke-linejoin="round" aria-hidden="true">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                            <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                            <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                            <path d="M4 20l14 0" />
                                        </svg>
                                        <span className="span">Flash cards</span>
                                        <span className="tooltip__content">Flash cards</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${baseUrl}dictionary`} title="Tasks" className="tooltip" style={getStyle('dictionary')} onClick={() => setCurPage('dictionary')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                                        <span className="span">Dictionary</span>
                                        <span className="tooltip__content">Dictionary</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${baseUrl}document`} title="Users" className="tooltip" style={getStyle('document')} onClick={() => setCurPage('document')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                                        <span className="span">Documents</span>
                                        <span className="tooltip__content">Documents</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="separator"></div>
                        <div className="sidebar-links">
                            <ul>
                                <li>
                                    <Link to={`${baseUrl}setting`} title="Settings" className="tooltip" style={getStyle('setting')} onClick={() => setCurPage('setting')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path
                                                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z">
                                            </path>
                                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                        </svg>
                                        <span className="span">Settings</span>
                                        <span className="tooltip__content">Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/heartistry.english" target="_blank" title="Support" className="tooltip">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-info-square-rounded"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                                        <span className="span">Support</span>
                                        <span className="tooltip__content">Support</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="sidebar__profile">
                            <div className="avatar__wrapper">
                                <img onClick={() => navigate("/setting")} className="avatar" src={userInfo.avatarUrl ? userInfo.avatarUrl : "./default_user.png" } alt="Natalia Picture"></img>
                                <div className="online__status"></div>
                            </div>
                            <div className="avatar__name">
                                <div onClick={() => navigate("/setting")} className="user-name" style={{cursor: "pointer"}}>{ userInfo.fullname }</div>
                            </div>
                            <Link to={`${baseUrl}login`} className="logout" onClick={ () => { setCurPage('login'); Cookies.remove('access_token') } }>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                    stroke-linejoin="round" aria-labelledby="logout-icon" role="img">
                                    <title id="logout-icon">log out</title>
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                                    <path d="M9 12h12l-3 -3"></path>
                                    <path d="M18 15l3 -3"></path>
                                </svg>
                            </Link>
                        </div>
                    </nav>
                </div>
            }
            { !isUserCardHidden &&
                <div className="userInfo">
                    <img className="userPicture" src={userInfo.avatarUrl ? userInfo.avatarUrl : "./default_user.png" }></img> {/*user avatar*/}
                    <p className="username">{ userInfo.fullname }</p> {/*username*/}
                    <div className="duration">
                        <div style={{ display: "block", margin: 20 }}>
                            <p>Words</p>
                            <p>{ noWords }</p>
                        </div>
                        <div className="dashboard_separator"></div>
                        <div style={{ display: "block", margin: 20 }}>
                            <p>Days</p>
                            <p>{ Math.ceil((new Date() - new Date(userInfo.createAt)) / (1000 * 60 * 60 * 24)) }</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}