// API PARA FERIADOS NACIONAIS (DIGITAR APENAS O ANO)

document.addEventListener("DOMContentLoaded", function () {

    const botaoData = document.getElementById("btn-Data");
    const inputData = document.getElementById("inputData");
    const respostaData = document.getElementById("respostaData");

    botaoData.addEventListener("click", async function () {
        const ano = inputData.value.trim();

        if (!ano) {
            respostaData.innerHTML = "Digite um ano.";
            return;
        }

        respostaData.innerHTML = "Buscando...";

        try {
            const response = await fetch(
                `https://brasilapi.com.br/api/feriados/v1/${ano}`
            );

            if (!response.ok) {
                respostaData.innerHTML = "Ano inválido ou não encontrado.";
                return;
            }

            const feriados = await response.json();

            if (!feriados.length) {
                respostaData.innerHTML = "Nenhum feriado encontrado para esse ano.";
                return;
            }

            let html = "<ul class='lista-resultado'>";
            feriados.forEach(function (feriado) {
                const dataFormatada = new Date(feriado.date + "T00:00:00").toLocaleDateString("pt-BR");
                html += `<li><strong>${dataFormatada}</strong> — ${feriado.name}</li>`;
            });
            html += "</ul>";

            respostaData.innerHTML = html;

        } catch (erro) {
            respostaData.innerHTML = "Erro ao consultar a API.";
        }
    });

});


// API PARA CEP

document.addEventListener("DOMContentLoaded", function () {

    const botaoCEP = document.getElementById("btn-CEP");
    const inputCEP = document.getElementById("inputCEP");
    const respostaCEP = document.getElementById("respostaCEP");

    botaoCEP.addEventListener("click", async function () {
        const cep = inputCEP.value.trim();

        if (!cep) {
            respostaCEP.innerHTML = "Digite um CEP.";
            return;
        }

        respostaCEP.innerHTML = "Buscando...";

        try {
            const response = await fetch(
                `https://brasilapi.com.br/api/cep/v1/${cep}`
            );

            if (!response.ok) {
                respostaCEP.innerHTML = "CEP inválido ou não encontrado.";
                return;
            }

            const dados = await response.json();

            respostaCEP.innerHTML = `
                <ul class="lista-resultado">
                    <li><strong>CEP:</strong> ${dados.cep}</li>
                    <li><strong>Estado:</strong> ${dados.state}</li>
                    <li><strong>Cidade:</strong> ${dados.city}</li>
                    <li><strong>Bairro:</strong> ${dados.neighborhood || "—"}</li>
                    <li><strong>Rua:</strong> ${dados.street || "—"}</li>
                </ul>
            `;

        } catch (erro) {
            respostaCEP.innerHTML = "Erro ao consultar a API.";
        }
    });

});


// API PARA CONSULTAR IBGE (DIGITAR APENAS A SIGLA DO ESTADO EM LETRA MAIÚSCULA)

document.addEventListener("DOMContentLoaded", function () {

    const botaoIBGE = document.getElementById("btn-IBGE");
    const inputIBGE = document.getElementById("inputIBGE");
    const respostaIBGE = document.getElementById("respostaIBGE");

    botaoIBGE.addEventListener("click", async function () {
        const ibge = inputIBGE.value.trim().toUpperCase();

        if (!ibge) {
            respostaIBGE.innerHTML = "Digite a sigla de um estado.";
            return;
        }

        respostaIBGE.innerHTML = "Buscando...";

        try {
            const response = await fetch(
                `https://brasilapi.com.br/api/ibge/municipios/v1/${ibge}`
            );

            if (!response.ok) {
                respostaIBGE.innerHTML = "Sigla de estado inválida.";
                return;
            }

            const municipios = await response.json();

            if (!municipios.length) {
                respostaIBGE.innerHTML = "Nenhum município encontrado.";
                return;
            }

            let html = `<p class="resultado-resumo">${municipios.length} municípios em ${ibge}</p>`;
            html += "<ul class='lista-resultado lista-rolavel'>";
            municipios.forEach(function (municipio) {
                html += `<li>${municipio.nome}</li>`;
            });
            html += "</ul>";

            respostaIBGE.innerHTML = html;

        } catch (erro) {
            respostaIBGE.innerHTML = "Erro ao consultar a API.";
        }
    });

});
