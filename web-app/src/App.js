import './App.scss'
import ReactFC from 'react-fusioncharts'
import {
  voltageChartDataSource,
  temperatureChartDataSource,
  waterLevelDataSource,
} from './ChartHelper'
import { useEffect, useState } from 'react'

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/batteries')
      .then((res) => res.json())
      .then(
        (res) => {
          setIsLoaded(true)
          setItems(res)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

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

  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="App">
        <h1>Monitor de Baterias</h1>

        <div className="batteries-container">
          {items.map((battery, idx) => (
            <div className="battery" key={`battery_${idx}`}>
              <h3>Batería #{idx + 1}</h3>

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
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
