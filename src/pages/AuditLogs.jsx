import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/AuditLogs.css";

export default function AuditLogs() {
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = Cookies.get('access_token');
        const role = Cookies.get('role');
        if (!access_token || role !== 'admin') {
            navigate('/login');
        }
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
                            {[
                                { ID: "1", action: "CREATE", Entity: "Wordset", entityId: "1", userId: "1", username: "minhphuc2544", role: "admin", details: "Created wordset", timestamp: "2021-09-01 12:00:00" },
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.action}</td>
                                    <td>{item.Entity}</td>
                                    <td>{item.entityId}</td>
                                    <td>{item.userId}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>{item.details}</td>
                                    <td>{item.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}