import "../styles/ApproveDocuments.css";
export default function ApproveDocuments() {
    return (
        <div className="wordsets_table-container">
            <div className="wordsets_table-body">
                <table>
                    <thead className="wordsets_table-header">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>Is approved</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody className="wordsets_table-content">
                        {[
                            { ID: "1", idUser: "1", name: "Ielts for beginners", Description: "Giving Ielts starter tips and tricks to pass the Ielts test with band 5.0", url: "https://documents.com", isApproved: true },
                        ].map((item, index) => (
                            <tr key={index}>
                                <td>{item.ID}</td>
                                <td>{item.idUser}</td>
                                <td>{item.name}</td>
                                <td>{item.Description}</td>
                                <td>{item.url}</td>
                                <td>{item.isApproved ? "true" : "false"}</td>
                                <td>
                                    {
                                        item.isApproved &&
                                        <div>
                                            <input type="image" src="../approved.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}></input>
                                            <input type="image" src="../disapproved.svg" style={{ backgroundColor: "red", borderRadius: "50%", width: "30px", height: "30px" }}></input>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}