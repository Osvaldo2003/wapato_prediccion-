const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/admin/analytics', analyticsRoutes);

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
});
