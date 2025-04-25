const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express VacQ API",
        },
        servers: [
            {
                url: "http://localhost:5003/api/v1",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000, //10 mins
    max: 1000,
});

//Route files
const hotels = require("./routes/hotels");
const bookings = require("./routes/bookings");
const auth = require("./routes/auth");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(limiter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1/hotels", hotels);
app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", bookings);

const PORT = process.env.PORT || 5003;
app.listen(
    PORT,
    console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
