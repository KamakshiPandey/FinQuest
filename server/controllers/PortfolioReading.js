const User = require("../models/User");
const PortfolioGraphReading = require('../models/PortfolioGraphReading')

//controller to add a stock to the watchlist

exports.addToGraph = async (req, res) => {
    try {
        //get data from body
        const { curr_value, buy_value } = req.body;
        const userID = req.user.id;

        if (!userID) {
            return res.status(500).json({
                success: false,
                message: "User id field could not be fetched",
                toastMessage: "Technical Error : Kindly try to login again",
            });
        }

        //get profile id

        const userDetails = await User.findById(userID);
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "User not found",
                toastMessage: "Technical Error, Kindly try again after some time ",
            });
        }

        const graph = await PortfolioGraphReading.create({
            buying_value: buy_value,
            curr_value: curr_value
        });



        userDetails.portfolioGraph.push(graph._id);
        await userDetails.save();

        const updatedUser = await User.findById(userID).populate('portfolio').populate('transactions').populate('watchList').populate('portfolioGraph');

        return res.status(200).json({
            success: true,
            message: "Reading Added",
            data: updatedUser,
            toastMessage: "Timestamp Recorded",
        })

    } catch (error) {
        console.log("Graph updattion failed", error);
        return res.status(500).json({
            success: false,
            message: "Graph updated failed",
            toastMessage: "Technical Error: Try again after some time ",
            error: error
        });
    }
};


exports.updateEveryonesGraph = async (req, res) => {
    try {
        const users=await User.find({},{boughtAmt:true,portfolioBalance:true,portfolioGraph:true});


        for (let user of users){
            const buy_value=user.boughtAmt;
            const curr_value=user.portfolioBalance;
            
            const graph = await PortfolioGraphReading.create({
                buying_value: buy_value,
                curr_value: curr_value
            });
    
    
            user.portfolioGraph.push(graph._id);
            await user.save();
        }


        return res.status(200).json({
            success: true,
            message: "Readings Added",
            toastMessage: "Timestamps Recorded",
        })

    } catch (error) {
        console.log("Graph updation failed", error);
        return res.status(500).json({
            success: false,
            message: "Graph updated failed",
            toastMessage: "Technical Error: Try again after some time ",
            error: error
        });
    }
};

