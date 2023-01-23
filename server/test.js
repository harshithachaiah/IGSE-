const mongoose = require('mongoose')
require('./models/tariff')
const User = mongoose.model("TariffInfo");

const fs = require('fs');

const mongoUrl = "mongodb+srv://achaiahharshith:Uniofleicester@cluster0.d6yqcrh.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => { console.log("Connected to Database"); })
    .catch(e => console.log(e))


const fetch = async () => {
    const users = await User.find({})
    fs.writeFileSync('../tariff.json', JSON.stringify({ users }), 'utf-8')
    process.exit()
}

fetch()