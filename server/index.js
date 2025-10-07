const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const watchlistRoutes = require("./routes/Watchlist");
const stockRoutes = require("./routes/Stock");
const graphRoutes = require("./routes/Graph");
const transactionRoutes = require("./routes/Transaction");
const newsRoutes = require("./routes/News");
const priceStockRoutes = require("./routes/PriceStock");

const { dbConnect } = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
    "http://localhost:3000",
    "https://stock-voyager.vercel.app",
    "https://stock-voyager-git-main-shivam-aggarwals-projects-361e9df9.vercel.app",
    "https://stock-voyager-4g2fidvha-shivam-aggarwals-projects-361e9df9.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

dbConnect();
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/watchlist", watchlistRoutes);
app.use("/api/v1/stock", stockRoutes);
app.use("/api/v1/graph", graphRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/stockPrice", priceStockRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Default route has been running successfully",
    });
});

app.listen(PORT, () => {
    console.log(`Your backend is running on ${PORT}`);
});
