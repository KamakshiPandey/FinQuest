const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.deleteTransaction = async (req, res) => {
    try {
        // Extract data from request body
        const { transactionID } = req.body;
        const userID = req.user.id;

        // Check if user ID is available
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User id field could not be fetched",
                toastMessage: "Technical Error! Try to login again ",
            });
        }

        // Check if required fields are available
        if (!transactionID) {
            return res.status(400).json({
                success: false,
                message: "Transaction ID was not found",

                toastMessage: "Transaction dont exist ! Reload ",
            });
        }

        // Fetch user details
        const userDetails = await User.findById(userID).populate(
            "transactions"
        );

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                toastMessage: "Technical Error! Try to login again ",
            });
        }
        userDetails.transactions = userDetails.transactions.filter(
            (transaction) => transaction._id.toString() !== transactionID
        );

        await userDetails.save();

        await Transaction.findByIdAndDelete(transactionID);

        const updatedUser = await User.findById(userID)
            .populate("additionalDetails")
            .populate("portfolio")
            .populate("transactions")
            .populate("watchList")
            .populate("portfolioGraph");

        // Return success response
        res.status(200).json({
            success: true,
            message: "Transaction deleted successful",
            toastMessage: "Transaction deleted successfully! ",
            data: updatedUser,
        });
    } catch (error) {
        // Handle errors
        console.error("Transaction deletion failed", error);
        return res.status(500).json({
            success: false,
            message: "Transaction deletion failed",
            toastMessage: "Technical Error  ",
            error: error.message,
        });
    }
};
