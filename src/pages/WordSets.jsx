import "../styles/WordSets.css";
export default function WordSets() {
    return (
            <div className="wordsets_table-container">
                <div className="wordsets_table-body">
                    <table>
                        <thead className="wordsets_table-header">
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Topic</th>
                                <th>Number of words</th>
                                <th>Is recommended</th>
                                <th>Add to recommend</th>
                            </tr>
                        </thead>
                        <tbody className="wordsets_table-content">
                            {[
                                { ID: "1", idUser: "1", topic: "Education", noWords: "120", isRecommended: true },
                                { ID: "2", idUser: "2", topic: "Environment", noWords: "50", isRecommended: false },
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.idUser}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.noWords}</td>
                                    <td>{item.isRecommended ? "true" : "false"}</td>
                                    <td>
                                        {
                                            !item.isRecommended &&
                                            <input type="image" src="../approved.svg" style={{ backgroundColor: "#34B233", borderRadius: "50%", width: "30px", height: "30px", marginRight: "10px" }}></input>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}