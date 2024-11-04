import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ResultadoSimulado() {
    const { id } = useParams();
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const response = await fetch(`https://backendcconcurseiro-production.up.railway.app/api/simulados/${id}/classificacao`);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Erro ao buscar classificação:', response.status, errorText);
                    throw new Error(`Erro ao buscar classificação: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setResultados(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar classificação:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchResultados();
    }, [id]);

    if (loading) {
        return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">Erro: {error}</div>;
    }

    return (
        <div>
            <h2>Resultado</h2>
            <ul>
                {resultados.map((resultado, index) => (
                    <li key={index}>
                        {resultado.posicao}º {resultado.nome} - Total Acertos: {resultado.totalAcertos} - Total Erros: {resultado.totalErros}
                    </li>
                ))}
            </ul>
        </div>
    );
}
