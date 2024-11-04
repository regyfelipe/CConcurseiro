import React from "react";
import { Filter } from "../../Filter/Filter";
import { HeaderPage } from "../../Header/Header";
import './QuestionCard.css';

export class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [], 
            selectedAnswers: {},
            feedback: {}, 
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

        // console.log(`Comparando: Selected Answer = ${selectedAnswer}, Correct Answer = ${correctAnswer}`);

        const isCorrect = selectedAnswer === correctAnswer; 

        this.setState((prevState) => ({
            feedback: {
                ...prevState.feedback,
                [question.id]: isCorrect ? "Correto!" : "Incorreto.",
            },
        }));
    };

    render() {
        return (
            <>
                <main className="cardQuestion">
                    <HeaderPage />
                    <div className="containerCustom">
                        <Filter />
                        <div className="container">
                            {this.state.questions.map((question) => (
                                <div key={question.id} className="card mx-auto" style={{ maxWidth: '1200px' }}>
                                    {/* Header Section */}
                                    <div className="question-header">
                                        <span className="badge">{`Q${question.id}`}</span>
                                        <span className="ms-2">{`${question.disciplina} » ${question.assunto}`}</span>
                                        <div className="text-muted">
                                            <small>{`Banca: ${question.banca} | Órgão: ${question.instituicao}`}</small>
                                        </div>
                                    </div>
                                    
                                    <div className="question-content">
                                            <pre><div dangerouslySetInnerHTML={{ __html: question.texto_aux }} /> </pre>
                                        </div>

                                    {/* Question Content */}
                                    <div className="question-content mb-4">
                                        <p>{question.pergunta}</p>
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
                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-answer"
                                            onClick={() => this.handleSubmitAnswer(question)}
                                        >
                                            Responder
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
