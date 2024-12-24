import "../styles/CustomConfirm.css";
export default function CustomAlert({ message, yesHandler, noHandler }) {
  return (
        <div className="alert">
            <div className="msg">
                {message}
            </div>
            <div>
                <button className="yes_button" onClick={yesHandler}>Yes</button>
                <button className="no_button" onClick={noHandler}>No</button>
            </div>
        </div>
  );

}