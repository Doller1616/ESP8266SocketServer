#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
// Replace with your network credentials
const char* ssid = "Saurabh";
const char* password = "abhi1abhi";
ESP8266WebServer server(80); //instantiate server at port 80 (http port)
String page = "";
double Lightdata;
void setup(void){
pinMode(A0, INPUT);
delay(1000);
Serial.begin(115200);
WiFi.begin(ssid, password); //begin WiFi connection
Serial.println("");
// Wait for connection
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.print("Connected to ");
Serial.println(ssid);
Serial.print("IP address: ");
Serial.println(WiFi.localIP());
server.on("/", [](){
page = String(Lightdata); //publish the value in text
server.send(200, "text/html", page);
});
server.begin();
Serial.println("Web server started!");
}
// loop to read sensor
void loop(void){
Lightdata = analogRead(A0);
Serial.println(Lightdata);
delay(1000);
server.handleClient();
}
