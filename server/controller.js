const {items} = require('../items')
module.exports = {
    getAllItems: async (req, res) => {
        try {
            res.status(200).send(items)
        }
        catch (error) {
            console.log('ERROR GETTING ITEMS', error)
            res.status(400)
        }
    },
    nameCharacter: async (req, res) => {
        try {
            const {inputContent} = req.body;
            console.log(inputContent)
            res.status(200).send(inputContent)
        }
        catch (error) {
            console.log('ERROR NAMING CHARACTER', error)
            res.status(400)
        }
    },
    buyItemFromStore: async (req, res) => {
        try {
            const {id} = req.params;
            let foundItem = null;
            // find the item in items.js with that id
            for(let i = 0; i < items.length; i++){
                if(id == items[i].id){
                    foundItem = items[i];
                    return foundItem
                }
            }
            res.status(200).send(foundItem)
        }
        catch (error) {
            console.log('ERROR GETTING ITEMS', error)
            res.status(400)
        }
    },
    sellItem: async (req, res) => {
        try {
            const {id} = req.params;
            let foundItem = null;
            // find the item in items.js with that id
            for(let i = 0; i < items.length; i++){
                if(id == items[i].id){
                    foundItem = items[i];
                    return foundItem
                }
            }
            res.status(200).send(foundItem)
        }
        catch (error) {
            console.log('ERROR GETTING ITEMS', error)
            res.status(400)
        }
    }
}