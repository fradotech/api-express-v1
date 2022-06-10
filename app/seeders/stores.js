module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'stores',
      [
        {
          name: 'No Store',
          address: '',
        }, {
          name: 'Framesta Store',
          address: 'Malang',
        }, {
          name: 'Fernando Store',
          address: 'Pasuruan',
        }
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stores', null, {});
  },
};
