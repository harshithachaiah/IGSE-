const mongoose = require("mongoose")

const MeterReadings = new mongoose.Schema({

    datevalue:
    {
        type: String,
        required: true

    },
    daymeterreading:
    {
        type: Number,
        required: true
    },
    nightmeterreading:
    {
        type: Number,
        required: true
    },
    gasmeterreading:
    {
        type: Number,
        required: true
    },
    customerId:
    {
        type: String,
        required: true

    },
    payment:
    {
        type: String,
        required: true

    }





},
    {
        collection: "UserMeterReadings"
    }
);

mongoose.model("UserMeterReadings", MeterReadings)