import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "../components/auth/Register/RegisterPage";
import { LoginPage } from "../components/auth/Login/LoginPage";
import { MainContainer } from "../components/Main/Main";
import { QuestionCard } from "../components/Create/card/QuestionCard";
import { CreateQuestion } from "../components/Create/Questoes/Question";
import { Simulate } from "../components/Create/Simulate/Simulate"; 
import Simulado from "../components/views/Simulado";
import { ConsultaSimulado } from "../components/Create/Simulate/ConsultaSimulado";
import { ResultadoSimulado } from "../components/Create/Simulate/resultado/resultado";
import Importa from "../components/import/Importa";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/questionCard" element={<QuestionCard />} />
                <Route path="/importa" element={<Importa />} />
                <Route path="/createQuestion" element={<CreateQuestion />} />
                <Route path="/simulate" element={<Simulate />} />
                <Route path="/simul" element={<ConsultaSimulado />} />
                <Route path="/simulado/:id" element={<Simulado />} />
                <Route path="/classificao/:id" element={<ResultadoSimulado />} /> 
            </Routes>
        </Router>
    );
}
