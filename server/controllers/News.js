const News = require("../models/News");

//controller to add a stock to the watchlist

exports.addNews = async (req, res) => {
    try {
        //get data from body
        const { news_id, title, description, url, image_url, publish_date } = req.body;

        if (!news_id || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Details less",
            })
        }
        const newsPreSave = await News.findOne({ news_id: news_id });

        if (newsPreSave) {
            return res.status(200).json({
                success: true,
                message: "News already present",
            })
        }

        const newsDetails = await News.create({
            news_id,
            title,
            description,
            url,
            image_url,
            publish_date
        })

        return res.status(200).json({
            success: true,
            message: "News Added"
        })

    } catch (error) {
        console.log("News Addition failed", error);
        return res.status(500).json({
            success: false,
            message: "News addition failed",
            error: error
        });
    }
};


exports.getAllNews = async (req, res) => {
    try {
        //get data from body

        const newsDetails = await News.find({}, { title: true, description: true, image_url: true, url: true, publish_date: true });

        return res.status(200).json({
            success: true,
            message: "News fetched successfully",
            data: newsDetails
        })

    } catch (error) {
        console.log("News fetch failed", error);
        return res.status(500).json({
            success: false,
            message: "News fetching failed",
            error: error
        });
    }
};


