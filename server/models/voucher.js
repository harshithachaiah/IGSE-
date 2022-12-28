const mongoose = require("mongoose")

const VoucherDetails = new mongoose.Schema({

    voucher: {
        type: String,

        unique: true
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