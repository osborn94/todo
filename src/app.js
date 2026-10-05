const express = require("express");
const testRouter = require("./routes/test.routes");
const userRouter = require("./routes/users.routes");
const router = require("./routes/tasks.routes");
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');



const app = express();


app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/v1/test", testRouter);
app.use("/v1/api", userRouter);
app.use("/v1/api", router);

app.use(errorHandler);

module.exports = app;