'use strict';
const { query } = require("express");
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
   const dataUser = JSON.parse(fs.readFileSync("./datas/user.json", "utf-8")).map((user)=>{
    user.createdAt = new Date()
    user.updatedAt = new Date()
    return user
   })
   return queryInterface.bulkInsert('Users', dataUser, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', {}, {})
  }
};
