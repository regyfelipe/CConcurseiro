import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Simulado.css';

const Simulado = () => {
    const { id } = useParams();
    const [simulado, setSimulado] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [isNameInputVisible, setIsNameInputVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchSimulado = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://backendcconcurseiro-production.up.railway.app/api/simulado/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar simulado.');
                }
                const data = await response.json();
                setSimulado(data);
                const questionsData = await Promise.all(
                    data.questions.map(async (questionId) => {
                        try {
                            const questionResponse = await fetch(`https://backendcconcurseiro-production.up.railway.app/api/questions/${questionId}`);
                            if (!questionResponse.ok) {
                                throw new Error('Erro ao buscar questão.');
                            }
                            return await questionResponse.json();
                        } catch (err) {
                            console.error(err);
                            return null;
                        }
                    })
                );
                const validQuestions = questionsData.filter(q => q !== null);
                setQuestions(validQuestions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulado();

        return () => {
            setSimulado(null);
            setQuestions([]);
            setError('');
            setLoading(false);
        };
    }, [id]);

    const handleAnswerSelect = (questionId, selectedValue) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [questionId]: selectedValue,
        }));
    };

    const handleSubmitAnswer = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setName('');
        setIsNameInputVisible(false);
        setSubmitted(false);
    };

    const handleConfirm = () => {
        setIsNameInputVisible(true);
    };

    const handleFinalSubmit = async () => {
        if (name.trim() !== '') {
            setSubmitted(true);
            const formattedAnswers = questions.map(question => {
                return `${question.id} ${feedback[question.id] || 'Nenhuma resposta selecionada'}`;
            }).join(', ');

            const submissionData = {
                name,
                answers: formattedAnswers,
            };

            try {
                const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/saveAnswers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData),
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar respostas.');
                }

                alert(`Simulado enviado com sucesso, ${name}!`);
            } catch (error) {
                console.error('Erro ao enviar respostas:', error);
            }
        } else {
            alert('Por favor, insira seu nome.');
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Simulado: {simulado.exam_name}</h1>
            {questions.map((question) => (
                <div key={question.id} className="card mx-auto" style={{ maxWidth: '1200px' }}>
                    {/* Header Section */}
                    <div className="question-header">
                        <span className="badge">{`Q${question.id}`}</span>
                        <span className="ms-2">{`${question.disciplina} `}</span>
                    </div>

                    <div className="question-content">
                        <pre>
                            <div dangerouslySetInnerHTML={{ __html: question.texto_aux }} />
                        </pre>
                    </div>

                    {/* Question Content */}
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
                                        onChange={() => handleAnswerSelect(question.id, alt.label)}
                                    />
                                    <span className="q-option-item">{alt.label}</span>
                                </div>
                                <span className="option-text ms-2">{alt.value}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <div className="text-end mb-4">
                <button type="button" className="btn btn-dark" onClick={handleSubmitAnswer}>
                    ENVIAR RESPOSTA
                </button>
            </div>

            {/* Modal for Selected Answers */}
            {showModal && (
                <div className="modal" style={{ display: 'block', zIndex: 1050 }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Resumo das Respostas</h5>
                            </div>
                            <div className="modal-body">
                                <div className="grid-container">
                                    {questions.map((question) => (
                                        <div key={question.id} className="grid-item">
                                            <div className="circle">
                                                {question.id}
                                            </div>
                                            <span>
                                                {feedback[question.id] ? (
                                                    <strong>{feedback[question.id]}</strong>
                                                ) : (
                                                    'Nenhuma resposta selecionada'
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="containerSimulado">
                                    {isNameInputVisible && (
                                        <div className="mb-4">
                                            <label htmlFor="name" className="form-label">Digite seu nome:</label>
                                            <input
                                                type="text"
                                                className="form-control premium-input"
                                                id="name"
                                                placeholder='Nome Completo'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {submitted && (
                                        <div className="confirmation-message">
                                            <p>Simulado enviado com sucesso, <strong>{name}</strong>!</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Fechar
                                </button>
                                <button type="button" className="btn btn-success" onClick={handleFinalSubmit}>
                                    Confirma
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Simulado;
