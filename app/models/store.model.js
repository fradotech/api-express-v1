const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {

    }
  }
  Store.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'stores',
      modelName: 'Store',
    },
  )
  return Store;
}
