const express = require('express');
const router = express.Router();
const UserModel = require('../../models/userModel');
const usersCtrl = require('../../controllers/userCtrl');

/*---------- Public Routes ----------*/

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);


/*---------- Protected Routes ----------*/




module.exports = router;