import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import '../main.css';
import './Login.css';
import logo from '../../../assets/imgs/logo.png';
import { HeaderPage } from "../../Header/Header";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://backendcconcurseiro-production.up.railway.app/api/login", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Erro ao fazer login");
            }

            const data = await response.json();
            alert(data.message); 

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <main className="custom">
            <div className="split left-side">
                <img src={logo} alt="logo com o nome concurseiro" className="logoAuth" />
            </div>

            <div className="split right-side">
                <div className="formulario">
                    {/* <h2 className="title">Login</h2> */}
                    <form onSubmit={handleSubmit}>
                        <label className="inputCustom" htmlFor="emailOrUsername">E-mail</label>
                        <input
                            type="text"
                            placeholder="Digite seu email"
                            name="emailOrUsername"
                            id="emailOrUsername"
                            required
                            className="inputField"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className="inputCustom" htmlFor="password">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            name="password"
                            id="password"
                            required
                            className="inputField"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="submitButton" disabled={loading}>
                            {loading ? "Entrando..." : "Login"}
                        </button>
                        <div className="router">
                            <p className="link">
                                Não tem cadastro? Clique <Link to="/register">aqui</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main></>
    );
};
