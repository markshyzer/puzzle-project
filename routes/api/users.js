const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/userCtrl');

/*---------- Public Routes ----------*/

router.get('/:id', usersCtrl.getUser)
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.put('/updatename/:id', usersCtrl.update)

/*---------- Protected Routes ----------*/




module.exports = router;