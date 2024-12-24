import "../styles/CustomAlert.css";
export default function CustomAlert({ message, okHandler }) {
  return (
        <div className="alert">
            <div className="msg">
                {message}
            </div>
            <div>
                <button className="alert_button" onClick={okHandler}>OK</button>
            </div>
        </div>
  );

}