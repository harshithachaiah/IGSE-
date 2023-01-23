const mongoose = require("mongoose")

const RegisterDetailsSchema = new mongoose.Schema({

    customerid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    propertytype: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    voucher: {
        type: String,
        required: true


    },
    credit:
    {
        type: Number,

    },

    date:
    {
        type: Date,
        default: Date.now
    }

},
    {
        collection: "UserInfo"
    }
);

mongoose.model("UserInfo", RegisterDetailsSchema)