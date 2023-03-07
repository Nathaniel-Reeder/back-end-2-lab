const houses = require("./db.json")
let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        const index = houses.findIndex(house => house.id === +id)
        if(index >= 0) {
            houses.splice(index, 1)
            res.status(200).send(houses)
        } else {
            res.sendStatus(404)
        }
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        if (!address || !price || !imageURL) {
            res.sendStatus(400)
        }
        const copy = {...req.body, id: houseId}
        houses.push(copy)
        houseId++
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body
        const index = houses.findIndex(house => house.id === +id)
        if(type === 'plus') {
            houses[index].price = houses[index].price + 10000
            res.status(200).send(houses)
        } else if(type === 'minus' && houses[index].price > 0) {
            if (houses[index].price - 10000 < 0) {
                houses[index].price = houses[index].price - houses[index].price
                res.status(200).send(houses)
            } else{
                houses[index].price = houses[index].price - 10000
                res.status(200).send(houses)
            }  
        }
    }
}