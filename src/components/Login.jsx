import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users"));


    if (!users || users.length === 0) {
      alert("Inga användare registrerade.");
      return;
    }

    const user = users.find((u) => 
      u.username?.trim() === username.trim() && u.password?.trim() === password.trim()
    );

    if (user) {
      onLogin(user);
    } else {
      alert("Fel användarnamn/lösen");
    }
  };

  return (
    <>
      <div>
        <h2>Logga in</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
        />
        <button onClick={handleLogin}>Logga in</button>
      </div>

      <div>
        <p>
          Har du inget konto? Don't be sad! <Link to="/reg">Registrera dig här</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
