const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const { Sequelize, DataTypes } = require("sequelize");
const ProfileModel = require("./models/Profile");

const app = express();
app.use(express.json());
app.use(cors());

// SQLite database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './backend/linkedin_extension.sqlite'
});

const Profile = ProfileModel(sequelize, DataTypes);

// Connect to the SQLite database
sequelize.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.error("Error syncing database:", err));

// POST API to scrape and save data
app.post("/save-data", async (req, res) => {
    const { profiles } = req.body;

    if (profiles.length < 3) {
        return res.status(400).json({ error: "At least 3 profile links are required" });
    }

    try {
        // Launch Puppeteer with your installed Google Chrome
        const browser = await puppeteer.launch({
            headless: false, // Set to true for headless mode
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // Path to your Google Chrome executable
            userDataDir: "C:/Users/dell/AppData/Local/Google/Chrome/User Data", // Path to your Chrome user profile
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        for (let profile of profiles) {
            await page.goto(profile);
            await page.waitForTimeout(5000); // Wait for 5 seconds to allow the page to load

            // Scrape the data from LinkedIn profiles
            const profileData = await page.evaluate(() => {
                const getText = (selector) => document.querySelector(selector)?.innerText || "N/A";

                return {
                    name: getText(".top-card-layout__title"),
                    url: window.location.href,
                    about: getText(".core-section-container__content"),
                    bio: getText(".top-card-layout__headline"),
                    location: getText(".top-card-layout__first-subline"),
                    followerCount: getText(".follower-count"),
                    connectionCount: getText(".connection-count")
                };
            });

            console.log('Scraped Profile Data:', profileData);

            // Save to database
            await Profile.create(profileData);
        }

        await browser.close();
        res.json({ message: 'Scraping completed successfully' });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Scraping failed' });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
