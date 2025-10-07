const Stock = require("../models/Stock");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.buyStock = async (req, res) => {
    try {
        // Extract data from request body
        const { symbol, cprice, quantity } = req.body;
        const userID = req.user.id;

        // Check if user ID is available
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User id field could not be fetched",
                toastMessage: "Technical Error ! Try to login again ",
            });
        }

        // Check if required fields are available
        if (!symbol || !cprice || !quantity) {
            return res.status(400).json({
                success: false,
                message:
                    "Either symbol, current price, or quantity was not found",

                toastMessage: "Fill all entries carefully  .",
            });
        }

        // Fetch user details
        const userDetails = await User.findById(userID)
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                toastMessage: " Technical Error .",
            });
        }

        // Calculate total trade amount
        const tradeamt = cprice * quantity;

        // Create transaction
        const transactionDetails = await Transaction.create({
            user: userDetails._id,
            stockSymbol: symbol,
            quantity,
            price: cprice,
            tradeValue: tradeamt,
            orderType: "Buy",
        });

        // Add transaction to user
        userDetails.transactions.push(transactionDetails._id);
        userDetails.boughtAmt+=tradeamt;

        // Check if the stock already exists in the user's portfolio
        const stockInfo = userDetails.portfolio.find(
            (stock) => stock.stockSymbol === symbol
        );
        const symbolExists = !!stockInfo;

        if (symbolExists) {
            // Update existing stock
            const updatedStock = await Stock.findByIdAndUpdate(
                stockInfo._id,
                {
                    quantity: Number(stockInfo.quantity) + Number(quantity),
                    buy_cost: Number(stockInfo.buy_cost) + Number(tradeamt),
                },
                { new: true }
            );

            // Update user's array of stocks
            const stockIndex = userDetails.portfolio.findIndex(
                (stock) => stock._id === updatedStock._id
            );
            if (stockIndex !== -1) {
                userDetails.portfolio[stockIndex] = updatedStock._id;
            }
        } else {
            // Add new stock to user's portfolio
            const newStock = await Stock.create({
                stockSymbol: symbol,
                quantity: quantity,
                buy_cost: tradeamt,
            });

            userDetails.portfolio.push(newStock._id);
        }

        // Update wallet balance and portfolio balance
        userDetails.portfolioBalance += tradeamt;
        userDetails.walletBalance -= tradeamt;

        // Save user details
        await userDetails.save();

        const updatedUser = await User.findById(userID)
            .populate("additionalDetails")
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");
        // Return success response
        res.status(200).json({
            success: true,
            message: "Stock purchase successful",
            toastMessage: "Stock bought successfully .",
            data: updatedUser,
        });
    } catch (error) {
        // Handle errors
        console.error("Stock buying failed", error);
        return res.status(500).json({
            success: false,
            message: "Stock buying failed",
            error: error.message,
            toastMessage: "Technical Error !",
        });
    }
};

exports.sellStock = async (req, res) => {
    try {
        // Extract data from request body
        const { symbol, cprice, quantity } = req.body;
        const userID = req.user.id;

        // Check if user ID is available
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User id field could not be fetched",
                toastMessage: "Technical Error ! Try to login again ",
            });
        }

        // Check if required fields are available
        if (!symbol || !cprice || !quantity) {
            return res.status(400).json({
                success: false,
                message:
                    "Either symbol, current price, or quantity was not found",

                toastMessage: "Fill all entries carefully .",
            });
        }

        // Fetch user details
        const userDetails = await User.findById(userID)
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Calculate total trade amount
        const tradeamt = cprice * quantity;
        userDetails.boughtAmt-=tradeamt;


        // Create transaction
        const transactionDetails = await Transaction.create({
            user: userDetails._id,
            stockSymbol: symbol,
            quantity,
            price: cprice,
            tradeValue: tradeamt,
            orderType: "Sell",
        });

        // Add transaction to user
        userDetails.transactions.push(transactionDetails._id);

        // Check if the stock already exists in the user's portfolio
        const stockInfo = userDetails.portfolio.find(
            (stock) => stock.stockSymbol === symbol
        );
        const symbolExists = !!stockInfo;

        if (symbolExists) {
            if (stockInfo.quantity > quantity) {
                // Update existing stock
                const updatedStock = await Stock.findByIdAndUpdate(
                    stockInfo._id,
                    {
                        quantity: stockInfo.quantity - quantity,
                        buy_cost:
                            stockInfo.buy_cost *
                            ((stockInfo.quantity - quantity) /
                                stockInfo.quantity),
                    },
                    { new: true }
                );

                // Update user's array of stocks
                const stockIndex = userDetails.portfolio.findIndex(
                    (stock) => stock._id === updatedStock._id
                );
                if (stockIndex !== -1) {
                    userDetails.portfolio[stockIndex] = updatedStock._id;
                }
            } else {
                //barabar hai toh stock hi pop krde
                userDetails.portfolio = userDetails.portfolio.filter(
                    (stock) => stock._id !== stockInfo._id
                );
                await Stock.findByIdAndDelete(stockInfo._id);
            }
        } else {
            // Stock hi nhi h
            return res.status(500).json({
                success: false,
                message: "User dont have the stock to sell",
                toastMessage: "You dont have stock to sell .",
            });
        }

        // Update wallet balance and portfolio balance
        userDetails.portfolioBalance -= tradeamt;
        userDetails.walletBalance += tradeamt;

        // Save user details
        await userDetails.save();

        const updatedUser = await User.findById(userID)
            .populate("additionalDetails")
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");

        // Return success response
        res.status(200).json({
            success: true,
            message: "Stock sell successful",
            toastMessage: "Stock sold successfully.",
            data: updatedUser,
        });
    } catch (error) {
        // Handle errors
        console.error("Stock selling failed", error);
        return res.status(500).json({
            success: false,
            message: "Stock selling failed",
            toastMessage: "Technical Error .",
            error: error.message,
        });
    }
};
