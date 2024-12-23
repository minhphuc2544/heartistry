import "../styles/Users.css";

export default function User() {
    return (
        <div className="table-container">
            <div className="table-body">
                <table>
                    <thead className="table-header">
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
                    <tbody className="table-content">
                        {[
                            { name: "Like a butterfly", type: "Boxing", hours: "9:00 AM - 11:00 AM", trainer: "Aaron Chapman", spots: 10 },
                            { name: "Mind & Body", type: "Yoga", hours: "8:00 AM - 9:00 AM", trainer: "Adam Stewart", spots: 15 },
                            { name: "Crit Cardio", type: "Gym", hours: "9:00 AM - 10:00 AM", trainer: "Aaron Chapman", spots: 10 },
                            { name: "Wheel Pose Full Posture", type: "Yoga", hours: "7:00 AM - 8:30 AM", trainer: "Donna Wilson", spots: 15 },
                            { name: "Zumba Dance", type: "Dance", hours: "5:00 PM - 7:00 PM", trainer: "Donna Wilson", spots: 20 },
                        ].map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.hours}</td>
                                <td>{item.trainer}</td>
                                <td>{item.spots}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
