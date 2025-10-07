const express = require("express");
const router = express.Router();

const {
    addToGraph,
    updateEveryonesGraph,
} = require("../controllers/PortfolioReading");

const { auth } = require("../middlewares/auth");

router.post("/addToGraph", auth, addToGraph);
router.post("/updateEveryoneGraph", updateEveryonesGraph);

module.exports = router;
