let duracaoConflitos = ['Duration'];
let nomesConflitos = [];

let quant = document.querySelector('#quantElementos').value;
//let ord = document.querySelector('#ordenado').checked;
let ord = true;

document.querySelector('#quantElementos').addEventListener('change', function(e) {
  ranking(e.target.value, ord);
}, false);

/*document.querySelector('#ordenado').addEventListener('change', function(e) {
  console.log(e.target.checked);
  ranking(quant, e.target.checked);
}, false);*/


window.onload = ranking(quant, ord);

function ranking(quantidade, ordenacao){

  duracaoConflitos = ['Duration'];
  nomesConflitos = [];

  let dataFim;
  let dataInicio;

  let novoVetor = [];
  let aux = null;

  for (let i = 0; i < edges.length; i++){
    dataInicio = Number(edges[i].year_start);
    if (edges[i].year_end == "Ongoing"){
      dataFim = 2018;
    } else {
      dataFim = edges[i].year_end;
    }
    let d = Number(dataFim) - dataInicio;
    aux = {
      //"country1": edges[i].SourceID,
      //"country2": edges[i].TargetID,
      "nomeConflito": edges[i].conflict_name,
      "duracao": d
    }
    novoVetor.push(aux);
  }

  novoVetor = ordena(novoVetor);
  novoVetor = agrupaConflitos(novoVetor);

  let max = Math.min(quantidade, novoVetor.length);

  for (let i = 0; i < quantidade; i++){
    duracaoConflitos.push(novoVetor[i].duracao);
    nomesConflitos.push(novoVetor[i].nomeConflito);
  }

  desenha();

}

function agrupaConflitos(vetor){

  let conflitos = [];

  let aux = {
    duracao: vetor[0].duracao,
    nomeConflito: vetor[0].nomeConflito
  };

  conflitos.push(aux);

  let repetido = false;
  for (let i = 1; i < vetor.length; i++){
    aux = null;
    repetido = false;
    for (let j = 0; j < conflitos.length; j++){
      if (vetor[i].nomeConflito == conflitos[j].nomeConflito){
        repetido = true;
      }
    }
    if (!repetido){
      aux = {
        duracao: vetor[i].duracao,
        nomeConflito: vetor[i].nomeConflito
      };
      conflitos.push(aux);
    }
  }

  return conflitos;

}

function ordena(vetor){
  // Ordena pela quantidade de relacionamentos
  vetor.sort(function (a, b) {
    if (Number(a.duracao) < Number(b.duracao)) { return 1; }
    if (Number(a.duracao) > Number(b.duracao)) { return -1; }
    return 0;
  });
  return vetor;
}

function desenha(){
  // Desenha a visualização
  let chart1 = c3.generate({
    // Determina onde desenhar
    bindto: '#visualizacao2',
    // Define os dados que serão exibidos
    data: {
      // Colunas / séries de dados: [nomeDaSerie, valor1, valor2, ..., valorN]
      columns: [
        duracaoConflitos
      ],
      // Tipo de série (nomeDaSerie: tipo)
      type: 'bar'
    },
    // Define as cores
    /*color: {
      pattern: ['#04B404', '#DF3A01']
    },*/
    // Define se a legenda deve ser exibida e onde deve ser posicionada
    legend: {
      show: true,
      position: 'right'
    },
    // Informações sobre os eixos
    axis : {
      // O eixo x terá o nome dos candidatos como categorias e os nomes dos
      // candidatos podem estar quebrados em mais de uma linha
      x: {
        type: 'category',
        categories: nomesConflitos,
        tick: {
          multiline: true
        }
      },
      y: {
        // Foi escolhido um texto e uma posição para o label do eixo y
        label: {
          text: 'Duration (in years)',
          position: 'outer-middle'
        }
      },
      rotated: true
    },
    // Definição da largura das barras (de diferença de votos)
    bar: {
      width: {
        ratio: 0.7
      }
    },
    // Customização da informação exibida ao passar o mouse sobre a visualização
    tooltip: {
      show: true
    }
  });

}
