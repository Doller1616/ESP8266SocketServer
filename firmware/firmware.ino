#include <ESP8266WiFi.h>
#include <ArduinoJson.h>       // https://arduinojson.org/
#include <WebSocketsClient.h>  // download and install from https://github.com/Links2004/arduinoWebSockets
#include <SocketIOclient.h>

#define SSID "Oscars"
#define PASSWORD "abhi1abhi"
#define SERVER "1d7c-111-223-31-164.ngrok.io"  // Server URL (without https://www)


SocketIOclient socketIO;
StaticJsonDocument<64> doc;
const int LED_PIN = 5; // Pin D1, NodeMCU 0.9 0r ESP 12.0

void messageHandler(uint8_t* payload) {

  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.println(error.f_str());
    return;
  }

  String messageKey = doc[0];
  bool value = doc[1];
  if (messageKey == "buttonState") {
    digitalWrite(LED_PIN, value);
  }
}

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.println("Disconnected!");
      break;

    case sIOtype_CONNECT:
      Serial.printf("Connected to url: %s%s\n", SERVER, payload);
      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      break;

    case sIOtype_EVENT:
      messageHandler(payload);
      break;
  }
}

void setupWiFi() {
  Serial.println("\nConnecting...");

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected : ");
  Serial.println(WiFi.localIP());
}


void setup() {
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600);

  setupWiFi();

  // server address, port and URL
  socketIO.begin(SERVER, 80, "/socket.io/?EIO=4");

  socketIO.onEvent(socketIOEvent);
}

void loop() {
  socketIO.loop();
}
