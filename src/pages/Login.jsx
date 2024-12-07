import "../styles/Login.css"
export default function Login(){
    return (
        <>
            <div>
                <div className="login">
                    <h2>Sign in</h2>
                    <form>
                        <label>Username</label><br></br>
                        <input type="text" id="username" required/><br></br>
                        <label>Password</label><br></br>
                        <input type="password" id="password" required/><br></br>
                        <button type="submit" id="submit">LOGIN</button><br></br>
                        <a href="">Forgot your password ?</a> <br></br>
                        <a href="">Don't have an account ? Sign up</a><br></br>
                    </form>
                </div>
                <div className="logo">
                <img src="./logo.svg" alt="logo" width={500} height={715}></img>
                </div>
            </div>
        </>
        
    );
}