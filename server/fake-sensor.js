const mqtt = require('mqtt')
const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://broker.hivemq.com'
const client = mqtt.connect(MQTT_BROKER)

const MQTT_TOPIC = 'medma/iot-app/battery-monitor'
let current = 1.35
let goingUp = true

client.on('connect', () => {
  setInterval(() => {
    sendFakeSignal()
  }, 5000)
})

// device=fake-battery&voltage=11.5&current=1.35&temperature=35&water=80,80,50
// mosquitto_pub -h broker.hivemq.com -t medma/iot-app/battery-monitor -m "device=max-battery&voltage=11.5&current=1.35&temperature=35&water=80,80,50"
function sendFakeSignal() {
  current = goingUp ? current + 0.05 : current - 0.05

  let strCurrent = (current + 0.05).toFixed(2)

  if (current > 4) {
    goingUp = false
  } else if (current < 1) {
    goingUp = true
  }

  client.publish(
    MQTT_TOPIC,
    `device=fake-battery&voltage=11.5&current=${strCurrent}&temperature=35&water=80,80,50`,
  )
}
