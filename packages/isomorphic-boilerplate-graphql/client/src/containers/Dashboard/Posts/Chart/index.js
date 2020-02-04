//https://www.npmjs.com/package/react-use-websocket

import React, { useState, useEffect } from 'react';
import MyD3Component from './MyD3Component';
let ws;
export default function Chart() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3030');
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
    };

    ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log(JSON.parse(evt.data));
    };

    return function cleanup() {
      console.log('disconnected', ws);
      ws.close();
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <MyD3Component data={[1, 2, 3]} />
    </div>
  );
}
