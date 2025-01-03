import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/AuditLogs.css";

export default function AuditLogs() {
    const navigate = useNavigate();
    const [auditLogs, setAuditLogs] = useState([]);
    // check if the token is existed and user has 'user' role
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            navigate('/login');
            return;
        }
        const role = Cookies.get('role');
        if (role === 'user') {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        async function fetchAuditLogs() {
            const userResponseJson = await fetch(`${import.meta.env.VITE_USER_API_BASE_URL}/audit-logs/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            if (userResponseJson.ok) {
                const data1 = await userResponseJson.json();
                setAuditLogs(old => [...old, ...data1]);
            }

            const taskResponseJson = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/audit-logs/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            if (taskResponseJson.ok) {
                const data2 = await taskResponseJson.json();
                setAuditLogs(old => [...old, ...data2]);
            }
        }
        fetchAuditLogs();
    }, []);


    return (
        <div className="auditlogs_table-container">
            <div className="auditlogs_table-body">
                <table>
                    <thead className="auditlogs_table-header">
                        <tr>
                            <th>ID</th>
                            <th>Action</th>
                            <th>Entity</th>
                            <th>Entity ID</th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Details</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="auditlogs_table-content">
                        {auditLogs.map((item, index) => <DataRow key={index} auditLog={item} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function DataRow({ auditLog }) {
    return (
        <tr>
            <td>{auditLog.id}</td>
            <td>{auditLog.action}</td>
            <td>{auditLog.entity}</td>
            <td>{auditLog.entityId}</td>
            <td>{auditLog.userId}</td>
            <td>{auditLog.username}</td>
            <td>{auditLog.role}</td>
            <td style={{wordBreak: "break-word"}}>{auditLog.details}</td>
            <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(auditLog.timestamp))}</td>
        </tr>
    )
}