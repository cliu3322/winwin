//https://www.npmjs.com/package/react-use-websocket

import React, { useState, useEffect } from 'react';
import MyD3Component from './MyD3Component';
let ws;
export default function Chart() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [data, setDataCount] = useState(null);

  useEffect(() => {
    return function cleanup() {
      console.log('disconnected', ws);
      ws.close();
    };
  }, []);

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3030');
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
    };

    ws.onmessage = evt => {
      let ticks = JSON.parse(evt.data);

      setDataCount(ticks.data);
    };
  }, []);

  return (
    <div>
      {!data && (
        <p>
          Retriving data, please wait <br />
        </p>
      )}
      <p>The curren price is {data ? data.price : 0} USD</p>
      <MyD3Component data={data} />
    </div>
  );
}
