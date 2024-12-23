import "../styles/WordSets.css";
export default function WordSets() {
    return (
            <div className="wordsets_table-container">
                <div className="wordsets_table-body">
                    <table>
                        <thead className="wordsets_table-header">
                            <tr>
                                <th>ID</th>
                                <th>ID User</th>
                                <th>Topic</th>
                                <th>Number of words</th>
                                <th>Is recommended</th>
                            </tr>
                        </thead>
                        <tbody className="wordsets_table-content">
                            {[
                                { ID: "1", idUser: "1", topic: "Education", noWords: "120", isRecommended: "true" },
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.idUser}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.noWords}</td>
                                    <td>{item.isRecommended}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}