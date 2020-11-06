const data = require("./data")

const {mongoURI} = data

const mongoose = require("mongoose")

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB Connected")).catch(error => console.log(error))

const saveResult = async dataObj => {

    try {
        const mobileLineModel = require("./models/mobileLine")
        
        mongoose.connection.db.dropCollection("mobilelines")
        console.time("Salvando dados")
        await mobileLineModel.create(dataObj).then(console.log("Dados Salvos")).catch(error => console.log("Error -> ", error))
        console.timeEnd()
        mongoose.disconnect()
    } catch (error) {
        console.error(error)
    }
}

module.exports = saveResult