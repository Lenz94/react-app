require('dotenv').config({ path: '../.env' });

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS options
const corsOptions = {
    origin: [frontendUrl],
};
app.use(cors(corsOptions));

// In-memory request tracking and caching
const requestCounts = {};
const cache = {};

const RATE_LIMIT = 10; // Max 10 requests per minute per IP
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const CACHE_TTL = 300 * 1000; // Cache expires after 5 minutes

function rateLimiter(req, cacheKey) {
    const ip = req.ip;
    const now = Date.now();

    if (!requestCounts[ip]) {
        requestCounts[ip] = { count: 1, startTime: now };
    } else {
        const timeElapsed = now - requestCounts[ip].startTime;
        if (timeElapsed < RATE_LIMIT_WINDOW) {
            if (requestCounts[ip].count >= RATE_LIMIT) {
                // If rate limit exceeded, return cached data instead of error
                if (cache[cacheKey]) {
                    return cache[cacheKey].data; // Return cached response
                } else {
                    return { error: true, message: "Rate limit exceeded, and no cached data available." };
                }
            }
            requestCounts[ip].count++;
        } else {
            // Reset rate limit counter after time window
            requestCounts[ip] = { count: 1, startTime: now };
        }
    }
    return null; // No rate limit exceeded, proceed with request
}

async function fetchData(url, res, cacheKey, req) {
    const now = Date.now();

    // ✅ Check cache first and return it if available (before rate limiting)
    if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
        return res.json(cache[cacheKey].data);
    }

    // ✅ Apply rate limiter only if no cache is found
    const rateLimitedResponse = rateLimiter(req, cacheKey);
    if (rateLimitedResponse) {
        return res.json(rateLimitedResponse);
    }

    // ✅ Fetch fresh data since it's not cached and rate limit is OK
    try {
        const response = await axios.get(url, {
            headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_KEY }
        });

        // ✅ Store new response in cache
        cache[cacheKey] = {
            data: response.data,
            timestamp: now
        };

        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}


// Routes
app.get("/competitions", async (req, res) => {
    fetchData(`https://api.football-data.org/v4/competitions`, res, "competitions", req);
});

app.get("/standings", async (req, res) => {
    const competitionID = req.query.id;
    if (!competitionID) {
        return res.status(400).json({ message: "Missing competitionID parameter" });
    }
    fetchData(`https://api.football-data.org/v4/competitions/${competitionID}/standings`, res, `standings_${competitionID}`, req);
});

app.get("/scorers", async (req, res) => {
    const competitionID = req.query.id;
    if (!competitionID) {
        return res.status(400).json({ message: "Missing competitionID parameter" });
    }
    fetchData(`https://api.football-data.org/v4/competitions/${competitionID}/scorers`, res, `scorers_${competitionID}`, req);
});

app.get("/team-fixtures", async (req, res) => {
    const teamId = req.query.id;
    if (!teamId) {
        return res.status(400).json({ message: "Missing teamId parameter" });
    }
    fetchData(`https://api.football-data.org/v4/teams/${teamId}/matches?status=SCHEDULED`, res, `team_fixtures_${teamId}`, req);
});

// Start server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
