let express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db");

//Express Route
const studentRoute = require("../backend/routes/student.route");

//Connect MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connect succesful");
    },
    (error) => {
      console.log("could not connect to database" + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/students", studentRoute);

//Port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("connect to port " + port);
});

// 404 error
app.use((req, res, next) => {
  next(createError(404));
});

//Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
