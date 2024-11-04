import React from "react";
import { HeaderPage } from "../../Header/Header";
import './Simulate.css';

export class Simulate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            selectedQuestions: [],
            feedback: {},
            answers: {},
            expandedQuestions: {},
            searchQuery: "",
            fullName: "",        
            examName: "",        
            generatedLink: "",    
            showModal: false      
        };
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    fetchQuestions = async () => {
        try {
            const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/all');
            const questions = await response.json();
            this.setState({ questions });
        } catch (error) {
            console.error("Erro ao buscar questões:", error);
        }
    };

    handleSelectQuestion = (question) => {
        this.setState(prevState => {
            const isAlreadySelected = prevState.selectedQuestions.some(q => q.id === question.id);
            if (isAlreadySelected) {
                return {
                    selectedQuestions: prevState.selectedQuestions.filter(q => q.id !== question.id),
                    expandedQuestions: { ...prevState.expandedQuestions, [question.id]: false }
                };
            } else {
                return {
                    selectedQuestions: [...prevState.selectedQuestions, question],
                    expandedQuestions: { ...prevState.expandedQuestions, [question.id]: false }
                };
            }
        });
    };

    toggleExpand = (questionId) => {
        this.setState(prevState => ({
            expandedQuestions: {
                ...prevState.expandedQuestions,
                [questionId]: !prevState.expandedQuestions[questionId]
            }
        }));
    };

    handleAnswerSelect = (questionId, selectedAnswer) => {
        this.setState(prevState => ({
            answers: {
                ...prevState.answers,
                [questionId]: selectedAnswer
            }
        }));
    };

    handleSubmitAnswer = (question) => {
        const { id, resposta_correta } = question;
        const selectedAnswer = this.state.answers[id];
        const feedbackMessage = selectedAnswer === resposta_correta ? "Resposta Correta!" : "Resposta Incorreta.";

        this.setState(prevState => ({
            feedback: {
                ...prevState.feedback,
                [id]: feedbackMessage
            }
        }));
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    filterQuestions = () => {
        const { questions, selectedQuestions, searchQuery } = this.state;

        const availableQuestions = questions.filter(question =>
            !selectedQuestions.some(q => q.id === question.id)
        );

        if (!searchQuery) {
            return availableQuestions;
        }

        return availableQuestions.filter(question => {
            const queryLower = searchQuery.toLowerCase();
            return (
                question.disciplina.toLowerCase().includes(queryLower) ||
                question.assunto.toLowerCase().includes(queryLower) ||
                question.instituicao.toLowerCase().includes(queryLower) ||
                question.banca.toLowerCase().includes(queryLower) ||
                question.prova.toLowerCase().includes(queryLower) ||
                question.nivel.toLowerCase().includes(queryLower)
            );
        });
    };

    handleGenerateSimulado = () => {
        this.setState({ showModal: true });
    };

    handleConfirmSimulado = async () => {
        const { fullName, examName, selectedQuestions } = this.state;

        const questionIds = selectedQuestions.map(q => q.id);
        const simuladoData = { fullName, examName, questions: questionIds };

        try {
            const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/api/simulado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(simuladoData),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({
                    generatedLink: data.link, 
                    showModal: false,         
                    fullName: "",             
                    examName: ""              
                });
            } else {
                // Tratar erros do backend
                console.error(data.error);
                alert("Erro ao gerar o simulado: " + data.error);
            }
        } catch (error) {
            console.error("Erro ao enviar dados do simulado:", error);
            alert("Erro ao gerar o simulado. Tente novamente.");
        };
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const filteredQuestions = this.filterQuestions();

        return (
            <>
                <HeaderPage />
                <main className="simulateContainer">
                    <div className="container-fluid my-5 p-0">
                        <div className="row g-0">
                            <div className="col-lg-6 col-md-6 col-12 mb-4">
                                <div className="p-4 bg-white rounded shadow-sm h-100">
                                    <h5 className="text-primary mb-3">Questões Disponíveis</h5>
                                    {/* Campo de Pesquisa */}
                                    <div className="mb-4">
                                        <h6>Pesquisar Questões</h6>
                                        <input
                                            type="text"
                                            placeholder="Pesquisar por disciplina, assunto, instituição, banca, prova ou nível"
                                            className="form-control mb-2"
                                            onChange={this.handleSearchChange}
                                        />
                                    </div>
                                    <div
                                        id="questions-list"
                                        className="list-group overflow-auto"
                                        style={{
                                            maxHeight: 750,
                                            borderRadius: 10,
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        {filteredQuestions.map((question) => (
                                            <div key={question.id} className={`list-group-item ${this.state.selectedQuestions.some(q => q.id === question.id) ? 'selected' : ''}`}>
                                                <div className="question-header">
                                                    <span className="badge">Q{question.codigo}</span>
                                                    <span className="ms-2">{`${question.disciplina} » ${question.assunto}`}</span>
                                                    <div className="text-muted">
                                                        <small>{`Ano: ${question.ano} | Banca: ${question.banca} | Órgão: ${question.instituicao}`}</small>
                                                    </div>
                                                </div>
                                                <div className="question-content">
                                                    <pre>{question.texto_aux || ""}</pre>
                                                </div>
                                                <div className="question-content mb-4 align pergunta">
                                                    <p><strong>Pergunta:</strong> {question.pergunta}</p>
                                                </div>
                                                <div className="answer-options list-group mb-4">
                                                    {question.alternativas.map((alt) => (
                                                        <label key={alt.label} className="list-group-item d-flex align-items-center">
                                                            <div className="option-circle">
                                                                <input className="form-check-input" type="radio" name={`options-${question.id}`} value={alt.label} onChange={() => this.handleAnswerSelect(question.id, alt.label)}
                                                                />
                                                                <span className="q-option-item">{alt.label}</span>
                                                            </div>
                                                            <span className="option-text ms-2">{alt.value}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                <button
                                                    className={`btn ${this.state.selectedQuestions.some(q => q.id === question.id) ? 'btn-secondary' : 'btn-primary'}`}
                                                    onClick={() => this.handleSelectQuestion(question)}
                                                >
                                                    {this.state.selectedQuestions.some(q => q.id === question.id) ? "Selecionado" : "Selecionar"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12 mb-4">
                                <div className="p-4 bg-white rounded shadow-sm h-100">
                                    <h5 className="text-primary mb-3">Questões Selecionadas</h5>
                                    <div className="text-end mb-3">
                                        <button id="generate-simulate-btn" className="btn btn-success" onClick={this.handleGenerateSimulado} disabled={this.state.selectedQuestions.length === 0}
                                        >
                                            Gerar Simulado
                                        </button>
                                    </div>
                                    <div
                                        id="selected-questions-list"
                                        className="list-group overflow-auto"
                                        style={{
                                            maxHeight: 750,
                                            borderRadius: 10,
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        {this.state.selectedQuestions.map((question) => (
                                            <div key={question.id} className="card mx-auto mb-3" style={{ maxWidth: '1200px' }}>
                                                {/* Header Section */}
                                                <div className="question-header d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <span className="badge">{`Q${question.id}`}</span>
                                                        <span className="ms-2">{`${question.disciplina}`}</span>
                                                        <div className="text-muted">
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-link" onClick={() => this.toggleExpand(question.id)}>
                                                        {this.state.expandedQuestions[question.id] ? "Recolher" : "Expandir"}
                                                    </button>
                                                </div>

                                                {this.state.expandedQuestions[question.id] && (
                                                    <div className="question-content">
                                                        <pre>
                                                            <div dangerouslySetInnerHTML={{ __html: question.texto_aux }} />
                                                        </pre>
                                                    </div>
                                                )}

                                                {/* Question Content */}
                                                {this.state.expandedQuestions[question.id] && (
                                                    <div className="question-content mb-4 pergunta">
                                                        <p><strong>Pergunta:</strong> {question.pergunta}</p>
                                                    </div>
                                                )}

                                                {/* Answer Options */}
                                                {this.state.expandedQuestions[question.id] && (
                                                    <div className="answer-options list-group mb-4">
                                                        {question.alternativas.map((alt) => (
                                                            <label key={alt.label} className="list-group-item d-flex align-items-center">
                                                                <div className="option-circle">
                                                                    <input className="form-check-input" type="radio" name={`options-${question.id}`} value={alt.label} onChange={() => this.handleAnswerSelect(question.id, alt.label)}
                                                                    />
                                                                    <span className="q-option-item">{alt.label}</span>
                                                                </div>
                                                                <span className="option-text ms-2">{alt.value}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Feedback */}
                                                {this.state.feedback[question.id] && (
                                                    <div className="feedback">
                                                        <strong>{this.state.feedback[question.id]}</strong>
                                                    </div>
                                                )}

                                                {/* Remove Button */}
                                                <div className="text-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => this.handleSelectQuestion(question)}
                                                    >
                                                        Remover
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal para Geração de Simulado */}
                    {this.state.showModal && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Gerar Simulado</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => this.setState({ showModal: false })}
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="fullName" className="form-label">Nome Completo</label>
                                            <input type="text" className="form-control" id="fullName" name="fullName" value={this.state.fullName} onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="examName" className="form-label">Nome da Prova</label>
                                            <input type="text" className="form-control" id="examName" name="examName" value={this.state.examName} onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => this.setState({ showModal: false })}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={this.handleConfirmSimulado}
                                        >
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal de Simulado Gerado */}
                    {this.state.generatedLink && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Simulado Gerado!</h5>
                                        <button type="button" className="btn-close" onClick={() => this.setState({ generatedLink: "" })} aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            Seu simulado foi gerado com sucesso. Você pode copiar o link abaixo
                                            e enviá-lo para outras pessoas:
                                        </p>
                                        <input id="simulate-link" className="form-control" type="text" value={this.state.generatedLink} readOnly
                                        />
                                        <button id="copy-link-btn" className="btn btn-secondary mt-3" onClick={() => navigator.clipboard.writeText(this.state.generatedLink)}>
                                            Copiar Link
                                        </button>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => this.setState({ generatedLink: "" })}
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </>
        );
    }
}
