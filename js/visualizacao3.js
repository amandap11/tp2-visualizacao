let quantidadePaises = ['Number of countries'];
let nomesConflitos = [];

let quant = document.querySelector('#quantElementos').value;
//let ord = document.querySelector('#ordenado').checked;
let ord = true;

document.querySelector('#quantElementos').addEventListener('change', function(e) {
  ranking(e.target.value, ord);
}, false);

window.onload = ranking(quant, ord);

function ranking(quantidade, ordenacao){

  quantidadePaises = ['Number of countries'];
  nomesConflitos = [];

  let novoVetor = [];
  let aux = null;

  for (let i = 0; i < edges.length; i++){
    let index = nomesConflitos.indexOf(edges[i].conflict_name);
    if (index == -1){
      aux = {
        conflict_name: edges[i].conflict_name,
        total: 2,
        paises: [edges[i].SourceID, edges[i].TargetID]
      };
      nomesConflitos.push(edges[i].conflict_name);
      novoVetor.push(aux);
    } else {
      let dif = 0;
      let indexAux = novoVetor[index].paises.indexOf(edges[i].SourceID);
      if (indexAux == -1){
        novoVetor[index].total += 1;
        novoVetor[index].paises.push(edges[i].SourceID);
      }
      indexAux = novoVetor[index].paises.indexOf(edges[i].TargetID);
      if (indexAux == -1){
        novoVetor[index].total += 1;
        novoVetor[index].paises.push(edges[i].TargetID);
      }
    }
  }

  novoVetor = ordena(novoVetor);

  let max = Math.min(quantidade, novoVetor.length);

  nomesConflitos = [];
  for (let i = 0; i < quantidade; i++){
    quantidadePaises.push(novoVetor[i].total);
    nomesConflitos.push(novoVetor[i].conflict_name);
    console.log("Conflito: ");
    console.log(novoVetor[i].conflict_name + ': ' + novoVetor[i].total);
    console.log("Países: ");
    console.log(novoVetor[i].paises);
  }

  desenha();

}

function ordena(vetor){
  // Ordena pela quantidade de relacionamentos
  vetor.sort(function (a, b) {
    if (Number(a.total) < Number(b.total)) { return 1; }
    if (Number(a.total) > Number(b.total)) { return -1; }
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
        quantidadePaises
      ],
      // Tipo de série (nomeDaSerie: tipo)
      type: 'bar'
    },
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
          text: 'Number of countries',
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
      show: true,
      format: {
        value: function (value) {
          return (value);
        }
      }
    }
  });

}
