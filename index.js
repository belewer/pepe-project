const express = require('express');
const app = express();
const port = 4320;

const NODE_USER = process.env.NODE_USER || 'fake';
const NODE_PASS = process.env.NODE_PASS || 'fake';
const CONFIG_NAME = process.env.CONFIG_NAME || 'fake';
const CONFIG_LABEL = process.env.CONFIG_LABEL || 'fake';

app.get('/', (req, res)=>{
  res.send(`
        <h1>Pepe project</h1>
        <ul>
            <li>NODE_USER: ${NODE_USER}</li>
            <li>NODE_PASS: ${NODE_PASS}</li>
            <li>CONFIG_NAME ${CONFIG_NAME}</li>
            <li>CONFIG_LABEL ${CONFIG_LABEL}</li>
        </ul>
    `);
});

app.listen(port, ()=>{
  console.log('Pepe project levantado en http://localhost:4320');
});
