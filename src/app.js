import express from "express"; 
import cors from "cors";
import rootRouter from "./routes/index.js";

// Init express
const app = express();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({"extended" : true}));

// enabling cors for all requests by using cors middleware
app.use(cors());

// Enable pre-flight
app.options("*", cors());

app.use("/", rootRouter);

// app.get("/", function(req, res){
//     res.status(200).json({success : true, message : "Hello World"});
// });
 
//if we are here then the specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
 
//all other requests are not implemented.
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

export default app;


