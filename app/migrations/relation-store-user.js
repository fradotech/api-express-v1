'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('users', {
      fields: ['storeId'],
      type: 'foreign key',
      name: 'user',
      references: {
        table: 'stores',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.addConstraint('users', {
      fields: ['storeId'],
      type: 'foreign key',
      name: 'user',
      references: {
        table: 'stores',
        field: 'id'
      }
    })
  }
};
