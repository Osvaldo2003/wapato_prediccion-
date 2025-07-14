const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

exports.getChurnRisk = async (req, res) => {
  try {
    const result = await sequelize.query(`
      SELECT
        u.id AS user_id,
        u.username,
        MAX(l.timestamp) AS ultima_accion,
        COUNT(l.id) AS total_acciones,
        CASE
          WHEN MAX(l.timestamp) < NOW() - INTERVAL '30 days' THEN 'ALTO'
          WHEN COUNT(l.id) < 10 THEN 'MEDIO'
          ELSE 'BAJO'
        END AS riesgo
      FROM users u
      LEFT JOIN user_action_logs l ON u.id = l.user_id
      GROUP BY u.id, u.username
      ORDER BY ultima_accion ASC;
    `, { type: QueryTypes.SELECT });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener riesgo de churn' });
  }
};

exports.getGenrePopularity = async (req, res) => {
  try {
    const result = await sequelize.query(`
      SELECT
        (jsonb_array_elements_text(metadata->'generos_libro'))::BIGINT AS genero_id,
        COUNT(*) AS interacciones
      FROM user_action_logs
      WHERE action IN (
        'visualizacion_libro', 'lectura_capitulo', 'like_libro', 'like_capitulo'
      )
      GROUP BY genero_id
      ORDER BY interacciones DESC;
    `, { type: QueryTypes.SELECT });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener popularidad de géneros' });
  }
};

exports.getActionDistribution = async (req, res) => {
  try {
    const result = await sequelize.query(`
      SELECT action, COUNT(*) AS total
      FROM user_action_logs
      GROUP BY action;
    `, { type: QueryTypes.SELECT });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener distribución de acciones' });
  }
};
