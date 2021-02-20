const userModel = require('../models/userModel');
const User = require('../models/userModel');

async function test(req, res) {
    try {
      let userList = await userModel.find({})
      res.json(userList)
    } catch (err){
      res.json({error: err})
    }
}

module.exports = {
  test
};