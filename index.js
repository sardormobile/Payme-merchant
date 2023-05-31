
const express = require("express");
const cors = require("cors");
const environments = require("./config/environments");
const routes = require("./routes/_router");
const errorHandler = require("./middlewares/error-handler.middleware");

const app = express();

require('./config/prod')(app);

const PORT = environments.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

app.use(errorHandler);

require("./config/database");

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));

