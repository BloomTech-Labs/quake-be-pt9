const db = require('../../data/dbConfig');

function addUser(user){
  console.log("Adding user!");
  return db('users').insert(user);
}

function getUsers(){
  return db('users');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id){
  return db('users')
  .where({id})
  .first();
}

function remove(id) {
  return db('users').where({id}).del();
}

module.exports = {
  addUser,
  findBy,
  getUsers,
  findById,
  remove
}
