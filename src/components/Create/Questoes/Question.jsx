import React from "react";
import { HeaderPage } from "../../Header/Header";
import './Question.css';

export class CreateQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextAux: false,
            showImageAux: false,
            alternatives: [{ label: "A", value: "" }, { label: "B", value: "" }],
            correctAnswer: "",
            viewData: {
                banca: "",
                instituicao: "",
                prova: "",
                nivel: "",
                disciplina: "",
                assunto: "",
                pergunta: "",
                textoAux: "",
            },
            explicacao: "",
        };
    }

    toggleTextAux = () => {
        this.setState(prevState => ({ showTextAux: !prevState.showTextAux }));
    }

    toggleImageAux = () => {
        this.setState(prevState => ({ showImageAux: !prevState.showImageAux }));
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            viewData: {
                ...prevState.viewData,
                [name]: value,
            }
        }));
    }

    handleAlternativeChange = (index, value) => {
        const newAlternatives = this.state.alternatives.map((alt, i) =>
            i === index ? { ...alt, value } : alt
        );
        this.setState({ alternatives: newAlternatives });
    }

    addAlternative = () => {
        const newLabel = String.fromCharCode(65 + this.state.alternatives.length);
        this.setState(prevState => ({
            alternatives: [...prevState.alternatives, { label: newLabel, value: "" }],
        }));
    }

    removeAlternative = (index) => {
        this.setState(prevState => {
            const updatedAlternatives = prevState.alternatives.filter((_, i) => i !== index);

            const relabeledAlternatives = updatedAlternatives.map((alt, i) => ({
                ...alt,
                label: String.fromCharCode(65 + i),
            }));

            return { alternatives: relabeledAlternatives };
        });
    }
    applyFormatting = (format) => {
        const textarea = document.getElementById("textoAux");
        const { value, selectionStart, selectionEnd } = textarea;

        const openTag = format === "bold" ? "<b>" : "<u>";
        const closeTag = format === "bold" ? "</b>" : "</u>";

        const selectedText = value.slice(selectionStart, selectionEnd);
        const newText = `${value.slice(0, selectionStart)}${openTag}${selectedText}${closeTag}${value.slice(selectionEnd)}`;

        this.setState((prevState) => ({
            viewData: {
                ...prevState.viewData,
                textoAux: newText,
            },
        }), () => {
            textarea.selectionStart = selectionEnd + openTag.length;
            textarea.selectionEnd = selectionEnd + openTag.length;
            textarea.focus();
        });
    }


    renderCorrectAnswerOptions = () => {
        return this.state.alternatives.map((alternative, index) => (
            <option key={index} value={alternative.label}>
                {alternative.label}
            </option>
        ));
    };

    handleSubmit = async () => {
        const { viewData, alternatives, correctAnswer, explicacao } = this.state;
    
        const questionData = {
            banca: viewData.banca,
            instituicao: viewData.instituicao,
            prova: viewData.prova,
            nivel: viewData.nivel,
            disciplina: viewData.disciplina,
            assunto: viewData.assunto,
            pergunta: viewData.pergunta,
            textoAux: viewData.textoAux,
            alternativas: alternatives,
            correctAnswer: correctAnswer,
            explicacao: explicacao,
        };
    
        try {
            const response = await fetch('https://backendcconcurseiro-production.up.railway.app/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(questionData),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                this.setState({
                    viewData: {
                        disciplina: "",
                        assunto: "",
                        instituicao: "",
                        banca: "",
                        prova: "",
                        nivel: "",
                        textoAux: "",
                        pergunta: "",
                    },
                    alternatives: [{ label: "A", value: "" }, { label: "B", value: "" }],
                    correctAnswer: "",
                    explicacao: "",
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Erro ao enviar questão:', error);
            alert('Erro ao enviar questão');
        }
    };
    

    render() {
        const { viewData, showTextAux, showImageAux, alternatives, correctAnswer, explicacao } = this.state;

        return (
            <>
                <HeaderPage />
                <main className="customContainer">
                    <div className="main-content">
                        <div className="container custom-container my-5">
                            <div className="row g-0">
                                <div className="col-lg-6 col-md-6 col-12 mb-4">
                                    <div className="row">
                                        {["banca", "instituicao", "prova", "nivel", "disciplina", "assunto"].map((field, index) => (
                                            <div className="col-md-6 mb-3" key={index}>
                                                <input
                                                    type="text"
                                                    id={field}
                                                    name={field}
                                                    className="form-control"
                                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                    value={viewData[field]}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="d-flex mb-3">
                                        <button
                                            id="text-aux-btn"
                                            className="btn btn-outline-secondary me-2"
                                            onClick={this.toggleTextAux}
                                        >
                                            Texto auxiliar
                                        </button>
                                        <button
                                            id="image-aux-btn"
                                            className="btn btn-outline-secondary"
                                            onClick={this.toggleImageAux}
                                        >
                                            Imagem auxiliar
                                        </button>
                                    </div>

                                    {showTextAux && (
                                        <div id="text-aux-field" className="mb-3">
                                            <div className="formatting-buttons mb-2">
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => this.applyFormatting("bold")}>
                                                    <strong>B</strong>
                                                </button>
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => this.applyFormatting("underline")}>
                                                    <u>U</u>
                                                </button>
                                            </div>
                                            <textarea
                                                rows="8"
                                                id="textoAux"
                                                name="textoAux"
                                                className="form-control area"
                                                placeholder="Digite o texto auxiliar"
                                                value={viewData.textoAux}
                                                onChange={this.handleInputChange}
                                                style={{ height: 'auto', minHeight: '160px' }}
                                            />
                                        </div>
                                    )}


                                    {showImageAux && (
                                        <div id="image-aux-field" className="mb-3">
                                            <input type="file" id="imagemAux" className="form-control" />
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            id="pergunta"
                                            name="pergunta"
                                            className="form-control"
                                            placeholder="Pergunta"
                                            value={viewData.pergunta}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>

                                    <div id="alternatives-section">
                                        {alternatives.map((alt, index) => (
                                            <div className="alternative mb-3" key={index} data-option={alt.label}>
                                                <span className="option-label">{alt.label}</span>
                                                <input
                                                    type="text"
                                                    className="form-control alternative-input"
                                                    value={alt.value}
                                                    onChange={(e) => this.handleAlternativeChange(index, e.target.value)}
                                                />
                                                <button className="btn btn-danger btn-sm ms-2" onClick={() => this.removeAlternative(index)}>Excluir</button>
                                            </div>
                                        ))}
                                    </div>
                                    <button id="add-alternative-btn" className="btn btn-outline-secondary" onClick={this.addAlternative}>
                                        Adicionar mais uma alternativa
                                    </button>

                                    <div className="mb-3">
                                        <label htmlFor="correct-answer" className="form-label">Selecione a Alternativa Correta:</label>
                                        <select
                                            id="correct-answer"
                                            className="form-select"
                                            value={correctAnswer}
                                            onChange={(e) => this.setState({ correctAnswer: e.target.value })}
                                        >
                                            <option value="">Escolha uma opção</option>
                                            {this.renderCorrectAnswerOptions()}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="explanation" className="form-label">Explicação ou Código (Opcional):</label>
                                        <textarea
                                            id="explanation"
                                            name="explicacao"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Digite sua explicação ou código aqui"
                                            value={explicacao}
                                            onChange={(e) => this.setState({ explicacao: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button id="create-question-btn" className="btn btn-primary" onClick={this.handleSubmit}>
                                        Criar Questão
                                    </button>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12 mb-4 view">
                                    <div className="view-section card">
                                        <div class="question-header">
                                            <span className="ms-2">{`${viewData.disciplina} » ${viewData.assunto}`}</span>
                                            <div className="text-muted">
                                                <small>
                                                    {`Nivel: ${viewData.nivel}  | Banca: ${viewData.banca} | Órgão: ${viewData.instituicao}`}
                                                </small>
                                            </div>

                                        </div>
                                        <div className="question-content">
                                            <pre><div dangerouslySetInnerHTML={{ __html: viewData.textoAux }} /> </pre>
                                        </div>

                                        <p>{viewData.pergunta}</p>
                                        <div id="view-alternatives">
                                            {alternatives.map((alternative) => (
                                                <label key={alternative.label} className="d-flex align-items-center mb-3">
                                                    <div className="option-circle">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="options"
                                                            value={alternative.label}
                                                        />
                                                        <span className="q-option-item">{alternative.label}</span>
                                                    </div>
                                                    <span className="option-text ms-2">
                                                        {alternative.value || `Opção ${alternative.label}`}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        <p><strong>Alternativa Correta:</strong> { correctAnswer || "Nenhuma selecionado"}</p>
                                        <div className="explicacao">
                                            <p><strong>Explicação:</strong> {explicacao}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
