const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
	res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`Un nuevo bloque ha sido agregado: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
  });

app.listen(HTTP_PORT, () => console.log(`Escuchando el puerto Http: ${HTTP_PORT}`));
p2pServer.listen();