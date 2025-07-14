'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_action_logs', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      action: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      metadata: {
        type: Sequelize.JSONB
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_action_logs');
  }
};
