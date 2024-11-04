import React, { useState } from "react";
import './Filter.css';

export const Filter = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleFilter = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="container filter-container">
            {/* Botão de Expandir/Recolher */}
            <div className="d-flex justify-content-end">
                <button 
                    onClick={toggleFilter} 
                    className="btn filtro mb-3">
                    {isExpanded ? "Recolher Filtros" : "Expandir Filtros"}
                </button>
            </div>

            {/* Filtros */}
            {isExpanded && (
                <div id="filter-content">
                    <div className="row mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Palavra Chave" />
                            <span className="input-group-text  text-white">🔍</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option selected>Disciplina</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option selected>Assunto</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option selected>Banca</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option selected>Nível</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option selected>Instituição</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option selected>Ano</option>
                            </select>
                        </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="filter-section filter-buttons mt-4 d-flex justify-content-end">
                        <button type="button" className="btn btn-clear mx-2">Limpar</button>
                        <button type="button" className="btn btn-filter">Filtrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};
