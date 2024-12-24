import "../styles/CustomAlert.css";
export default function CustomAlert({ message }) {
  return (
        <div className="alert">
            <div className="msg">
                {message}
            </div>
            <div>
                <button className="alert_button">OK</button>
            </div>
        </div>
  );

}