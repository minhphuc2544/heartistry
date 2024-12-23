import "../styles/Users.css";

export default function User() {
    return (
        <div className="user_table-container">
            <div className="user_table-body">
                <table>
                    <thead className="user_table-header">
                        <tr>
                            <th>ID</th>
                            <th>Full name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Created Day</th>
                            <th>Last online day</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="user_table-content">
                        {[
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                        ].map((item, index) => (
                            <tr contentEditable='true' key={index}>
                                <td contentEditable='true' >{item.ID}</td>
                                <td>{item.fullName}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.gender}</td>
                                <td>{item.role}</td>
                                <td>{item.createdDay}</td>
                                <td>{item.lastOnlineDay}</td>
                                <td style={{ display: "flex", justifyContent: "center" }}>
                                    <input type="image" src="../disapproved.svg" style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}></input>                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <input type="image" src="../add_wordset.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "60px", height: "60px", marginRight: "10px", position: "fixed", top: "850px", left: "1854px" }}></input>
        </div>
    );
}
