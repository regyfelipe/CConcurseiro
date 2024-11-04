import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ResultadoSimulado.css';

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
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status"></div>
                <p>Carregando resultados...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">Erro: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">RESULTADOS</h2>
            <table className="table table-bordered rounded shadow">
                <thead className="table-dark text-center">
                    <tr>
                        <th>CLASS.</th>
                        <th>NOME</th>
                        <th>NOTA</th>
                        <th>ERRADAS</th>
                    </tr>
                </thead>
                <tbody>
                    {resultados.map((resultado, index) => (
                        <tr key={index}>
                            <td>{resultado.posicao}</td>
                            <td>{resultado.nome}</td>
                            <td className="nota">{resultado.totalAcertos}</td>
                            <td className="erradas">{resultado.totalErros}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
