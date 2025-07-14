'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_action_logs', [
      {
        user_id: 1,
        action: 'visualizacion_libro',
        timestamp: new Date(),
        metadata: JSON.stringify({
          id_libro: 1,
          tiempo_viendolo: '30min',
          generos_libro: [1, 2, 3],
          context: 'mobile'
        })
      },
      {
        user_id: 1,
        action: 'like_libro',
        timestamp: new Date(),
        metadata: JSON.stringify({
          id_libro: 2,
          generos_libro: [2],
          context: 'web'
        })
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_action_logs', null, {});
  }
};
