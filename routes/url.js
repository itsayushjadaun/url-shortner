const express = require('express');
const { handeGenrateNewShortURL, handelGetAnalytics } = require('../controllers/url');

const router = express.Router();


router.post("/", handeGenrateNewShortURL);

router.get('/analytics/:shortId', handelGetAnalytics);


module.exports = router;