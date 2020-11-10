const data = require("./data")

const {mongoURI} = data

const mongoose = require("mongoose")

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB Connected")).catch(error => console.log(error))

const saveResult =async dataObj => {

    try {
        console.log("DATA SIZE ->", dataObj.length)
    
        const mobileLineModel = require("./models/mobileLine")
        
        mongoose.connection.db.dropCollection("mobilelines")
        
        await mobileLineModel.create(dataObj)
            .then(console.log("Dados Salvos"))
            .then(() => {
                mongoose.disconnect()
            })
            .catch(error => console.log("Error -> ", error))

    } catch (error) {
        console.error(error)
    }
}

module.exports = saveResult