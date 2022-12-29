const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "qazwsxedcrfvtgbyhnujmik@£^&"


const mongoUrl = "mongodb+srv://achaiahharshith:Uniofleicester@cluster0.d6yqcrh.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => { console.log("Connected to Database"); })
    .catch(e => console.log(e))


require("./models/registerDetails")
require("./models/voucher")
require("./models/meterReadings")

const User = mongoose.model("UserInfo");
const Voucher = mongoose.model("VoucherInfo")
const UserMeterReading = mongoose.model("UserMeterReadings")

//api to register an user
app.post("/register", async (req, res) => {
    const user = { customerid, password, address, propertytype, bedrooms, voucher } = req.body;
    const enryptedPassword = await bcrypt.hash(password, 10);

    try {
        //const voucher = user.voucher;
        const olduser = await User.findOne({ customerid })
        const validvoucher = await Voucher.findOne({ voucher })

        console.log(validvoucher, "voucher");







        if (olduser) {
            return res.json({ error: "User Exists" });
        }
        /// add below && !validvoucher.isvalid
        //&& validvoucher == valid  !validvoucher.valid    && !validvoucher.valid     voucher.update check out this
        if (!validvoucher) {
            console.log("Invalid voucher");
            return res.json({ error: "Not a valid voucher" });

        }
        if (validvoucher.used == "true") {
            console.log("Voucher Already used");
            return res.json({ error: "Voucher Already used" });

        }

        await User.create({
            customerid,
            password: enryptedPassword,
            address,
            propertytype,
            bedrooms,
            credit: 200,
            //meterreading,
            voucher

        });



        await Voucher.findOneAndUpdate({ voucher }, { used: "true" });
        return res.send({ status: "ok" })




    } catch (error) {
        res.send({ status: "error" })

    }
});


//api to login as a customer or admin
app.post("/login-user", async (req, res) => {
    const { customerid, password } = req.body;


    let user = await User.findOne({ customerid })
    if (!user) {
        return res.json({ error: "Invalid Customer ID" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ customerid: user.customerid }, JWT_SECRET);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        }
        else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "invalid credentials" })

});

//api to display the user information
app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.customerid;
        User.findOne({ customerid: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: error, data: error })
            })
    } catch (error) {

    }
})



//add new voucher
app.post("/voucher", async (req, res) => {
    const testvoucher = { voucher } = req.body;
    //console.log(testvoucher);

    try {

        const oldvoucher = await Voucher.findOne({ voucher })
        if (oldvoucher) {
            return res.json({ error: "Voucher Exists" });
        }

        await Voucher.create({

            voucher,
            used: "false"

        });
        res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: "error" })

    }
});


app.post("/usermeterset", async (req, res) => {
    const meterdetails = { datevalue, daymeterreading, nightmeterreading, gasmeterreading, customerId } = req.body;
    try {
        await UserMeterReading.create({

            datevalue,
            daymeterreading,
            nightmeterreading,
            gasmeterreading,
            customerId

        });
        return res.send({ status: "ok" })


    } catch (error) {
        res.send({ status: "error" })

    }


});







//this server is running in localhost 4000
app.listen(4000, () => {
    console.log("Server started");
})












