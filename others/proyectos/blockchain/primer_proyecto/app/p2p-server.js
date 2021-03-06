const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
        console.log(`Esperando por conexiones peer-to-peer ws en: ${P2P_PORT}`);
        this.connectToPeers();
    }

    connectToPeers() {
        peers.forEach(peer => {
          const socket = new Websocket(peer);
          socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log('Socket conectado');

        this.messageHandler(socket);

        socket.send(JSON.stringify(this.blockchain.chain));
        this.sendChain(socket);
    }

    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        });
    }

    syncChains() {
        this.sockets.forEach(socket => {
          this.sockets.forEach(socket => this.sendChain(socket));
        });
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }
    
}
module.exports = P2pServer;