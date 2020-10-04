let inputPlacar = document.getElementById('inputPlacar');
let placarAtual, indice, minimoAtual, maximoAtual, countMin, countMax = null;

$(function () {
    // Essa função envia uma requisição para o Backend quando clickada e executa
    // a função de listar os dados caso o retorno da requisição for positivo.
    $("#listar").click(function () {
        $.ajax({
            url: "http://localhost:5000/listarJogos",
            method: "GET",
            dataType: "json",
            success: listarJogos,
            error: () => {
                alert("Erro ao obter os dados para listar os jogos");
            }
        });
    });

    function listarJogos(listaDeJogos) {
        for (jogo of listaDeJogos) {
            linhaAtual = `<tr> 
                        <td>${jogo.id}</td> 
                        <td>${jogo.placar}</td> 
                        <td>${jogo.minimo}</td>
                        <td>${jogo.maximo}</td> 
                        <td>${jogo.quebraMin}</td> 
                        <td>${jogo.quebraMax}</td>  
                      </tr>`;

            $('#tabelaJogoBody').append(linhaAtual);
        }
    }

    $("#btnIncluir").click(function () {
        // Essa função serve para enviar uma requisição para obter os dados já
        // existentes no banco, comparando-os com o dado inserido pelos usuário 
        $.ajax({
            url: "http://localhost:5000/listarJogos",
            method: "GET",
            dataType: "json",
            success: obterJogos,
            error: () => {
                alert('Erro ao obter lista do Banco para incluir.')
            }
        });
    });

    function obterJogos(listaDeJogos) {
        placarAtual = inputPlacar.value;
        if (placarAtual.trim() === '') {
            return alert('Você precisa preencher o campo');
        };

        indice = listaDeJogos.length - 1;
        for (jogo of listaDeJogos) {
            countMin = listaDeJogos[indice].quebraMin;
            countMax = listaDeJogos[indice].quebraMax;
            if (placarAtual < listaDeJogos[indice].minimo) {
                countMin++;
                maximoAtual = listaDeJogos[indice].maximo;
                minimoAtual = placarAtual;
            }

            else if (placarAtual > listaDeJogos[indice].maximo) {
                countMax++;
                minimoAtual = listaDeJogos[indice].minimo;
                maximoAtual = placarAtual;
            }

            else {
                minimoAtual = listaDeJogos[indice].minimo;
                maximoAtual = listaDeJogos[indice].maximo;
            }
        }

        let dados = JSON.stringify({
            placar: placarAtual, minimo: minimoAtual,
            maximo: maximoAtual, quebraMin: countMin, quebraMax: countMax
        });
        // A funçaõ envia uma requisição ao Backend e caso o retorno for positivo
        // insere um novo dado no banco de dados
        $.ajax({
            url: 'http://localhost:5000/incluirJogos',
            type: 'POST',
            contentType: 'application/json', //enviando os dados em json
            dataType: 'json',
            data: dados,
            success: incluirJogo,
            error: erroIncluirJogo
        });
        function incluirJogo(resposta) {
            if (resposta.resultado == "ok") {
                alert("Jogo incluído com sucesso");
                $("#inputPlacar").val("");
            } else {
                alert("Erro ao incluir");
            }
        }
        function erroIncluirJogo(resposta) {
            alert("Não deu certo pra incluir no backend");
        }
    };
});