'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    
    await queryInterface.bulkInsert('Users', [
      {
      nombre: 'admin',
      password: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      nombre: 'user',
      password: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
