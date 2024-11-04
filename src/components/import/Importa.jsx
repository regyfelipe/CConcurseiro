import React, { useState } from "react";

const Importa = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async () => {
        if (!file) {
            alert("Por favor, selecione um arquivo JSON.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://192.168.18.11:3000/api/importQuestions", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error || "Erro desconhecido ao importar o arquivo."}`);
                return;
            }

            const data = await response.json();
            alert(data.message || "Questões importadas com sucesso!");
        } catch (error) {
            alert("Erro ao importar arquivo");
        }
    };

    return (
        <div>
            <h2>Importar Questões via JSON</h2>
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleImport}>Importar Questões</button>
        </div>
    );
};

export default Importa;
