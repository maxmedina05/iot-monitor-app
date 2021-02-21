export function voltageChartDataSource(value) {
  return {
    chart: {
      lowerlimit: '0',
      upperlimit: '13',
      showvalue: '1',
      theme: 'fusion',
    },
    value,
    colorrange: {
      color: [
        {
          minvalue: '0',
          maxvalue: '8',
          code: '#F2726F',
        },
        {
          minvalue: '8',
          maxvalue: '10',
          code: '#FFC533',
        },
        {
          minvalue: '10',
          maxvalue: '14',
          code: '#62B58F',
        },
      ],
    },
    dials: {
      dial: [
        {
          value: `${value}V`,
        },
      ],
    },
    trendpoints: {
      point: [
        {
          startvalue: '12',
          displayvalue: 'Target',
          thickness: '2',
          color: '#E15A26',
          usemarker: '1',
          markerbordercolor: '#E15A26',
          markertooltext: '80%',
        },
      ],
    },
  }
}

export function temperatureChartDataSource(value) {
  return {
    chart: {
      lowerlimit: '0',
      upperlimit: '60',
      numbersuffix: '°C',
      thmfillcolor: '#008ee4',
      showgaugeborder: '1',
      gaugebordercolor: '#008ee4',
      gaugeborderthickness: '2',
      theme: 'fusion',
      showvalue: '1',
    },
    value,
  }
}

export function waterLevelDataSource(value) {
  return {
    chart: {
      lowerlimit: '0',
      upperlimit: '100',
      lowerlimitdisplay: 'Vacio',
      upperlimitdisplay: 'Lleno',
      numbersuffix: ' %',
      cylfillcolor: '#1976D2',
      cylfillhoveralpha: '85',
      theme: 'fusion',
    },
    value: value,
  }
}
