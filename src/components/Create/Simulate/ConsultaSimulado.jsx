import React from "react";
import './ConsultaSimulado.css';
import { Link } from "react-router-dom";

import { HeaderPage } from "../../Header/Header";

export class ConsultaSimulado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simulados: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSimulados();
    }

    fetchSimulados = async () => {
        try {
            const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/simulados'); 
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro ao buscar simulados:', response.status, errorText);
                throw new Error(`Erro ao buscar simulados: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            this.setState({ simulados: data, loading: false });
        } catch (error) {
            console.error('Erro ao buscar simulados:', error);
            this.setState({ loading: false, error: error.message });
        }
    };

    render() {
        const { simulados, loading, error } = this.state;

        if (loading) {
            return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
        }

        if (error) {
            return <div className="alert alert-danger text-center">Erro: {error}</div>;
        }

        return (
            <>
            <HeaderPage/>
            <div className="container my-5 p-5">
                <h1 className="text-center mb-4">Simulados Criados</h1>
                {simulados.length === 0 ? (
                    <p className="text-center">Nenhum simulado encontrado.</p>
                ) : (
                    <div className="row">
                        {simulados.map((simulado) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={simulado.id}>
                                <div className="card cardd shadow-sm border-light">
                                    <div className="card-body">
                                        <h5 className="card-title">{simulado.exam_name}</h5>
                                        <p className="card-text">Nome: {simulado.full_name}</p>
                                        <p className="card-text text-muted">
                                            Data de Criação: {new Date(simulado.created_at).toLocaleString()}
                                        </p>
                                        <a href={`https://cconcurseiro.up.railway.app/simulado/${simulado.id}`} className="btn btn-primary">Ver Simulado</a>
                                    </div>
                                    <a href={`/classificao/${simulado.id}`} className="btn btn-info text-white">Classificação</a>
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </>
        );
    }
}
