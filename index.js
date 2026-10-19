const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");



dotenv.config();

const connectDB = require("./DB/mongoose");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const errorHandler = require("./middleware/error.middleware");

const dbConnection = require("./middleware/dbConnection.middleware");




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(dbConnection);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Ecommerce API Running"
    });

});


app.get("/favicon.ico", (req, res) => res.status(204).end());


app.use((req, res, next) => {
    console.log("Unmatched request:", req.method, req.originalUrl);

    const error = new Error("Route not found");
    
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;


if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


module.exports = app;