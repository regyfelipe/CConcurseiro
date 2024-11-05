import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import './Filter.css';

export const Filter = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterValues, setFilterValues] = useState({
        disciplina: [],
        assunto: [],
        banca: [],
        nivel: [],
        instituicao: [],
    });

    const [options, setOptions] = useState({
        disciplinaOptions: [],
        assuntoOptions: [],
        bancaOptions: [],
        nivelOptions: [],
        instituicaoOptions: [],
    });

    const toggleFilter = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMultiSelectChange = (name, selectedOptions) => {
        setFilterValues(prevValues => ({
            ...prevValues,
            [name]: selectedOptions
        }));
    };

    // Fetching options from the backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/all'); 
                const data = await response.json();
                
                // Ensure we correctly map the fetched data
                setOptions({
                    disciplinaOptions: data.disciplina || [],
                    assuntoOptions: data.assunto || [],
                    bancaOptions: data.banca || [],
                    nivelOptions: data.nivel || [],
                    instituicaoOptions: data.instituicao || [],
                });
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };

        fetchOptions();
    }, []);

    return (
        <div className="container filter-container">
            <div className="d-flex justify-content-end">
                <button onClick={toggleFilter} className="btn filtro mb-3">
                    {isExpanded ? "Recolher Filtros" : "Expandir Filtros"}
                </button>
            </div>

            {isExpanded && (
                <div id="filter-content">
                    <div className="row mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Palavra Chave" />
                            <span className="input-group-text text-white">🔍</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <MultiSelect
                                options={options.disciplinaOptions}
                                value={filterValues.disciplina}
                                onChange={(selected) => handleMultiSelectChange('disciplina', selected)}
                                labelledBy="Disciplina"
                                hasSelectAll={false}
                                className="multi-select"
                                placeholder="Disciplina"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <MultiSelect
                                options={options.assuntoOptions}
                                value={filterValues.assunto}
                                onChange={(selected) => handleMultiSelectChange('assunto', selected)}
                                labelledBy="Assunto"
                                hasSelectAll={false}
                                className="multi-select"
                                placeholder="Assunto"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <MultiSelect
                                options={options.bancaOptions}
                                value={filterValues.banca}
                                onChange={(selected) => handleMultiSelectChange('banca', selected)}
                                labelledBy="Banca"
                                hasSelectAll={false}
                                className="multi-select"
                                placeholder="Banca"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <MultiSelect
                                options={options.nivelOptions}
                                value={filterValues.nivel}
                                onChange={(selected) => handleMultiSelectChange('nivel', selected)}
                                labelledBy="Nível"
                                hasSelectAll={false}
                                className="multi-select"
                                placeholder="Nível"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <MultiSelect
                                options={options.instituicaoOptions}
                                value={filterValues.instituicao}
                                onChange={(selected) => handleMultiSelectChange('instituicao', selected)}
                                labelledBy="Instituição"
                                hasSelectAll={false}
                                className="multi-select"
                                placeholder="Instituição"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="filter-section filter-buttons d-flex justify-content-end">
                                <button type="button" className="btn btn-clear mx-2">Limpar</button>
                                <button type="button" className="btn btn-filter">Filtrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
