/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commandreply', {
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reply: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    server: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'commandreply'
  });
};