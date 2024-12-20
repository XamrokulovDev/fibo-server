const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const errorHandle = require("./middlewares/error");

require("dotenv").config();

// Middleware-lar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// "public/image" file static 
app.use("/uploads", express.static(path.join(__dirname,"public/uploads")));

if (process.env.NODE_ENV === "developer") {
    app.use(morgan("dev"));
}

// MongoDB connect
connectDB();

// Routes
app.use("/api/v1/auth", require("./routes/user.route"));
app.use("/api/v1/products", require("./routes/product.route"));
app.use("/api/v1/cart", require("./routes/cart.route"));

// Error handler
app.use(errorHandle);

// PORT and Listening server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})