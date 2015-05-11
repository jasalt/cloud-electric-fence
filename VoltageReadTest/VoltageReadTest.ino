/*
  Arduino sketch for reading 8-led voltage gauge.
  Every 2 leds are connected in series.
  Using 4051 multiplexer.

  TODO 
  - Convert sketch for Spark Core
  - Fix reading fluctuation (connections?)
  - Send averaged values to server every 5 seconds

  Datasheet: http://playground.arduino.cc/learning/4051
*/

// Multiplexer selector pins
int mpA = 2; // Yellow cable
int mpB = 3; // Red cable
int mpC = 4; // Gray cable
int mpIN = A1;

const int ledCount = 4;

int ledVoltagesArray [ ledCount ];

int i;
int j;

void setup() {
  pinMode(mpA, OUTPUT);
  pinMode(mpB, OUTPUT);
  pinMode(mpC, OUTPUT);

  Serial.begin(9600);

  digitalWrite(mpA, LOW);
  digitalWrite(mpB, LOW);
  digitalWrite(mpC, LOW);
}

void loop() {
  readAll();
  delay(100);
}

/* 
  Reads all multiplexer values into an array and prints them to serial 
*/
void readAll() {
  for (i = 0; i < ledCount; i++) {
    ledVoltagesArray[i] = readMultiplexerPin(i);
  }

  for (j = 0; j < ledCount; j++) {
    Serial.print("Pin ");
    Serial.print(j);
    Serial.print(": ");
    Serial.println(ledVoltagesArray[j]);
  }
}

/* 
  Reads a single multiplexer input 
  TODO Pins maybe in wrong order
*/
int readMultiplexerPin(int pinNumber) {
  switch (pinNumber)
    {
    case 0:
      {
        digitalWrite(mpA, LOW);
        digitalWrite(mpB, LOW);
        digitalWrite(mpC, LOW);

        return analogRead(mpIN);
      }
    case 1:
      {
        digitalWrite(mpA, LOW);
        digitalWrite(mpB, HIGH);
        digitalWrite(mpC, LOW);
        
        return analogRead(mpIN);
      }
    case 2:
      {
        digitalWrite(mpA, LOW);
        digitalWrite(mpB, LOW);
        digitalWrite(mpC, HIGH);

        return analogRead(mpIN);
      }
    case 3:
      {
        digitalWrite(mpA, LOW);
        digitalWrite(mpB, HIGH);
        digitalWrite(mpC, HIGH);

        return analogRead(mpIN);
      }
    }
}
