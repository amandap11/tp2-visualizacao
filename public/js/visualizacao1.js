let colunaAliados;
let colunaInimigos;
let colunaPaises;

let aux;
let auxNode;

window.onload = visPadrao;

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#search-input').onkeyup = visFiltro;
}, false);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#checkboxEmpilhado').onchange = atualizaGrupo;
}, false);

function visPadrao(){

  colunaAliados = ['Allies'];
  colunaInimigos = ['Enemies'];
  colunaPaises = [];

  aux = [];
  auxNode = null;

  for (let i = 0; i < aliados.length; i++){
    let e = 0;
    for (let j = 0; j < inimigos.length; j++){
      if (aliados[i].ID === inimigos[j].ID){
        e = inimigos[j].Enemies;
        break;
      }
    }
    auxNode = {
      "ID": aliados[i].ID,
      "Allies": 100 * (Number(aliados[i].Allies) / (Number(aliados[i].Allies) + Number(e))),
      "Enemies": 100 * (Number(e) / (Number(aliados[i].Allies) + Number(e))),
      "Tag": aliados[i].Tag,
      "Total": Number(e) + Number(aliados[i].Allies)
    }
    aux.push(auxNode);
  }

  aux = ordena(aux);

  let max;
  if (aux.length > 20){
    max = 20;
  } else {
    max = aux.length;
  }

  for (let i = 0; i < max; i++){
    colunaAliados.push(aux[i].Allies);
    colunaInimigos.push(aux[i].Enemies);
    colunaPaises.push(aux[i].ID);
  }

  desenhaAgrupado();

};

function visFiltro(e){

  let pais = e.target.value;

  colunaAliados = ['Allies'];
  colunaInimigos = ['Enemies'];
  colunaPaises = [];

  aux = [];
  auxNode = null;

  aux = preencheAux(pais);
  aux = ordena(aux);

  let max;
  if (aux.length > 20){
    max = 20;
  } else {
    max = aux.length;
  }

  for (let i = 0; i < max; i++){
    colunaAliados.push(aux[i].Allies);
    colunaInimigos.push(aux[i].Enemies);
    colunaPaises.push(aux[i].ID);
  }

  let agrupado = document.querySelector('#checkboxEmpilhado').checked;
  if (agrupado){
    desenhaAgrupado();
  } else {
    desenhaSeparado();
  }


};

function ordena(vetor){
  // Ordena pela quantidade de relacionamentos
  vetor.sort(function (a, b) {
    if (Number(a.Total) < Number(b.Total)) { return 1; }
    if (Number(a.Total) > Number(b.Total)) { return -1; }
    return 0;
  });
  return vetor;
}

function preencheAux(pais){
  let vetor = [];
  for (let i = 0; i < aliados.length; i++){
    let e = 0;
    if (aliados[i].ID.toLowerCase().includes(pais.toLowerCase())){
      for (let j = 0; j < inimigos.length; j++){
        if (aliados[i].ID === inimigos[j].ID){
          e = inimigos[j].Enemies;
          break;
        }
      }
      auxNode = {
        "ID": aliados[i].ID,
        "Allies": 100 * (Number(aliados[i].Allies) / (Number(aliados[i].Allies) + Number(e))),
        "Enemies": 100 * (Number(e) / (Number(aliados[i].Allies) + Number(e))),
        "Tag": aliados[i].Tag,
        "Total": Number(e) + Number(aliados[i].Allies)
      }
      vetor.push(auxNode);
    }
  }
  return vetor;
}

function atualizaGrupo(e){
  let chart = document.querySelector('#visualizacao1');
  console.log(e.target.checked);
  if (e.target.checked){
    desenhaAgrupado();
  } else {
    desenhaSeparado();
  }
}

function desenhaAgrupado(){
  // Desenha a visualização
  let chart1 = c3.generate({
    // Determina onde desenhar
    bindto: '#visualizacao1',
    // Define os dados que serão exibidos
    data: {
      // Colunas / séries de dados: [nomeDaSerie, valor1, valor2, ..., valorN]
      columns: [
        colunaAliados,
        colunaInimigos
      ],
      // Tipo de série (nomeDaSerie: tipo)
      type: 'bar',
      groups: [
        [
          colunaAliados[0],
          colunaInimigos[0]
        ]
      ]
    },
    // Define as cores
    color: {
      pattern: ['#819FF7', '#FE2E2E']
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
        categories: colunaPaises,
        tick: {
          multiline: true
        },
        height: 80
      },
      y: {
        // Foi escolhido um texto e uma posição para o label do eixo y
        label: {
          text: 'Percentage',
          position: 'outer-middle'
        }
      },
      rotated: true
    },
    // Definição da largura das barras (de diferença de votos)
    bar: {
      width: {
        ratio: 0.4
      }
    },
    // Customização da informação exibida ao passar o mouse sobre a visualização
    tooltip: {
      show: true
    }
  });

  // Limita os valores exibidos no eixo y
  chart1.axis.max({y: 91});
}

function desenhaSeparado(){
  // Desenha a visualização
  let chart1 = c3.generate({
    // Determina onde desenhar
    bindto: '#visualizacao1',
    // Define os dados que serão exibidos
    data: {
      // Colunas / séries de dados: [nomeDaSerie, valor1, valor2, ..., valorN]
      columns: [
        colunaAliados,
        colunaInimigos
      ],
      // Tipo de série (nomeDaSerie: tipo)
      type: 'bar'
    },
    // Define as cores
    color: {
      pattern: ['#04B404', '#DF3A01']
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
        categories: colunaPaises,
        tick: {
          multiline: true
        },
        height: 80
      },
      y: {
        // Foi escolhido um texto e uma posição para o label do eixo y
        label: {
          text: 'Percentual',
          position: 'outer-middle'
        }
      },
      rotated: true
    },
    // Definição da largura das barras (de diferença de votos)
    bar: {
      width: {
        ratio: 0.4
      }
    },
    // Customização da informação exibida ao passar o mouse sobre a visualização
    tooltip: {
      show: true
    }
  });

  // Limita os valores exibidos no eixo y
  chart1.axis.max({y: 91});
}
