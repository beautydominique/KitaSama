'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataProfile = JSON.parse(fs.readFileSync("./datas/profile.json", "utf-8")).map((profile)=>{
      profile.createdAt = new Date()
      profile.updatedAt = new Date()
      return profile
     })
     return queryInterface.bulkInsert('Profiles', dataProfile, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', {}, {})
  }
};
