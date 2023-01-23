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
require("./models/tariff")

const User = mongoose.model("UserInfo");
const Voucher = mongoose.model("VoucherInfo")
const UserMeterReading = mongoose.model("UserMeterReadings")
const Tariff = mongoose.model("TariffInfo")

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
        res.send({ status: "error" })

    }
});



//api to add new voucher
app.post("/voucher", async (req, res) => {
    const testvoucher = { voucher, amount } = req.body;
    //console.log(testvoucher);

    try {

        const oldvoucher = await Voucher.findOne({ voucher })
        if (oldvoucher) {
            return res.json({ error: "Voucher Exists" });
        }

        await Voucher.create({

            voucher,
            used: "false",
            amount


        });
        return res.send({ status: "ok" })

    } catch (error) {
        return res.send({ status: "error" })

    }
});

//api to set new meter reading by the user
app.post("/usermeterset", async (req, res) => {
    const meterdetails = { datevalue, daymeterreading, nightmeterreading, gasmeterreading, customerId } = req.body;
    try {
        await UserMeterReading.create({

            datevalue,
            daymeterreading,
            nightmeterreading,
            gasmeterreading,
            customerId,
            payment: "pending"


        });
        return res.send({ status: "ok" })


    } catch (error) {
        res.send({ status: "error" })

    }


});


//api to topup 
app.post("/topup", async (req, res) => {
    const { voucher, customerid } = req.body;

    try {
        const validvoucher = await Voucher.findOne({ voucher })

        const validUser = await User.findOne({ customerid })
        const amount = await Voucher.findOne({ voucher })
        var creditValue = validUser.credit + (amount.amount);


        console.log(validvoucher);

        if (!validvoucher) {
            console.log("Invalid voucher");
            return res.json({ error: "Not a valid voucher" });

        }

        if (validvoucher.used == "true") {
            console.log("Voucher Already used");
            return res.json({ error: "Voucher Already used" });

        }

        await User.findOneAndUpdate({ customerid }, { credit: creditValue });
        await User.findOneAndUpdate({ customerid }, { voucher: voucher });


        await Voucher.findOneAndUpdate({ voucher }, { used: "true" });
        return res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: "error" })
    }


});

//api to get the meterReading 
app.post("/usermeterdata", async (req, res) => {
    const { customerid } = req.body;


    try {


        let user = await UserMeterReading.findOne({ customerId: customerid })
        if (!user) {
            return res.json({ error: "No Readings" });

        }
        else {
            await UserMeterReading.find({ customerId: customerid }).sort({ datevalue: -1 }).limit(2)
                //await UserMeterReading.findOne({ customerId: customerid })


                .then((data) => {

                    return res.send({ status: "ok", data: data[0], actual: data });
                })
                .catch((error) => {
                    return res.send({ status: error, data: error })
                })

        }


    } catch (error) {

        return res.send({ status: "error" })

    }
});


//api to update the tariff for admin
app.post("/tariff", async (req, res) => {

    const { electricityday, electricitynight, gas, standingcharge } = req.body;

    try {


        await Tariff.updateOne({

            electricityday,
            electricitynight,
            gas,
            standingcharge


        });
        res.send({ status: "ok" })

    } catch (error) {
        res.send({ status: "error" })

    }


});


//api to get all the reading
app.post("/all-meterreadings", (req, res) => {


    UserMeterReading.find()
        //UserMeterReading.findAll({ customerId: customerid })
        .then(result => {
            return res.send(result);

        }).catch((error) => {
            console.log(error);
            return res.send({ status: "error" })

        })


});




// api to get the latest bill of the customer
app.get("/getenergystatistics", async (req, res) => {
    try {
        const meterReadings = await UserMeterReading.find();
        // merge duplicate customers
        let newData = [...new Set(meterReadings.map((d) => d.customerId))].map(
            (customerId) => {
                return {
                    customerId,
                    daymeterreading: meterReadings
                        .filter((d) => d.customerId === customerId)
                        .sort((a, b) => a.datevalue - b.datevalue)
                        .map((d) => d.daymeterreading)
                        .find((d) => d),
                    nightmeterreading: meterReadings
                        .filter((d) => d.customerId === customerId)
                        .sort((a, b) => a.datevalue - b.datevalue)
                        .map((d) => d.nightmeterreading)
                        .find((d) => d),
                    gasmeterreading: meterReadings
                        .filter((d) => d.customerId === customerId)
                        .sort((a, b) => a.datevalue - b.datevalue)
                        .map((d) => d.gasmeterreading)
                        .find((d) => d),
                    datevalue: meterReadings
                        .filter((d) => d.customerId === customerId)
                        .sort((a, b) => a.datevalue - b.datevalue)
                        .map((d) => d.datevalue)
                        .find((d) => d),
                };
            }
        );
        return res.status(200).send({ data: newData, status: "ok" });
    } catch (error) {
        console.log(error);
        res.status(403).send({ status: "error" });
    }
});

//task 2

//api to get the property count in an required json format
app.get("/igse/propertycount", async (req, res) => {
    try {
        const data = await User.aggregate([
            {
                $project: {
                    propertytype: 1,
                },
            },
            {
                $group: {
                    _id: "$propertytype",
                    total: { $sum: 1 },
                },
            },
        ]);
        const result = [];
        data.map((item, i) => {
            if (item._id === "flat") {
                result.push({ [item._id]: item.total });
            }
            if (item._id === "cottage") {
                result.push({ [item._id]: item.total });
            }
            if (item._id === "semi-detached") {
                result.push({ [item._id]: item.total });
            }
            if (item._id === "terraced") {
                result.push({ [item._id]: item.total });
            }
            if (item._id === "bungalow") {
                result.push({ [item._id]: item.total });
            }
            if (item._id === "mansion") {
                result.push({ [item._id]: item.total });
            }
            if (item._id === "detached") {
                result.push({ [item._id]: item.total });
            }
        });
        res.send(result);
    } catch (error) {
        res.send(console.log(error));
    }
});



//this server is running in localhost 4000
app.listen(4000, () => {
    console.log("Server started");
})












