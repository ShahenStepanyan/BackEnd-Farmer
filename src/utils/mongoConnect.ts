import mongoose from "mongoose";


// const options = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// };

mongoose
  .connect(process.env.DEV_DB)
  .then(() => {
    console.log(process.env.DEV_DB)
    
  })
  .catch((err) => {
    console.log("MongoDB connection unsuccessful");
    console.log(err);
  });
