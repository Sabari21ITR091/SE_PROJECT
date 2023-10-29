const express = require('express');
const cors = require('cors');
const Razorpay = require("razorpay");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pradeeprajarm:Pradeep2310@cluster0.wqyvs7j.mongodb.net/se?retryWrites=true&w=majority')
    .then(res => {
        console.log("db connected successfully")
    })
    .catch(err => {
        console.log(err)
    })

const bookingSchema = new mongoose.Schema({
        "image": String,
        "resalePrice": Number,
        "carName": String,
        "userEmail": String,
        "paid": Boolean
})

const Booking = mongoose.model("booking",bookingSchema);

app.post('/book',async (req,res)=>{
    try {
        const new_booking = new Booking({...req.body});
        await new_booking.save();
        res.send(200);
    } catch (err){
        console.log(err);
    }
})


app.post("/custom_pay", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_zpcvSUNJXUqrLv',
            key_secret:'uGZApKWjnDBHcfaMiQQctHxQ',
        });

        console.log(Math.round(req.body.amount))

        const options = {
            amount: Math.round(req.body.amount)*10, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");
        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

app.listen(5000,() => {
    console.log('server started');
})