module.exports = (sequelize, DataTypes) => {
  const UserActionLog = sequelize.define('UserActionLog', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    action: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    metadata: {
      type: DataTypes.JSONB
    }
  }, {
    tableName: 'user_action_logs',
    timestamps: false
  });

  UserActionLog.associate = (models) => {
    UserActionLog.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return UserActionLog;
};
