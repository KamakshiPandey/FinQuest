const User = require("../models/User");

//controller to add a stock to the watchlist

exports.addToWatchlist = async (req, res) => {
    try {
        //get data from body
        const { symbol } = req.body;
        const userID = req.user.id;

        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "User id field could not be fetched",
                toastMessage: "Technical Error! Try to login again ",
            });
        }

        //get profile id

        const userDetails = await User.findById(userID);
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User not found",
                toastMessage: "Technical Error! ",
            });
        }

        // Check if symbol already exists in watchlist
        if (!userDetails.watchList.includes(symbol)) {
            // If not exists, add the symbol to the watchlist
            userDetails.watchList.push(symbol);

            // Save the updated user details
            try {
                await userDetails.save();

                const updatedUser = await User.findById(userID)
                    .populate("additionalDetails")
                    .populate("portfolio")
                    .populate("transactions")
                    .populate("watchList")
                    .populate("portfolioGraph");

                return res.status(200).json({
                    success: true,
                    message: "Symbol added to watchlist",
                    toastMessage: "Stock Added To Watchlist ",
                    data: updatedUser, // Optionally, you can send updated user details in the response
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding symbol to watchlist",
                    toastMessage: "Technical Error!  ",
                    error: error.message,
                });
            }
        } else {
            return res.status(200).json({
                success: true,
                message: "Stock already exists in watchlist",
                toastMessage: "Sybmol already in watchlist",
                data: userDetails, // Optionally, you can send user details in the response
            });
        }
    } catch (error) {
        console.log("Watchlist updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Watchlist updated failed",
            toastMessage: "Technical Error! ",
            error: error,
        });
    }
};

//controller to remove a stock to the watchlist

exports.removeFromWatchlist = async (req, res) => {
    try {
        //get data from body
        const { symbol } = req.body;
        const userID = req.user.id;

        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "User id field could not be fetched",
                toastMessage: "Technical Error! Try to login again ",
            });
        }

        //get profile id

        const userDetails = await User.findById(userID);
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User not found",
                toastMessage: "Technical Error! Try to login again ",
            });
        }

        // Check if symbol already exists in watchlist
        if (userDetails.watchList.includes(symbol)) {
            // If not exists, add the symbol to the watchlist
            userDetails.watchList = userDetails.watchList.filter(
                (item) => item !== symbol
            );

            // Save the updated user details
            try {
                await userDetails.save();

                const updatedUser = await User.findById(userID)
                    .populate("additionalDetails")
                    .populate("portfolio")
                    .populate("transactions")
                    .populate("watchList")
                    .populate("portfolioGraph");
                return res.status(200).json({
                    success: true,
                    message: "Symbol removed to watchlist",

                    toastMessage: "Stock Removed from the watchlist ",
                    data: updatedUser, // Optionally, you can send updated user details in the response
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error removing symbol to watchlist",
                    toastMessage: "Technical Error!",
                    error: error.message,
                });
            }
        } else {
            return res.status(200).json({
                success: true,
                message: "Symbol already not in watchlist",
                toastMessage: "Stock not present in watchlist",
                data: userDetails, // Optionally, you can send user details in the response
            });
        }
    } catch (error) {
        console.log("Watchlist updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Watchlist updated failed",
            toastMessage: "Technical Error! ",
            error: error,
        });
    }
};
