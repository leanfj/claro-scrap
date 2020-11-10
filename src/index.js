const data = require('./data')
const saveResult = require('./mongoConnect')
const {pageURL} = data

const webScraping = require("./webscraping")

webScraping(pageURL)
    .then(dataObj => {
        saveResult(dataObj)
    })
    .catch(console.error)