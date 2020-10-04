let dadosTabela = [];

let bodyTabela, inputJogo, inputJogoAlterar, inputPlacar, inputPlacarAlterar,
  botaoAdd, botaoAlterar, jogoAtual, placarAtual, minimoAtual, maximoAtual = null;
let quebraMax = 1;
let quebraMin = 1;
let quebrouRecordeMin = false;

window.addEventListener('load', () => {
  bodyTabela = document.getElementById('bodyTabela');
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

  let localStorageTabela = JSON.parse(localStorage
    .getItem('tabela'));
  tabela = localStorage
    .getItem('tabela') !== null ? localStorageTabela : [];

  renderizar();
})


function renderizar() {
  tabela = [...dadosTabela];
  tabela.sort((a, b) => {
    return parseInt(a.Jogo) - parseInt(b.Jogo);
  });
  carregarTabela();
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

const atualizarLocalStorage = () => {
  localStorage.setItem('tabela', JSON.stringify(tabela));
  console.log(tabela);
}


function carregarTabela() {
  let tabelaHTML = '<tr>';

  tabela.forEach(linha => {
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
    tabelaHTML += linhaHTML;
    tabelaHTML += '</tr>';
  });

  bodyTabela.innerHTML = tabelaHTML;
};

function addDados() {
  jogoAtual = inputJogo.value;
  placarAtual = inputPlacar.value;
  let indice = tabela.length - 1;

  if (jogoAtual.trim() === '' || placarAtual.trim() === '') {
    return alert('Você precisa preencher todos os campos');
  };

  for (let i = 0; i < tabela.length; i++) {
    if (tabela[i].Jogo == jogoAtual) {
      inputJogo.style.border = '1px solid red';
      return alert('Esse jogo já existe, não é possível criar novamente');
    }
  }

  if (placarAtual < tabela[indice].Mínimo) {
    quebraMin++;
    maximoAtual = tabela[indice].Máximo;
    minimoAtual = placarAtual;
  }

  else if (placarAtual > tabela[indice].Máximo) {
    quebraMax++;
    minimoAtual = tabela[indice].Mínimo
    maximoAtual = placarAtual;
  }

  else {
    minimoAtual = tabela[indice].Mínimo;
    maximoAtual = tabela[indice].Máximo;
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

  console.log(linhaNova);

  tabela = [...tabela, linhaNova];
  carregarTabela();
  // renderizar();
  atualizarLocalStorage();
  inputJogo.value = '';
  inputPlacar.value = '';
};

function excluirDados() {
  let listaBotoes = document.querySelectorAll('.btn-danger');

  for (let i = 0; i < listaBotoes.length; i++) {
    let botaoAtual = listaBotoes[i];
    console.log(botaoAtual)
    let entrou = false;
    botaoAtual.addEventListener('click', () => {
      console.log(botaoAtual);
      if (window.confirm('Você tem certeza que deseja excluir o Jogo?')) {
        botaoAtual.parentElement.parentElement.remove();
        /*for (let j = 0; j < tabela.length; j++) {
          entrou = true
          console.log(tabela[i].Mínimo);
          console.log(typeof (tabela[j].Mínimo));
          if (tabela[i].Mínimo < tabela[j].Mínimo) {
            console.log('oi')
            minimoAtual = tabela[j].Mínimo;
            if (entrou) {
              quebraMin = tabela[j].Mínimo;
              entrou = false;
            };
          };
        };*/

        tabela.splice(i, 1);
        localStorage.removeItem('tabela', JSON.stringify(tabela[i]));
        atualizarLocalStorage();
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
      console.log(listaBotoes);
      listaBotoes = [];
      console.log(listaBotoes);
      console.log("entrou aqui");

      botaoAlterar.addEventListener('click', () => {
        let jogoAtualAlterar = inputJogoAlterar.value;
        let placarAtualAlterar = inputPlacarAlterar.value;
        let indice = tabela.length - 1;

        console.log(botaoAtual)

        console.log(jogoAtualAlterar + '' + placarAtualAlterar);

        if (jogoAtualAlterar.trim() === '' || placarAtualAlterar.trim() === '') {
          return alert('Você precisa preencher todos os campos');
        };

        for (let j = 0; j < tabela.length; j++) {
          if (tabela[j].Jogo == jogoAtualAlterar) {
            inputJogoAlterar.style.border = '1px solid red';
            return alert('Esse jogo já existe, não é possível criar novamente');
          }
        }

        if (placarAtualAlterar < tabela[indice].Mínimo) {
          quebraMin++;
          maximoAtual = tabela[indice].Máximo;
          minimoAtual = placarAtualAlterar;
        }

        else if (placarAtualAlterar > tabela[indice].Máximo) {
          quebraMax++;
          minimoAtual = tabela[indice].Mínimo
          maximoAtual = placarAtualAlterar;
        }

        else {
          minimoAtual = tabela[indice].Mínimo;
          maximoAtual = tabela[indice].Máximo;
        }

        minimoAtual = parseInt(minimoAtual);
        maximoAtual = parseInt(maximoAtual);


        tabela[i].Jogo = inputJogoAlterar.value;
        tabela[i].Placar = inputPlacarAlterar.value;
        tabela[i].Mínimo = minimoAtual;
        tabela[i].Máximo = maximoAtual;
        tabela[i].QuebraMax = quebraMax;
        tabela[i].QuebraMin = quebraMin;

        localStorage.setItem('tabela', JSON.stringify(localStorage[i]));
        atualizarLocalStorage();
        carregarTabela();
        inputJogoAlterar.value = '';
        inputPlacarAlterar.value = '';
        return
      })
      return
    })
    return
  }
}