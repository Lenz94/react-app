require('dotenv').config({ path: '../.env' }); 

const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));

async function fetchData(url, res) {
    try {
        const response = await axios.get(url, {
            headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_KEY }
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

app.get("/la-liga-standings", async (req, res) => {
    const competitionID = "PD";
    if (!competitionID) {
        return res.status(400).json({ message: "Missing competitionID parameter" });
    }
    fetchData(`https://api.football-data.org/v4/competitions/${competitionID}/standings`, res);
})

app.get("/team-fixtures", async (req, res) => {
    const teamId = req.query.id;
    if (!teamId) {
        return res.status(400).json({ message: "Missing teamId parameter" });
    }
    fetchData(`https://api.football-data.org/v4/teams/${teamId}/matches?status=SCHEDULED`, res)
})

app.listen(port, () => {
    console.log("Server started on port " + port);
})