import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Registrera({ addUser }) {
    const nav = useNavigate();

    let [profil, setProfil] = useState("");
    let [userId, setUserId] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const handleAddUser = () => {
        if (!profil || !userId || !username || !password) {
            alert("Vänligen fyll i alla fält för att skapa inloggning");
            return;
        }


        const newUser = {
            profil,
            userId,
            username,
            password,
        };


        const usersFromLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

 
        usersFromLocalStorage.push(newUser);

        localStorage.setItem("users", JSON.stringify(usersFromLocalStorage));


        addUser(newUser);

        console.log("Users after registration:", usersFromLocalStorage); 

     
        nav("/");
    };

    return (
        <>
            <Link to="/">Gå till Inloggning</Link>
            <h2>HÄR REGISTRERAR DU NY ANVÄNDARE</h2>

    
            <input
                type="name"
                placeholder="Profil"
                onChange={(e) => setProfil(e.target.value)}
            />
            <br />

     
            <input
                type="username"
                placeholder="Användarnamn"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />

   
            <input
                type="password"
                placeholder="Lösenord"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <input
                type="number"
                placeholder="Skriv ditt unika ID"
                onChange={(e) => setUserId(Number(e.target.value))}
            />
            <br />


            <button style={{ margin: "10px" }} onClick={handleAddUser}>
                Registrera Ny Användare
            </button>

            <br />
            <button
                style={{ color: "gray", fontSize: "small" }}
                onClick={() => nav(-1)}
            >
                Avbryt
            </button>
        </>
    );
}

export default Registrera;
