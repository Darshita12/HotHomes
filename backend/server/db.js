const mongoose = require("mongoose");

const uri = "mongodb://darshi:darshi@ac-jalxgkk-shard-00-00.edlshq4.mongodb.net:27017,ac-jalxgkk-shard-00-01.edlshq4.mongodb.net:27017,ac-jalxgkk-shard-00-02.edlshq4.mongodb.net:27017/RealEstateDB?ssl=true&replicaSet=atlas-u0f0i0-shard-0&authSource=admin&retryWrites=true&w=majority";
// "mongodb://sai:sai@ac-ak9wnlg-shard-00-00.dxue2hk.mongodb.net:27017,ac-ak9wnlg-shard-00-01.dxue2hk.mongodb.net:27017,ac-ak9wnlg-shard-00-02.dxue2hk.mongodb.net:27017/AskMeAnything?ssl=true&replicaSet=atlas-l61th3-shard-0&authSource=admin&retryWrites=true&w=majority";
module.exports.connect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};