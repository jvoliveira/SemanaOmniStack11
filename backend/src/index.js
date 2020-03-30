const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//Quando estiver em produção é possível passar o parâmetro origin
// Definindo assim qual endereço pode acessar nossa aplicação
// app.use(cors({
//     origin: "http://meuapp.com"
// }));
app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3333);
