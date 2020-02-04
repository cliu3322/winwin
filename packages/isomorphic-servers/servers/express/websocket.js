import WebSocket from 'ws';
var subscribeMsg = {
  event: 'bts:subscribe',
  data: {
    channel: 'live_trades_btcusd',
  },
};
var ws;
var response;
function initWebsocket() {
  ws = new WebSocket('wss://ws.bitstamp.net');

  ws.onopen = function() {
    ws.send(JSON.stringify(subscribeMsg));
  };

  /**
   * In case of unexpected close event, try to reconnect.
   */
  ws.onclose = function() {
    console.log('Websocket connection closed');
    initWebsocket();
  };
}

initWebsocket();

const wss = new WebSocket.Server({ port: 3030 });

wss.on('connection', function connection(wsreact) {
  wss.clients.forEach(function each(client) {
    ws.onmessage = function(evt) {
      response = JSON.parse(evt.data);
      /**
       * This switch statement handles message logic. It processes data in case of trade event
       * and it reconnects if the server requires.
       */
      console.log(response);
      client.send(JSON.stringify(response));
    };

    // console.log(client === wsreact)
    // if (client !== wsreact && client.readyState === WebSocket.OPEN) {
    // 	console.log('asdfasdfasdf')
    // 	client.send(data);
    // }
  });
});
