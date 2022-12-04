const express = require('express');
const controller = require('./controller')
const cors = require('cors');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
const {getAllItems, nameCharacter, buyItemFromStore, sellItem} = require("./controller.js");
app.get('/api/items', getAllItems);
app.post('/api/name', nameCharacter);
app.put('/api/items/:id', buyItemFromStore);
app.delete('/api/items/:id', sellItem);


app.listen(port, () => console.log('Serving is running on ' + port))