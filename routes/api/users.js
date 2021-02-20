const express = require('express');
const router = express.Router();
const UserModel = require('../../models/userModel');
const usersCtrl = require('../../controllers/userCtrl');

/*---------- Public Routes ----------*/

router.get('/allUser', usersCtrl.test)
// router.get('/test_seeding_route', async function(req, res) {
//     try {
//         await UserModel.create({
//             name: 'Mike',
//             email: 'mike@gmail.com',
//             password: '123'
//         })
//         await UserModel.create({
//             name: 'Mark',
//             email: 'mark@gmail.com',
//             password: '123'
//         })
//         await UserModel.create({
//             name: 'Jay',
//             email: 'jay@gmail.com',
//             password: '123'
//         })
//     } catch(error) {
//         res.json({error: 'error seeding'})
//     }
// })
// router.post('/signup', usersCtrl.signup);
// router.post('/login', usersCtrl.login);


/*---------- Protected Routes ----------*/




module.exports = router;