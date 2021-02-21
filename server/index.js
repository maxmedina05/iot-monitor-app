const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mqtt = require('mqtt')
const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://broker.hivemq.com'
const client = mqtt.connect(MQTT_BROKER)

const MQTT_TOPIC = 'medma/iot-app/battery-monitor'

const BATTERIES = [
  {
    voltage: 11.5,
    current: 1.35,
    temperature: 35,
    water: [80, 80, 50],
  },
]

client.on('connect', () => {
  client.subscribe(MQTT_TOPIC)
  console.log(`Listenning to broker: ${MQTT_BROKER} topic: ${MQTT_TOPIC}`)
})

client.on('message', (topic, message) => {
  if (topic === MQTT_TOPIC) {
    console.log(message.toString())
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
