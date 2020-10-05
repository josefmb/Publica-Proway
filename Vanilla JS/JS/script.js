let dadosTabela = [];

let bodydadosTabela, inputJogo, inputJogoAlterar, inputPlacar, inputPlacarAlterar,
  botaoAdd, botaoAlterar, jogoAtual, placarAtual, minimoAtual, maximoAtual = null;
let quebraMax = 1;
let quebraMin = 1;
let quebrouRecordeMin = false;

window.addEventListener('load', () => {
  bodydadosTabela = document.getElementById('bodydadosTabela');
  inputJogo = document.getElementById('inputJogo');
  inputJogoAlterar = document.getElementById('inputJogoAlterar');
  inputPlacarAlterar = document.getElementById('inputPlacarAlterar');
  inputPlacar = document.getElementById('inputPlacar');
  botaoAdd = document.querySelector('#btnIncluir');
  botaoAlterar = document.querySelector('#btnAlterar');

  dadosTabela = [{
    Jogo: 1,
    Placar: 12,
    Mínimo: 12,
    Máximo: 12,
    QuebraMin: 0,
    QuebraMax: 0
  },
  {
    Jogo: 2,
    Placar: 24,
    Mínimo: 12,
    Máximo: 24,
    QuebraMin: 0,
    QuebraMax: 1
  },
  {
    Jogo: 3,
    Placar: 10,
    Mínimo: 10,
    Máximo: 24,
    QuebraMin: 1,
    QuebraMax: 1
  },
  {
    Jogo: 4,
    Placar: 24,
    Mínimo: 12,
    Máximo: 24,
    QuebraMin: 1,
    QuebraMax: 1
  }];

  renderizar();
})


function renderizar() {
  dadosTabela.sort((a, b) => {
    return parseInt(a.Jogo) - parseInt(b.Jogo);
  });
  carregarDadosTabela();
  botaoAdd.addEventListener('click', addDados);
  inputJogo.addEventListener('keyup', (evento) => {
    // A tecla com keyCode 13 é o Enter
    if (evento.keyCode === 13) {
      addDados();
    }
  })
  inputPlacar.addEventListener('keyup', (evento) => {
    if (evento.keyCode === 13) {
      addDados();
    }
  })

  excluirDados();
  alterarDados();
};

function carregarDadosTabela() {
  let dadosTabelaHTML = '<tr>';

  dadosTabela.forEach(linha => {
    const { Jogo, Placar, Mínimo, Máximo, QuebraMin, QuebraMax } = linha;

    const linhaHTML = `
    <th scope="row" class="dados">${Jogo}</th>
    <td class="dados">${Placar}</td>
    <td class="dados">${Mínimo}</td>
    <td class="dados">${Máximo}</td>
    <td class="dados">${QuebraMin}</td>
    <td class="dados">${QuebraMax}</td>
    <td class="dados">
    <button type="button" class="btn btn-secondary alterar"><a data-toggle="modal" data-target="#alteracaoDados">Alterar</a></button>
    <button type="button" class="btn btn-danger">Excluir</button>
    </td>
    `;
    dadosTabelaHTML += linhaHTML;
    dadosTabelaHTML += '</tr>';
  });

  bodyTabela.innerHTML = dadosTabelaHTML;
};

function addDados() {
  jogoAtual = inputJogo.value;
  placarAtual = inputPlacar.value;
  let indice = dadosTabela.length - 1;

  if (jogoAtual.trim() === '' || placarAtual.trim() === '') {
    return alert('Você precisa preencher todos os campos');
  };

  for (let i = 0; i < dadosTabela.length; i++) {
    if (dadosTabela[i].Jogo == jogoAtual) {
      inputJogo.style.border = '1px solid red';
      return alert('Esse jogo já existe, não é possível criar novamente');
    }
  }

  if (placarAtual < dadosTabela[indice].Mínimo) {
    quebraMin++;
    maximoAtual = dadosTabela[indice].Máximo;
    minimoAtual = placarAtual;
  }

  else if (placarAtual > dadosTabela[indice].Máximo) {
    quebraMax++;
    minimoAtual = dadosTabela[indice].Mínimo
    maximoAtual = placarAtual;
  }

  else {
    minimoAtual = dadosTabela[indice].Mínimo;
    maximoAtual = dadosTabela[indice].Máximo;
  }

  minimoAtual = parseInt(minimoAtual);
  maximoAtual = parseInt(maximoAtual);

  let linhaNova = {
    Jogo: jogoAtual,
    Placar: placarAtual,
    Mínimo: minimoAtual,
    Máximo: maximoAtual,
    QuebraMin: quebraMin,
    QuebraMax: quebraMax
  };


  dadosTabela = [...dadosTabela, linhaNova];
  carregarDadosTabela();
  renderizar();
  inputJogo.value = '';
  inputPlacar.value = '';
};

function excluirDados() {
  let listaBotoes = document.querySelectorAll('.btn-danger');

  for (let i = 0; i < listaBotoes.length; i++) {
    let botaoAtual = listaBotoes[i];
    botaoAtual.addEventListener('click', () => {
      if (window.confirm('Você tem certeza que deseja excluir o Jogo?')) {
        botaoAtual.parentElement.parentElement.remove();
        dadosTabela.splice(i, 1);
      }
    })
  }
}

function alterarDados() {
  let listaBotoes = [];
  listaBotoes = document.querySelectorAll('.alterar');

  for (let i = 0; i < listaBotoes.length; i++) {
    let botaoAtual = listaBotoes[i];

    botaoAtual.addEventListener('click', () => {
      botaoAlterar.addEventListener('click', () => {
        let jogoAtualAlterar = inputJogoAlterar.value;
        let placarAtualAlterar = inputPlacarAlterar.value;
        let indice = dadosTabela.length - 1;

        if (jogoAtualAlterar.trim() === '' || placarAtualAlterar.trim() === '') {
          return alert('Você precisa preencher todos os campos');
        };

        for (let j = 0; j < dadosTabela.length; j++) {
          if (dadosTabela[j].Jogo == jogoAtualAlterar) {
            inputJogoAlterar.style.border = '1px solid red';
            return alert('Esse jogo já existe, não é possível criar novamente');
          }
        }

        if (placarAtualAlterar < dadosTabela[indice].Mínimo) {
          quebraMin++;
          maximoAtual = dadosTabela[indice].Máximo;
          minimoAtual = placarAtualAlterar;
        }

        else if (placarAtualAlterar > dadosTabela[indice].Máximo) {
          quebraMax++;
          minimoAtual = dadosTabela[indice].Mínimo
          maximoAtual = placarAtualAlterar;
        }

        else {
          minimoAtual = dadosTabela[indice].Mínimo;
          maximoAtual = dadosTabela[indice].Máximo;
        }

        minimoAtual = parseInt(minimoAtual);
        maximoAtual = parseInt(maximoAtual);


        dadosTabela[i].Jogo = inputJogoAlterar.value;
        dadosTabela[i].Placar = inputPlacarAlterar.value;
        dadosTabela[i].Mínimo = minimoAtual;
        dadosTabela[i].Máximo = maximoAtual;
        dadosTabela[i].QuebraMax = quebraMax;
        dadosTabela[i].QuebraMin = quebraMin;

        carregarDadosTabela();
        inputJogoAlterar.value = '';
        inputPlacarAlterar.value = '';
        return
      })
      return
    })
    return
  }
}