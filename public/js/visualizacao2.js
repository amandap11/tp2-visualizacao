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

  let dataFim = Number(2018);
  let dataInicio;

  let novoVetor = [];
  let aux = null;

  for (let i = 0; i < edges.length; i++){
    dataInicio = Number(edges[i].year_start);
    if (edges[i].year_end != "Ongoing"){
      dataFim = Number(edges[i].year_end);
    }
    aux = {
      "country1": edges[i].SourceID,
      "country2": edges[i].TargetID,
      "conflict_name": edges[i].conflict_name,
      "duration": dataFim - dataInicio
    }
    novoVetor.push(aux);
  }

  novoVetor = ordena(novoVetor);

  for (let i = 0; i < quantidade; i++){
    duracaoConflitos.push(novoVetor[i].duration);
    nomesConflitos.push(novoVetor[i].conflict_name);
  }

  desenha();

}

function ordena(vetor){
  // Ordena pela quantidade de relacionamentos
  vetor.sort(function (a, b) {
    if (Number(a.duration) < Number(b.duration)) { return 1; }
    if (Number(a.duration) > Number(b.duration)) { return -1; }
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
        },
        height: 80
      },
      y: {
        // Foi escolhido um texto e uma posição para o label do eixo y
        label: {
          text: 'Duração (em anos)',
          position: 'outer-middle'
        }
      },
      rotated: true
    },
    // Definição da largura das barras (de diferença de votos)
    bar: {
      width: {
        ratio: 0.6
      }
    },
    // Customização da informação exibida ao passar o mouse sobre a visualização
    tooltip: {
      show: true
    }
  });

}
