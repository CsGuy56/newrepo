const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successfull",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
 
/*****payment getWay */
// console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1PAd9pSBM2jSksZv2GSDtSh0"}],
          

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));


// const dotenv = require("dotenv").config();
// const Stripe = require("stripe");
// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));
// // https://restaurant-server.vercel.app/webhook
// const PORT = process.env.PORT || 8080;
// const YOUR_DOMAIN = "https://localhost:3000"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-checkout-session", async (req, res) => {
//   console.log(req.body);
//     try{
//         const params = {
//             submit_type: "pay",
//             mode: "payment",
//             payment_method_types: ["card"],
//             billing_address_collection: "auto",
//             shipping_options: [{ shipping_rate: "shr_1MJTX8SHnOGYGLnPO1haAXqp" }],
        
//             line_items: req.body.map((item) => {
//               return {
//                 price_data: {
//                   currency: "inr",
//                   product_data: {
//                     name: item.title,
//                     images: [item.imgURL],
//                   },
//                   unit_amount: item.price * 100,
//                 },
//                 adjustable_quantity: {
//                   enabled: true,
//                   minimum: 1,
//                 },
//                 quantity: item.qty,
//               };
//             }),
        
//             //mode: "payment",
//             success_url: `${process.env.FRONTEND_URL}success`,
//             cancel_url: `${process.env.FRONTEND_URL}canceled`,
//           };

//           const session = await stripe.checkout.sessions.create(params);
//           res.status(200).json(session.id)
//         //   res.redirect(303, session.url);
//     }catch(err){
//         res.status(err.statusCode || 500).json(err.message);
//     }
 
// });


// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_eb4a5f8d2421cf7cafafc42199c2f362e38a3d53865f35a5c6066cb25c31c439";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.async_payment_failed':
//       const checkoutSessionAsyncPaymentFailed = event.data.object;
//       console.log("checkoutSessionAsyncPaymentFailed",checkoutSessionAsyncPaymentFailed)
//       // Then define and call a function to handle the event checkout.session.async_payment_failed
//       break;
//     case 'checkout.session.async_payment_succeeded':
//       const checkoutSessionAsyncPaymentSucceeded = event.data.object;
//       console.log("checkoutSessionAsyncPaymentSucceeded",checkoutSessionAsyncPaymentSucceeded)
//       // Then define and call a function to handle the event checkout.session.async_payment_succeeded
//       break;
//     case 'checkout.session.completed':
//       const checkoutSessionCompleted = event.data.object;
//       console.log("checkoutSessionCompleted",checkoutSessionCompleted)
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     case 'checkout.session.expired':
//       const checkoutSessionExpired = event.data.object;
//       console.log("checkoutSessionExpired",checkoutSessionExpired)
//       // Then define and call a function to handle the event checkout.session.expired
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });




// app.listen(PORT, () => console.log("Running on port " + PORT));