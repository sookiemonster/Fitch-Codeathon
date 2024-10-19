const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const usersRoutes = require("./routes/users.js");
const vendorsRoutes = require("./routes/vendors.js");
const washerRoutes = require("./routes/washer.js");
const stationsRoutes = require("./routes/stations.js");
const itemsRoutes = require("./routes/items.js");
const discountsRoutes = require("./routes/discounts.js");
const authRoutes = require("./routes/auth.js");
const metricsRoutes = require("./routes/metrics.js");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

app.use(bodyParser.json());

//CAN USE THIS TO TEST IF POSTMAN API CALLS GOING THROUGH TO VS-CONSOLE.
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for '${req.url}'`);
  next();
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/vendors", vendorsRoutes);
app.use("/api/v1/washer", washerRoutes);
app.use("/api/v1/stations", stationsRoutes);
app.use("/api/v1/items", itemsRoutes);
app.use("/api/v1/discounts", discountsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/metrics", metricsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
