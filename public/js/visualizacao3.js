let edgesBrasil = [];

for (let i = 0; i < edges.length; i++){
  if (edges[i].SourceID == 'Brazil'
      || edges[i].TargetID == 'Brazil'){
    edgesBrasil.push(edges[i]);
  }
}

let linhaDoTempoBrasil = [];
let linhaDoTempoBrasilInimigos = [];
let linhaDoTempoBrasilAliados = [];

let linhaDoTempoMundo = [];

for (let i = 1501; i < 2018; i++){
  linhaDoTempoBrasil.push({
    'ano': i,
    'relacionamentos': 0,
    'aliados': [],
    'inimigos': [],
    'conflitos': []
  });
  linhaDoTempoMundo.push({
    'ano': i,
    'relacionamentos': 0,
    'aliados': [],
    'inimigos': [],
    'conflitos': []
  });
}

let iAliados = 0;
let iInimigos = 0;

for (let i = 0; i < edgesBrasil.length; i++){
  for (let j = 0; j < linhaDoTempoBrasil.length; j++){
    if (Number(edgesBrasil[i].year_start) <= linhaDoTempoBrasil[j].ano
          && Number(edgesBrasil[i].year_end) >= linhaDoTempoBrasil[j].ano){
      linhaDoTempoBrasil[j].relacionamentos += 1;
      linhaDoTempoBrasil[j].conflitos.push(edgesBrasil[i].conflict_name);
      if (edgesBrasil[i].relation == '+'){
        if (edgesBrasil[i].SourceID == 'Brazil'){
          linhaDoTempoBrasil[j].aliados.push(edgesBrasil[i].TargetID);
        } else {
          linhaDoTempoBrasil[j].aliados.push(edgesBrasil[i].SourceID);
        }
      } else {
        if (edgesBrasil[i].SourceID == 'Brazil'){
          linhaDoTempoBrasil[j].inimigos.push(edgesBrasil[i].TargetID);
        } else {
          linhaDoTempoBrasil[j].inimigos.push(edgesBrasil[i].SourceID);
        }
      }
    }
  }
}

for (let i = 0; i < edges.length; i++){
  for (let j = 0; j < linhaDoTempoMundo.length; j++){
    if (Number(edges[i].year_start) <= linhaDoTempoMundo[j].ano
          && Number(edges[i].year_end) >= linhaDoTempoMundo[j].ano){
      linhaDoTempoMundo[j].relacionamentos += 1;
      linhaDoTempoMundo[j].conflitos.push(edges[i].conflict_name);
      if (edges[i].relation == '+'){
        linhaDoTempoMundo[j].aliados.push(edges[i].TargetID);
        linhaDoTempoMundo[j].aliados.push(edges[i].SourceID);
      } else {
        linhaDoTempoMundo[j].inimigos.push(edges[i].TargetID);
        linhaDoTempoMundo[j].inimigos.push(edges[i].SourceID);
      }
    }
  }
}

let colRelacionamentosMundo = ['World'];
let colRelacionamentosBrasil = ['Brazil'];
let colYears = ['Year'];

for (let i = 0; i < linhaDoTempoBrasil.length; i++){
  colRelacionamentosBrasil.push(linhaDoTempoBrasil[i].relacionamentos);
}

for (let i = 0; i < linhaDoTempoMundo.length; i++){
  colRelacionamentosMundo.push(linhaDoTempoMundo[i].relacionamentos);
}

for (let i = 0; i < linhaDoTempoBrasil.length; i++){
  let stringAno = linhaDoTempoBrasil[i].ano + '-01-01';
  colYears.push(Date.parse(stringAno));
}

var chart = c3.generate({
  bindto: '#visualizacao3',
  data: {
      columns: [
        colYears,
        colRelacionamentosMundo,
        colRelacionamentosBrasil
      ],
      x: 'Year',
      type: 'line'
  },
  point: {
    r: 1.5,
  },
  axis : {
    x: {
      type : 'timeseries',
      tick: {
        format: function (x) { return x.getFullYear(); },
        //count: 30,
        values: [
          '1500-01-01',
          '1611-01-01',
          '1821-01-01',
          '1834-01-01',
          '1863-01-01',
          '1898-01-01',
          '1913-01-01',
          '1938-01-01',
          '1964-01-01',
          '2018-01-01'
        ]
      },
      label: {
        text: 'Region/Country',
        position: 'outer-right'
      }
    },
    y: {
      min: 2,
      label: {
        text: 'Amount of Relations',
        position: 'outer-middle'
      }
    }
  }
});
