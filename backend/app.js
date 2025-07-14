const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const analyticsController = require('./controllers/analyticsController');

const app = express();
app.use(bodyParser.json());

app.get('/admin/analytics/churn-risk', analyticsController.getChurnRisk);
app.get('/admin/analytics/genre-popularity', analyticsController.getGenrePopularity);
app.get('/admin/analytics/action-distribution', analyticsController.getActionDistribution);

app.listen(3000, async () => {
  console.log('Server on http://localhost:3000');
  await sequelize.authenticate();
  console.log('DB connected');
});
