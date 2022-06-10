const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsTo(models.Store)
      models.Store.hasMany(models.User)
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      googleId: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('Admin', 'User'),
      },
      storeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Store",
          key: "id"
        }
      },
      verify: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      scopes: {
        noPassword: {
          attributes: { exclude: ['password'] },
        },
      },
      sequelize,
      tableName: 'users',
      modelName: 'User',
    },
  )
  return User
}
