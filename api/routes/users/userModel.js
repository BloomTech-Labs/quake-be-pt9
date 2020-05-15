const db = require('../../../data/dbConfig')

function addUser(user){
    return  db('users')
    .insert(user);
  }
  
  function getUsers(){
    return db('users')
  }
  
  function findBy(filter) {
      return db('users').where(filter);
    }
  
   
  
  module.exports= {
      addUser,
      findBy,
      getUsers
   }
