module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
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
        allowNull: false,
        type: DataTypes.STRING,
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
        defaultValue: 'User'
      },
      storeId: {
        type: DataTypes.INTEGER,
      },
      verify: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      token: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  
  down: async (queryInterface) => {
    await queryInterface.dropTable('users')
  },
}
