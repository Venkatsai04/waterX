import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTT_SERVER = 'ws://broker.hivemq.com:8000/mqtt';  // Example public broker

const MQTT_TOPIC = 'test/one';  // Ensure this matches the publisher's topic

const MqttComponent = () => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const client = mqtt.connect(MQTT_SERVER);
  
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
  
    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });
  
    client.on('close', () => {
      console.log('MQTT connection closed');
    });
  
    return () => {
      client.end();  // Clean up the connection
    };
  }, []);  // Ensure this effect runs once
  
  return (
    <div>
      <h2>MQTT Topic: {MQTT_TOPIC}</h2>
      <p>Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Message: {message || 'No messages received'}</p>
    </div>
  );
};

export default MqttComponent;
