const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./router");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
const mongoose = require("mongoose"); 
const propertyRouter = require("./property");
const userRouter = require("./user");
const contactRouter = require("./contact")
//db connection
const db = require("./db");
db.connect();


//middleware
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(express.json());
app.use(cors()); 

//cors headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next(); 
  });

app.use("/property", propertyRouter);
app.use("/user",userRouter);
app.use("/contact", contactRouter)




//cors headers
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

//static resourse
// app.use("/router", router);
// app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
// app.use(express.static(path.join(__dirname, "/../frontend/build")));

// app.get("*", (req, res) => {
//     try {
//       res.sendFile(path.join(`${__dirname}/../real_estate/public/index.html`));
//     } catch (e) {
//       res.send("Oops..! Something went wrong!!");
//     }
//   });

//   app.use(cors());

//port
app.listen(PORT, () => {
    console.log(`Portal is running on PORT No- ${PORT}`);
});