const mongoose = require("mongoose")

const VoucherDetails = new mongoose.Schema({

    voucher: {
        type: String,
        unique: true
    },

    used: {
        type: String


    },
    amount:
    {
        type: Number,
        required: true,
        default: 200

    },

    date:
    {
        type: Date,
        default: Date.now
    }



},
    {
        collection: "VoucherInfo"
    }
);

mongoose.model("VoucherInfo", VoucherDetails)