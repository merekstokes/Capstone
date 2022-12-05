const express = require('express');
const controller = require('./controller')
const cors = require('cors');

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
const {getAllItems, nameCharacter, buyItemFromStore, sellItem, nameDelete} = require("./controller.js");


app.get('/api/items', getAllItems);
app.post('/api/name', nameCharacter);
app.put('/api/items/:itemId', buyItemFromStore);
app.delete('/api/items/:id', sellItem);
app.delete('/api/nameDelete', nameDelete);


app.listen(port, () => console.log('Serving is running on ' + port))