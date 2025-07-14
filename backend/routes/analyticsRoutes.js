const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/churn-risk', analyticsController.getChurnRisk);
router.get('/genre-popularity', analyticsController.getGenrePopularity);
router.get('/action-distribution', analyticsController.getActionDistribution);

module.exports = router;
