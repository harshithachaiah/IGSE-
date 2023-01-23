const mongoose = require("mongoose")

const Tariff = new mongoose.Schema({

    electricityday: {
        type: Number,

    },

    electricitynight: {
        type: Number


    },
    gas:
    {
        type: Number,


    },
    standingcharge:
    {
        type: Number,


    }

},
    {
        collection: "TariffInfo"
    }
);

mongoose.model("TariffInfo", Tariff)