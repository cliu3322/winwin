import React, { useEffect } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  useEffect(() => {
    let ws = new WebSocket('ws://localhost:3030');
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
    };

    ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log(evt);
    };
  }, []);
  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent>
        <h1>Blank Page</h1>
      </LayoutContent>
    </LayoutContentWrapper>
  );
}
