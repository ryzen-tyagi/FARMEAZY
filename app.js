const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//app.use(bodyParser.json());


app.get("/",cors(),(req,res)=>{

})




const regression = require('ml-regression');
const bodyParser = require('body-parser');

// Load your dataset and preprocess it (as shown in your previous code)
const fs = require('fs');
const csv = require('csv-parser');

const dataset = [];
fs.createReadStream('veggie.csv')
  .pipe(csv({
    mapHeaders: ({ header }) => header.trim(),
    mapValues: ({ value }) => value.trim()
  }))
  .on('data', (row) => {
    const dateParts = row.Date.split('-');
    const parsedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    if (!isNaN(parsedDate.getTime())) { // Filter out invalid dates
      dataset.push({
        date: parsedDate,
        carrotPrice: parseFloat(row.Carrot),
        tomatoPrice: parseFloat(row.Tomato),
        broccoliPrice: parseFloat(row.Broccoli)
      });
    }
  })
  .on('end', () => {
    console.log('Dataset loaded and preprocessed.');
  });

app.use(bodyParser.json());

app.post('/predict', (req, res) => {
  const { date, vegName } = req.body;

  // Find the corresponding vegetable prices and dates
  const vegPrices = dataset.map(data => data[`${vegName}Price`]);
  const dates = dataset.map(data => data.date.getTime());

  // Create a linear regression model
  const model = new regression.SimpleLinearRegression(dates, vegPrices);

  // Predict the price for the target date
  const targetDate = new Date(date).getTime();
  const predictedPrice = Math.round(model.predict(targetDate)); // Round to nearest integer

  res.json({ prediction: predictedPrice });

});




app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

const stripe = require('stripe')('sk_test_51NfOrPSFb4QFkH2tfqZeRoyB0poke9UHscMDrDhWHgFgKh6JZU3Pm9NxEQraPMeqZVfA41wNR1KsZIVKtx7lnd3x00tilZQue9');

app.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency } = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
      console.log(paymentIntent.client_secret);
      res.status(200).json({ success:true,clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating payment intent' });
    }
  });

 
  


app.listen(8000,()=>{
    console.log("port connected");
})