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
                        </tr>
                    </thead>
                    <tbody className="user_table-content">
                        {[
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "2", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "3", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "4", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "5", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "6", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                            { ID: "1", fullName: "Lê Dương Minh Phúc", username: "minhphuc2544", email: "phucle190904@gmail.com", phoneNumber: "0339161863", dateOfBirth: "09/19/2004", gender: "male", role: "admin", createdDay: "09/19/2021", lastOnlineDay: "09/19/2021" },
                        ].map((item, index) => (
                            <tr key={index}>
                                <td>{item.ID}</td>
                                <td>{item.fullName}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.gender}</td>
                                <td>{item.role}</td>
                                <td>{item.createdDay}</td>
                                <td>{item.lastOnlineDay}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
