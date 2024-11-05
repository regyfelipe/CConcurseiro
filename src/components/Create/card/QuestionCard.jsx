import React from "react";
import { Filter } from "../../Filter/Filter";
import { HeaderPage } from "../../Header/Header";
import { Modal, Button } from 'react-bootstrap';
import './QuestionCard.css';

export class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            selectedAnswers: {},
            feedback: {},
            expandedAuxiliaryText: {},
            currentPage: 1,
            questionsPerPage: 20,
            showModal: false,
            selectedExplanation: "",
        };
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    fetchQuestions = async () => {
        try {
            const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/all');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const questions = await response.json();
            this.setState({ questions });
        } catch (error) {
            console.error("Erro ao buscar questões:", error);
            this.setState({ feedback: { general: "Erro ao buscar questões." } });
        }
    };

    handleAnswerSelect = (questionId, selectedAnswer) => {
        this.setState((prevState) => ({
            selectedAnswers: {
                ...prevState.selectedAnswers,
                [questionId]: selectedAnswer,
            },
        }));
    };

    handleSubmitAnswer = (question) => {
        const selectedAnswer = this.state.selectedAnswers[question.id];
        const correctAnswer = question.resposta_correta;

        console.log(`Comparando: Selected Answer = ${selectedAnswer}, Correct Answer = ${correctAnswer}`);

        const isCorrect = selectedAnswer === correctAnswer;

        this.setState((prevState) => ({
            feedback: {
                ...prevState.feedback,
                [question.id]: isCorrect ? "Correto!" : "Incorreto.",
            },
        }));
    };

    toggleAuxiliaryText = (questionId) => {
        this.setState((prevState) => ({
            expandedAuxiliaryText: {
                ...prevState.expandedAuxiliaryText,
                [questionId]: !prevState.expandedAuxiliaryText[questionId],
            },
        }));
    };

    handleNextPage = () => {
        this.setState((prevState) => ({
            currentPage: prevState.currentPage + 1,
        }));
    };

    handlePrevPage = () => {
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1),
        }));
    };

    setPage = (page) => {
        this.setState({ currentPage: page });
    };

    showExplanation = (explanation) => {
        this.setState({ showModal: true, selectedExplanation: explanation });
    };

    handleClose = () => {
        this.setState({ showModal: false, selectedExplanation: "" });
    };

    render() {
        const { questions, currentPage, questionsPerPage, showModal, selectedExplanation } = this.state;

        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

        const totalPages = Math.ceil(questions.length / questionsPerPage);
        const maxPageButtons = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        const pageNumbers = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );

        return (
            <>
                <main className="cardQuestion">
                    <HeaderPage />
                    <div className="containerCustom">
                        <Filter />
                        <div className="container">
                            {currentQuestions.map((question) => (
                                <div key={question.id} className="card mx-auto" style={{ maxWidth: '1200px' }}>
                                    <div className="question-header">
                                        <span className="badge">{`Q${question.id}`}</span>
                                        <span className="ms-2">{`${question.disciplina} » ${question.assunto}`}</span>
                                        <div className="text-muted">
                                            <small>{`Banca: ${question.banca} | Órgão: ${question.instituicao}`}</small>
                                        </div>
                                    </div>

                                    <div className="question-content">
                                        <div className="d-flex align-items-center">
                                            <span>Texto Auxiliar</span>
                                            <button
                                                className="btn btn-link"
                                                onClick={() => this.toggleAuxiliaryText(question.id)}
                                                aria-expanded={this.state.expandedAuxiliaryText[question.id]}
                                                aria-controls={`auxiliary-text-${question.id}`}
                                            >
                                                {this.state.expandedAuxiliaryText[question.id] ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {this.state.expandedAuxiliaryText[question.id] && (
                                            <pre id={`auxiliary-text-${question.id}`}>
                                                <div dangerouslySetInnerHTML={{ __html: question.texto_aux }} />
                                            </pre>
                                        )}
                                    </div>

                                    <div className="question-content mb-3">
                                        <div dangerouslySetInnerHTML={{ __html: question.pergunta }} />
                                    </div>

                                    {/* Answer Options */}
                                    <div className="answer-options list-group mb-4">
                                        {question.alternativas.map((alt) => (
                                            <label key={alt.label} className="list-group-item d-flex align-items-center">
                                                <div className="option-circle">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`options-${question.id}`}
                                                        value={alt.label}
                                                        onChange={() => this.handleAnswerSelect(question.id, alt.label)}
                                                    />
                                                    <span className="q-option-item">{alt.label}</span>
                                                </div>
                                                <span className="option-text ms-2">{alt.value}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Feedback */}
                                    {this.state.feedback[question.id] && (
                                        <div className="feedback">
                                            <strong>{this.state.feedback[question.id]}</strong>
                                        </div>
                                    )}

                                    {/* Button */}
                                    <div className="btns">
                                        <div className="text-end">
                                            <button
                                                type="button"
                                                className="btn btnCustom btn-answer"
                                                onClick={() => this.handleSubmitAnswer(question)}
                                            >
                                                Responder
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btnCustom btn-info"
                                                onClick={() => this.showExplanation(question.explicacao)}
                                            >
                                                Explicação
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination Controls */}
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={this.handlePrevPage} href="#">Previous</a>
                                    </li>
                                    {pageNumbers.map(number => (
                                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                            <a className="page-link" onClick={() => this.setPage(number)} href="#">{number}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={this.handleNextPage} href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>

                {/* Modal for Explanation */}
                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Explicação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedExplanation}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
