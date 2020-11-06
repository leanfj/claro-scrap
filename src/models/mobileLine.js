const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mobileLineSchema = new Schema({
    consumedQuota: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    fullNumber: {
        type: String,
        required: true
    },
    initialQuota: {
        type: Number,
        required: true
    },
    isMemberEligible: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('MobileLines', mobileLineSchema)