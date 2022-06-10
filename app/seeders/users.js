module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          googleId: '000',
          email: 'admin@gmail.com',
          password: '$2b$10$NteiAbfGrOjh76Wne204Z.M5HeFP.Yzc5s8so6k0opoCzmu0k.q3W', // fradoo
          name: 'Framesta Fernando',
          role: 'Admin',
          storeId: 1
        }, {
          googleId: '106726729231681498244',
          email: 'fradotech.id@gmail.com',
          password: '$2b$10$NteiAbfGrOjh76Wne204Z.M5HeFP.Yzc5s8so6k0opoCzmu0k.q3W', // fradoo
          name: 'Framesta Fernando',
          role: 'User',
          storeId: 1
        }
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
