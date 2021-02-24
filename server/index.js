const express = require('express')
const app = express()
const mqtt = require('mqtt')
const queryString = require('query-string')

const port = process.env.PORT || 3000
const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://broker.hivemq.com'
const client = mqtt.connect(MQTT_BROKER)

const MQTT_TOPIC = 'medma/iot-app/battery-monitor'
const HELLO_TIME_DURATION = 30

let BATTERIES = [
  {
    device: 'virtual-battery',
    voltage: 11.5,
    current: 1.35,
    temperature: 35,
    water: [80, 80, 50],
    connected: true,
  },
]

setInterval(() => {
  const now = new Date().getTime()

  const updatedBatteriesDb = BATTERIES.reduce((arr, item) => {
    if (item.device === 'virtual-battery') {
      arr = [...arr, item]
    } else {
      const diff = now - item.lastUpdate
      arr = [
        ...arr,
        {
          ...item,
          connected: diff < HELLO_TIME_DURATION,
        },
      ]
    }

    return arr
  }, [])

  BATTERIES = updatedBatteriesDb
}, 10000)

function processSensorUpdateMessage(message) {
  const data = queryString.parse(message, { arrayFormat: 'comma' })

  if (!!data.device) {
    const deviceIdx = BATTERIES.findIndex((b) => b.device === data.device)
    const exists = deviceIdx !== -1

    const values = Object.keys(data)
      .filter((x) => x !== 'device' && x !== 'water')
      .reduce((obj, key) => {
        obj[key] = Number(data[key])
        return obj
      }, {})

    const water = data.water.map((x) => Number(x))
    const parsedData = {
      ...data,
      ...values,
      water,
      connected: true,
      lastUpdate: new Date().getTime(),
    }

    if (exists) {
      BATTERIES.splice(deviceIdx, 1, parsedData)
    } else {
      BATTERIES.push(parsedData)
    }
  }
}

client.on('connect', () => {
  client.subscribe(MQTT_TOPIC)
  console.log(`Listenning to broker: ${MQTT_BROKER} topic: ${MQTT_TOPIC}`)
})

client.on('message', (topic, message) => {
  if (topic === MQTT_TOPIC) {
    console.log(message.toString())
    processSensorUpdateMessage(message.toString())
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/batteries', (req, res) => {
  res.send(BATTERIES)
})

app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`)
})
