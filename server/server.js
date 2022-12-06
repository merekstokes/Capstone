const express = require('express');
const controller = require('./controller')

const app = express();
const port = 3001;
app.use(express.json());

const {getAllItems, nameCharacter, buyItemFromStore, sellItem, nameDelete} = require("./controller.js");


app.get('/api/items', getAllItems);
app.post('/api/name', nameCharacter);
app.put('/api/items/:itemId', buyItemFromStore);
app.delete('/api/items/:id', sellItem);
app.delete('/api/nameDelete', nameDelete);


app.listen(port, () => console.log('Serving is running on ' + port))