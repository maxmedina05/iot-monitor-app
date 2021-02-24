import React from 'react'
import './App.scss'
import ReactFC from 'react-fusioncharts'
import {
  voltageChartDataSource,
  temperatureChartDataSource,
  waterLevelDataSource,
} from './ChartHelper'

// const battery = {
//   id: 'battery_1',
//   voltage: 11.5,
//   current: 1.35,
//   temperature: 35,
//   water: [80, 80, 50],
// }
// const batteries = [battery]

const batteryWaterLevelCharts = (levels) =>
  levels.map((l, i) => (
    <ReactFC
      key={`waterLevel_${i}`}
      type="cylinder"
      width="200"
      height="200"
      dataFormat="json"
      dataSource={waterLevelDataSource(l)}
    />
  ))

export default class App extends React.Component {
  apiCallInterval = null

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
    }
  }

  componentDidMount() {
    this.apiCallInterval = setInterval(() => {
      fetch('/batteries')
        .then((res) => res.json())
        .then(
          (res) => {
            this.setState({
              isLoaded: true,
              items: res,
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            })
          },
        )
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.apiCallInterval)
  }

  render() {
    const { isLoaded, items } = this.state

    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <h1>Monitor de Baterias</h1>

          <div className="batteries-container">
            {items.map((battery, idx) => (
              <div className="battery" key={`battery_${battery.device}`}>
                <h3>
                  Batería #{idx + 1} | {battery.device}
                </h3>

                <div className="grid">
                  <div className="grid-item">
                    <div className="card general-info">
                      <h4 className="header">Información General</h4>

                      <div className="body">
                        <p>
                          <strong>Voltaje:</strong> {battery.voltage}V
                        </p>
                        <p>
                          <strong>Corriente:</strong> {battery.current}A
                        </p>
                        <p>
                          <strong>Temperatura:</strong> {battery.temperature}
                          &#8451;
                        </p>

                        <div
                          className={!battery.connected ? 'disconnected-state' : ''}
                        >
                          <p>
                            <strong>Estado:</strong>{' '}
                            {battery.connected ? 'Conectado' : 'Desconectado'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="card water-level">
                      <h4 className="header">Nivel de Agua</h4>
                      <div className="body">
                        <div className="inner-container">
                          {batteryWaterLevelCharts(battery.water)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="card voltage">
                      <h4 className="header">Voltaje</h4>
                      <div className="body">
                        <ReactFC
                          type="angulargauge"
                          width="100%"
                          height="200"
                          dataFormat="json"
                          dataSource={voltageChartDataSource(battery.voltage)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid-item">
                    <div className="card temperature">
                      <h4 className="header">Temperatura</h4>
                      <div className="body">
                        <ReactFC
                          type="thermometer"
                          width="100%"
                          height="200"
                          dataFormat="json"
                          dataSource={temperatureChartDataSource(
                            battery.temperature,
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}
